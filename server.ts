import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Allow large base64 screenshot uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize GoogleGenAI SDK on server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// UTR Registry to enforce unique transactions (no duplicate re-use)
interface UtrRecord {
  utrNumber: string;
  email: string;
  amount: number;
  verifiedAt: string;
  source: 'ai_screenshot' | 'manual_utr';
  details?: string;
}

const UTR_FILE_PATH = path.join(__dirname, 'utr_registry.json');
const SUBMISSIONS_FILE_PATH = path.join(__dirname, 'payment_submissions.json');

export interface PaymentSubmission {
  id: string;
  userEmail: string;
  userName: string;
  amount: number;
  utrNumber: string;
  screenshotBase64?: string;
  screenshotFileName?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  aiScan?: {
    isPaymentScreenshot: boolean;
    amount: number;
    amountMatches10: boolean;
    utrNumber?: string;
    transactionDate?: string;
    isRecent?: boolean;
    isSuccessfulStatus?: boolean;
    appName?: string;
    reason: string;
  };
}

function loadSubmissions(): PaymentSubmission[] {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE_PATH)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading submissions file:', err);
  }
  return [
    {
      id: 'SUB-DEMO-001',
      userEmail: 'kiran.dev@gmail.com',
      userName: 'Kiran Kumar',
      amount: 10,
      utrNumber: '430819284910',
      status: 'pending',
      submittedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      aiScan: {
        isPaymentScreenshot: true,
        amount: 10,
        amountMatches10: true,
        utrNumber: '430819284910',
        transactionDate: 'Today, 2:40 PM',
        isRecent: true,
        isSuccessfulStatus: true,
        appName: 'Google Pay',
        reason: 'Paid ₹10 to vincentlibin487-5@okicici. Valid UTR.'
      }
    }
  ];
}

function saveSubmissions(submissions: PaymentSubmission[]) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving submissions file:', err);
  }
}

let paymentSubmissions = loadSubmissions();

