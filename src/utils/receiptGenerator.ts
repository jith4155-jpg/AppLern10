/**
 * Generates realistic base64 UPI payment receipt images
 * for testing Gemini AI OCR verification.
 */

export function generateSampleReceiptBase64(type: 'valid_10' | 'wrong_amount' | 'duplicate_utr'): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      resolve('');
      return;
    }

    const isWrongAmount = type === 'wrong_amount';
    const isDuplicate = type === 'duplicate_utr';

    const amountText = isWrongAmount ? '₹50.00' : '₹10.00';
    const utr = isDuplicate 
      ? '430129841234' // Seeded duplicate UTR
      : `43${Date.now().toString().slice(-10)}`;
    const now = new Date();
    const dateText = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Background - Google Pay / PhonePe style deep clean receipt
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header gradient banner
    const grad = ctx.createLinearGradient(0, 0, 600, 260);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(1, '#312e81');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, 240);

    // Green Success Icon Circle
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(300, 110, 48, 0, Math.PI * 2);
    ctx.fill();

    // White Checkmark
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(280, 110);
    ctx.lineTo(295, 125);
    ctx.lineTo(325, 95);
    ctx.stroke();

    // Paid to AppLern title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Paid to AppLern Education', 300, 195);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText('UPI ID: applern10@upi', 300, 220);

    // Amount Banner Card
    ctx.fillStyle = '#1e293b';
    ctx.roundRect(40, 270, 520, 140, 20);
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Transaction Amount', 300, 310);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '900 52px sans-serif';
    ctx.fillText(amountText, 300, 375);

    // Transaction Details Card
    ctx.fillStyle = '#1e293b';
    ctx.roundRect(40, 440, 520, 360, 20);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px sans-serif';
    ctx.fillText('Payment Status', 70, 480);
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Completed / Successful', 70, 508);

    // Divider
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(70, 530);
    ctx.lineTo(530, 530);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px sans-serif';
    ctx.fillText('Date & Time', 70, 565);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(dateText, 70, 593);

    // Divider
    ctx.beginPath();
    ctx.moveTo(70, 615);
    ctx.lineTo(530, 615);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px sans-serif';
    ctx.fillText('UPI Reference / UTR Number', 70, 650);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(utr, 70, 680);

    // Divider
    ctx.beginPath();
    ctx.moveTo(70, 705);
    ctx.lineTo(530, 705);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px sans-serif';
    ctx.fillText('Payment Mode', 70, 740);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Unified Payments Interface (UPI 2.0)', 70, 768);

    // Bottom Watermark
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = '13px sans-serif';
    ctx.fillText('NPCI / UPI Verified Transaction Receipt • AppLern ₹10', 300, 850);

    resolve(canvas.toDataURL('image/jpeg', 0.9));
  });
}
