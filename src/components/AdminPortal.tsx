import React, { useState, useEffect } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  onSnapshot, 
  updateDoc, 
  orderBy, 
  writeBatch 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AppSettings, useAppSettings } from '../hooks/useAppSettings';
import { PaymentSubmission } from '../types';
import { 
  Save, 
  RefreshCw, 
  Settings as SettingsIcon, 
  QrCode, 
  Link as LinkIcon, 
  Phone, 
  IndianRupee,
  Type,
  AlertCircle,
  X,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Eye,
  Users,
  Check,
  Zap,
  TrendingDown,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

interface AdminPortalProps {
  onClose: () => void;
  userEmail: string;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose, userEmail }) => {
  const { settings: initialSettings, loading: settingsLoading } = useAppSettings();
  const [formData, setFormData] = useState<AppSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<'approvals' | 'users' | 'payment' | 'content' | 'ui'>('approvals');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Approvals & Users State
  const [submissions, setSubmissions] = useState<PaymentSubmission[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalRevenue: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Payment amount could not be confirmed as ₹10');

  useEffect(() => {
    if (!settingsLoading) {
      setFormData(initialSettings);
    }
  }, [initialSettings, settingsLoading]);

  // Real-time listeners for Payments and Users
  useEffect(() => {
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, orderBy('submittedAt', 'desc'));

    const unsubscribePayments = onSnapshot(q, (snapshot) => {
      const subs: PaymentSubmission[] = [];
      let total = 0, pending = 0, approved = 0, rejected = 0, revenue = 0;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const sub = { id: docSnap.id, ...data } as PaymentSubmission;
        subs.push(sub);

        total++;
        if (sub.status === 'pending') pending++;
        if (sub.status === 'approved') {
          approved++;
          revenue += sub.amount || 0;
        }
        if (sub.status === 'rejected') rejected++;
      });

      setSubmissions(subs);
      setStats({ total, pending, approved, rejected, totalRevenue: revenue });
    });

    const usersRef = collection(db, 'users');
    const usersQuery = query(usersRef, orderBy('userTokenNumber', 'desc'));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const users: any[] = [];
      snapshot.forEach((docSnap) => {
        users.push({ id: docSnap.id, ...docSnap.data() });
      });
      setRegisteredUsers(users);
    });

    return () => {
      unsubscribePayments();
      unsubscribeUsers();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'coursePrice' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');
    setErrorMessage('');

    try {
      const docRef = doc(db, 'settings', 'app-config');
      await setDoc(docRef, {
        ...formData,
        updatedAt: new Date().toISOString(),
        updatedBy: userEmail
      }, { merge: true });
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      console.error("Error saving settings:", err);
      setSaveStatus('error');
      setErrorMessage(err.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleApprove = async (sub: PaymentSubmission) => {
    if (!sub.id) return;
    setActionInProgress(sub.id);
    try {
      const batch = writeBatch(db);
      const paymentRef = doc(db, 'payments', sub.id);
      batch.update(paymentRef, {
        status: 'approved',
        reviewedAt: new Date().toISOString(),
        reviewedBy: userEmail
      });

      if (sub.userId) {
        const userRef = doc(db, 'users', sub.userId);
        batch.update(userRef, {
          isPaid: true,
          paymentDetails: {
            transactionId: sub.id,
            utrNumber: sub.utrNumber,
            paidAt: new Date().toISOString(),
            amount: sub.amount,
            paymentMethod: 'UPI (Admin Approved)'
          }
        });
      }
      await batch.commit();
    } catch (err) {
      console.error('Approve failed:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (subId: string) => {
    setActionInProgress(subId);
    try {
      const paymentRef = doc(db, 'payments', subId);
      await updateDoc(paymentRef, {
        status: 'rejected',
        rejectionReason: rejectReason,
        reviewedAt: new Date().toISOString(),
        reviewedBy: userEmail
      });
      setRejectingId(null);
    } catch (err) {
      console.error('Reject failed:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleBulkApprove = async () => {
    const pendingSubs = submissions.filter(s => s.status === 'pending');
    if (pendingSubs.length === 0) return;

    setActionInProgress('bulk');
    try {
      const batch = writeBatch(db);
      for (const sub of pendingSubs) {
        const paymentRef = doc(db, 'payments', sub.id!);
        batch.update(paymentRef, {
          status: 'approved',
          reviewedAt: new Date().toISOString(),
          reviewedBy: userEmail
        });

        if (sub.userId) {
          const userRef = doc(db, 'users', sub.userId);
          batch.update(userRef, { isPaid: true });
        }
      }
      await batch.commit();
    } catch (err) {
      console.error('Bulk approve failed:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  if (settingsLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-slate-300 font-bold">Loading Admin Controls...</p>
        </div>
      </div>
    );
  }

  const filteredSubmissions = submissions.filter(s => {
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesSearch = 
      s.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.utrNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.userTokenNumber?.toString().includes(searchQuery) ||
      s.tokenNumber?.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const filteredUsers = registeredUsers.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.userTokenNumber?.toString().includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-4 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">AppLern Total Management</h2>
              <p className="text-xs text-slate-400">Complete control over content, users, and payments.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-950/50 border-b border-slate-800 p-1 shrink-0 overflow-x-auto scrollbar-none">
          {[
            { id: 'approvals', label: `Approvals ${stats.pending > 0 ? `(${stats.pending})` : ''}`, icon: IndianRupee },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'payment', label: 'UPI & Price', icon: QrCode },
            { id: 'content', label: 'App Content', icon: Type },
            { id: 'ui', label: 'Community', icon: LinkIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setSearchQuery(''); }}
              className={`flex-1 py-3 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap rounded-xl ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar for Approvals/Users */}
        {(activeTab === 'approvals' || activeTab === 'users') && (
          <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex items-center gap-3 shrink-0">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search by Token #, Email, or ${activeTab === 'approvals' ? 'UTR' : 'Name'}...`}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:ring-1 focus:ring-indigo-500 outline-none font-bold"
              />
            </div>
            {activeTab === 'approvals' && (
              <div className="flex items-center gap-2">
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                  {(['pending', 'all'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setStatusFilter(f)}
                      className={`px-3 py-1 rounded text-[10px] font-bold capitalize ${statusFilter === f ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          
          {/* TAB: Approvals */}
          {activeTab === 'approvals' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Pending</span>
                  <div className="text-lg font-black text-amber-400">{stats.pending}</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Approved</span>
                  <div className="text-lg font-black text-emerald-400">{stats.approved}</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Revenue</span>
                  <div className="text-lg font-black text-indigo-400">₹{stats.totalRevenue}</div>
                </div>
                <button
                  onClick={handleBulkApprove}
                  className="p-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase transition-all"
                >
                  Bulk Approve
                </button>
              </div>

              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>No payment requests found.</p>
                </div>
              ) : (
                filteredSubmissions.map(sub => (
                  <div key={sub.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {sub.screenshotBase64 ? (
                        <img 
                          src={sub.screenshotBase64} 
                          className="w-12 h-12 rounded-lg object-cover border border-slate-800 cursor-pointer" 
                          onClick={() => setPreviewImage(sub.screenshotBase64!)}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-[10px] text-slate-600 border border-slate-800">UTR</div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-black">#{sub.userTokenNumber}</span>
                          <span className="text-sm font-bold text-white">{sub.userName}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{sub.userEmail}</div>
                        <div className="text-[10px] text-indigo-400 mt-0.5">UTR: {sub.utrNumber} • ₹{sub.amount}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {sub.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApprove(sub)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectingId(sub.id!)}
                            className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-[10px] font-bold"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`text-[10px] font-bold uppercase ${sub.status === 'approved' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {sub.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: Users */}
          {activeTab === 'users' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12 text-slate-500">No users found.</div>
              ) : (
                filteredUsers.map(u => (
                  <div key={u.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-xs">
                        #{u.userTokenNumber}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          {u.name}
                          {u.isPaid && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{u.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {u.isPaid ? (
                        <span className="text-[10px] font-black text-emerald-400 uppercase">Verified</span>
                      ) : (
                        <button
                          onClick={async () => {
                            if (confirm(`Unlock dashboard for ${u.email}?`)) {
                              await updateDoc(doc(db, 'users', u.id), { isPaid: true });
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold"
                        >
                          Manual Unlock
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Settings Tabs (payment, content, ui) - Keeping existing logic */}
          {(activeTab === 'payment' || activeTab === 'content' || activeTab === 'ui') && (
            <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
              {activeTab === 'payment' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Merchant Name</label>
                      <input type="text" name="payeeName" value={formData.payeeName} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">UPI ID</label>
                      <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none font-mono" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Course Price (INR)</label>
                      <input type="number" name="coursePrice" value={formData.coursePrice} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">QR Image URL</label>
                      <input type="text" name="qrImageUrl" value={formData.qrImageUrl || ''} onChange={handleChange} placeholder="/assets/aistudio/..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Hero Title</label>
                    <input type="text" name="heroTitle" value={formData.heroTitle || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Hero Highlight</label>
                    <input type="text" name="heroHighlight" value={formData.heroHighlight || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Description</label>
                    <textarea name="courseDescription" value={formData.courseDescription || ''} onChange={handleChange} rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none resize-none" />
                  </div>
                </div>
              )}

              {activeTab === 'ui' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">WhatsApp Link</label>
                      <input type="text" name="whatsappGroupLink" value={formData.whatsappGroupLink} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Community Link</label>
                      <input type="text" name="communityLink" value={formData.communityLink || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Emergency Contact</label>
                    <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none" required />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                {saveStatus === 'success' && <span className="text-emerald-400 text-xs font-bold">Saved successfully!</span>}
                <button type="submit" disabled={isSaving} className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50">
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-950 border-t border-slate-800 p-4 sm:p-6 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>AMJ FILM PRODUCTION • Admin Session: {userEmail}</span>
          <button onClick={onClose} className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold">Close</button>
        </div>

      </div>

      {/* Preview Image Lightbox */}
      {previewImage && (
        <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-lg w-full bg-slate-900 rounded-3xl p-2 border border-slate-700">
            <img src={previewImage} className="w-full h-auto rounded-2xl max-h-[85vh] object-contain" />
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Reject Payment</h3>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400">Rejection Reason</label>
              <textarea 
                value={rejectReason} 
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white resize-none h-24"
              />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleReject(rejectingId)} className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs">Confirm Reject</button>
              <button onClick={() => setRejectingId(null)} className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