function loadUtrRegistry(): Record<string, UtrRecord> {
  try {
    if (fs.existsSync(UTR_FILE_PATH)) {
      const data = fs.readFileSync(UTR_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading UTR registry file:', err);
  }
  return {
    "430129841234": {
      utrNumber: "430129841234",
      email: "demo.student@gmail.com",
      amount: 10,
      verifiedAt: new Date(Date.now() - 86400000).toISOString(),
      source: "manual_utr",
      details: "Seeded prior transaction"
    }
  };
}

function saveUtrRegistry(registry: Record<string, UtrRecord>) {
  try {
    fs.writeFileSync(UTR_FILE_PATH, JSON.stringify(registry, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving UTR registry file:', err);
  }
}

let utrRegistry = loadUtrRegistry();

// 1. Submit Payment (Screenshot or Manual UTR) -> Sets status to 'pending' or 'approved' (AI verified)
app.post('/api/payment/submit', async (req, res) => {
  try {
    const { 
      userEmail, 
      userName = 'Student', 
      utrNumber, 
      imageBase64, 
      mimeType = 'image/jpeg', 
      fileName = 'receipt.jpg',
      sessionStartTime // Client sends ISO string when they click "₹10 Pay"
    } = req.body;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        error: 'Gmail ID is required to submit payment.'
      });
    }

    if (!imageBase64 && (!utrNumber || utrNumber.trim().length < 6)) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a payment screenshot or enter a valid UTR/Transaction ID.'
      });
    }

    let detectedUtr = utrNumber ? utrNumber.trim().replace(/[^0-9a-zA-Z]/g, '') : '';
    let aiScanResult: any = null;
    let isAutoApproved = false;

    // If an image is provided, run Gemini AI OCR pre-scan
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

      if (process.env.GEMINI_API_KEY) {
        try {
          const imagePart = {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64,
            },
          };

          const sessionWindowDesc = sessionStartTime 
            ? `The user started their payment session at ${new Date(sessionStartTime).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}. 
               The payment must be made after this time.`
            : "No specific session window provided, assume current time context.";

          const textPart = {
            text: `Analyze this UPI payment receipt for AppLern ₹10.
Official Merchant: AMJ FILM PRODUCTION
Official UPI: vincentlibin487-5@okicici
Target Amount: ₹10

Context: ${sessionWindowDesc}

Extract and Validate:
1. Is it a genuine payment receipt?
2. Amount (must be exactly ₹10)?
3. UTR or UPI Reference Number (usually 12 digits).
4. Payment Date & Time.
5. Does the payment time fall within or after the session start time mentioned above?
6. Does the payee/merchant match 'AMJ FILM PRODUCTION' or 'vincentlibin487-5@okicici'?
7. Status (must be Successful / Paid / Completed).
8. UPI App Name.`
          };

          const geminiResponse = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  isPaymentScreenshot: { type: Type.BOOLEAN },
                  amount: { type: Type.NUMBER },
                  amountMatches10: { type: Type.BOOLEAN },
                  utrNumber: { type: Type.STRING },
                  transactionDate: { type: Type.STRING },
                  isRecent: { type: Type.BOOLEAN },
                  isSuccessfulStatus: { type: Type.BOOLEAN },
                  merchantMatches: { type: Type.BOOLEAN },
                  sessionValidationSuccess: { type: Type.BOOLEAN },
                  appName: { type: Type.STRING },
                  reason: { type: Type.STRING },
                },
                required: ['isPaymentScreenshot', 'amountMatches10', 'isSuccessfulStatus', 'merchantMatches', 'sessionValidationSuccess', 'reason'],
              },
            },
          });

          aiScanResult = JSON.parse(geminiResponse.text || '{}');
          if (aiScanResult.utrNumber && !detectedUtr) {
            detectedUtr = (aiScanResult.utrNumber || '').replace(/[^0-9a-zA-Z]/g, '');
          }

          // Check for Automatic Approval
          if (
            aiScanResult.isPaymentScreenshot &&
            aiScanResult.amountMatches10 &&
            aiScanResult.isSuccessfulStatus &&
            aiScanResult.merchantMatches &&
            aiScanResult.sessionValidationSuccess
          ) {
            isAutoApproved = true;
          }

        } catch (ocrErr) {
          console.error('AI OCR analysis error:', ocrErr);
        }
      }

      // Fallback heuristics if Gemini wasn't called or had an issue
      if (!aiScanResult) {
        aiScanResult = {
          isPaymentScreenshot: true,
          amount: 10,
          amountMatches10: true,
          utrNumber: detectedUtr || `43${Date.now().toString().slice(-10)}`,
          transactionDate: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          isRecent: true,
          isSuccessfulStatus: true,
          merchantMatches: true,
          sessionValidationSuccess: true,
          appName: 'UPI App',
          reason: 'Screenshot pre-scanned. Manual review fallback.'
        };
        if (!detectedUtr) detectedUtr = aiScanResult.utrNumber;
      }
    }

    if (!detectedUtr || detectedUtr.length < 6) {
      detectedUtr = `UPI${Date.now().toString().slice(-8)}${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Check duplicate UTR in confirmed registry
    if (utrRegistry[detectedUtr]) {
      const prior = utrRegistry[detectedUtr];
      if (prior.email !== userEmail) {
        return res.status(400).json({
          success: false,
          error: `Duplicate UTR detected: Transaction ID / UTR (${detectedUtr}) has already been redeemed by another account (${prior.email}). Each ₹10 payment can only be used once.`,
          isDuplicate: true,
        });
      }
      // If same email, it might be a re-submission of an approved one
      if (prior.amount === 10) isAutoApproved = true; 
    }

    // Check if there is already an existing submission for this user
    const existingIndex = paymentSubmissions.findIndex(s => s.userEmail.toLowerCase() === userEmail.toLowerCase());
    
    const submissionId = `SUB-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newSubmission: PaymentSubmission = {
      id: submissionId,
      userEmail,
      userName,
      amount: 10,
      utrNumber: detectedUtr,
      screenshotBase64: imageBase64 ? imageBase64 : undefined,
      screenshotFileName: fileName,
      status: isAutoApproved ? 'approved' : 'pending',
      submittedAt: new Date().toISOString(),
      aiScan: aiScanResult || undefined,
      reviewedAt: isAutoApproved ? new Date().toISOString() : undefined,
      reviewedBy: isAutoApproved ? 'System AI (Auto-Verified)' : undefined,
    };

    if (isAutoApproved) {
      // Register in UTR registry if auto-approved
      utrRegistry[detectedUtr] = {
        utrNumber: detectedUtr,
        email: userEmail,
        amount: 10,
        verifiedAt: newSubmission.submittedAt,
        source: 'ai_screenshot',
        details: 'Automatically verified by AI'
      };
      saveUtrRegistry(utrRegistry);
    }

    if (existingIndex >= 0) {
      paymentSubmissions[existingIndex] = newSubmission;
    } else {
      paymentSubmissions.unshift(newSubmission);
    }

    saveSubmissions(paymentSubmissions);

    return res.json({
      success: true,
      status: newSubmission.status,
      submission: {
        id: newSubmission.id,
        userEmail: newSubmission.userEmail,
        userName: newSubmission.userName,
        amount: newSubmission.amount,
        utrNumber: newSubmission.utrNumber,
        status: newSubmission.status,
        submittedAt: newSubmission.submittedAt,
        screenshotFileName: newSubmission.screenshotFileName,
        aiScan: newSubmission.aiScan,
      },
      message: isAutoApproved 
        ? 'Payment verified successfully by AI! Course access unlocked.' 
        : 'Payment screenshot submitted. AI is analyzing or awaiting manual review.'
    });

  } catch (error: any) {
    console.error('Error in /api/payment/submit:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Payment submission failed.'
    });
  }
});

// 2. Check Payment Status by Email
app.get('/api/payment/status', (req, res) => {
  const email = (req.query.email as string || '').toLowerCase().trim();
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email parameter is required.' });
  }

  const submission = paymentSubmissions.find(s => s.userEmail.toLowerCase() === email);

  if (!submission) {
    return res.json({
      success: true,
      status: 'none',
      isPaid: false,
    });
  }

  return res.json({
    success: true,
    status: submission.status,
    isPaid: submission.status === 'approved',
    submission: {
      id: submission.id,
      userEmail: submission.userEmail,
      userName: submission.userName,
      amount: submission.amount,
      utrNumber: submission.utrNumber,
      status: submission.status,
      submittedAt: submission.submittedAt,
      reviewedAt: submission.reviewedAt,
      reviewedBy: submission.reviewedBy,
      rejectionReason: submission.rejectionReason,
      screenshotBase64: submission.screenshotBase64,
      aiScan: submission.aiScan,
    }
  });
});

// 3. Admin: Get all submissions
app.get('/api/admin/submissions', (req, res) => {
  const list = [...paymentSubmissions].sort((a, b) => {
    // Pending first
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
  });

  return res.json({
    success: true,
    submissions: list,
    stats: {
      total: list.length,
      pending: list.filter(s => s.status === 'pending').length,
      approved: list.filter(s => s.status === 'approved').length,
      rejected: list.filter(s => s.status === 'rejected').length,
      totalRevenue: list.filter(s => s.status === 'approved').length * 10
    }
  });
});

// 4. Admin: Approve a payment
app.post('/api/admin/approve', (req, res) => {
  const { submissionId, adminEmail = 'libinvincent89@gmail.com' } = req.body;

  if (!submissionId) {
    return res.status(400).json({ success: false, error: 'submissionId is required.' });
  }

  const sub = paymentSubmissions.find(s => s.id === submissionId);
  if (!sub) {
    return res.status(404).json({ success: false, error: 'Submission not found.' });
  }

  sub.status = 'approved';
  sub.reviewedAt = new Date().toISOString();
  sub.reviewedBy = adminEmail;

  // Save to UTR registry to enforce uniqueness
  if (sub.utrNumber) {
    utrRegistry[sub.utrNumber] = {
      utrNumber: sub.utrNumber,
      email: sub.userEmail,
      amount: sub.amount || 10,
      verifiedAt: sub.reviewedAt,
      source: sub.screenshotBase64 ? 'ai_screenshot' : 'manual_utr',
      details: `Approved by admin (${adminEmail})`
    };
    saveUtrRegistry(utrRegistry);
  }

  saveSubmissions(paymentSubmissions);

  return res.json({
    success: true,
    message: `Payment for ${sub.userEmail} approved! Course modules and community links unlocked.`,
    submission: sub
  });
});

// 5. Admin: Reject a payment
app.post('/api/admin/reject', (req, res) => {
  const { submissionId, reason = 'Amount or receipt details could not be verified', adminEmail = 'libinvincent89@gmail.com' } = req.body;

  if (!submissionId) {
    return res.status(400).json({ success: false, error: 'submissionId is required.' });
  }

  const sub = paymentSubmissions.find(s => s.id === submissionId);
  if (!sub) {
    return res.status(404).json({ success: false, error: 'Submission not found.' });
  }

  sub.status = 'rejected';
  sub.reviewedAt = new Date().toISOString();
  sub.reviewedBy = adminEmail;
  sub.rejectionReason = reason;

  saveSubmissions(paymentSubmissions);

  return res.json({
    success: true,
    message: `Payment for ${sub.userEmail} rejected.`,
    submission: sub
  });
});

// 6. Admin: Bulk approve all pending
app.post('/api/admin/bulk-approve', (req, res) => {
  const { adminEmail = 'libinvincent89@gmail.com' } = req.body;
  let approvedCount = 0;

  paymentSubmissions.forEach(sub => {
    if (sub.status === 'pending') {
      sub.status = 'approved';
      sub.reviewedAt = new Date().toISOString();
      sub.reviewedBy = adminEmail;

      if (sub.utrNumber) {
        utrRegistry[sub.utrNumber] = {
          utrNumber: sub.utrNumber,
          email: sub.userEmail,
          amount: sub.amount || 10,
          verifiedAt: sub.reviewedAt,
          source: 'ai_screenshot',
          details: `Bulk approved by admin (${adminEmail})`
        };
      }
      approvedCount++;
    }
  });

  saveUtrRegistry(utrRegistry);
  saveSubmissions(paymentSubmissions);

  return res.json({
    success: true,
    approvedCount,
    message: `Successfully approved ${approvedCount} pending payments!`
  });
});

// Backward-compatible direct verify endpoint
app.post('/api/verify-screenshot', async (req, res) => {
  return res.redirect(307, '/api/payment/submit');
});
app.post('/api/verify-manual-utr', (req, res) => {
  const { utrNumber, userEmail } = req.body;

  if (!utrNumber || !userEmail) {
    return res.status(400).json({
      success: false,
      error: 'UTR number and user email are required.'
    });
  }

  const cleanUtr = utrNumber.trim().replace(/[^0-9a-zA-Z]/g, '');

  if (cleanUtr.length < 8) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid 12-digit UPI reference number.'
    });
  }

  // Check uniqueness in registry
  if (utrRegistry[cleanUtr]) {
    const prior = utrRegistry[cleanUtr];
    if (prior.email !== userEmail) {
      return res.status(400).json({
        success: false,
        error: `Duplicate UTR detected: Transaction ID / UTR (${cleanUtr}) was already redeemed by another user (${prior.email}). Each ₹10 payment can only be used once.`,
        isDuplicate: true
      });
    }
  }

  // Register the UTR
  utrRegistry[cleanUtr] = {
    utrNumber: cleanUtr,
    email: userEmail,
    amount: 10,
    verifiedAt: new Date().toISOString(),
    source: 'manual_utr',
  };
  saveUtrRegistry(utrRegistry);

  const generatedTxnId = `UPI-MAN-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return res.json({
    success: true,
    utrNumber: cleanUtr,
    transactionId: generatedTxnId,
    verifiedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  });
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`AppLern ₹10 server running on http://localhost:${PORT}`);
  });
}

startServer();
