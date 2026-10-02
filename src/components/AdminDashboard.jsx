import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../firebase/inquiries';
import { getAddons, saveAddon, deleteAddon } from '../firebase/addons';
import Button from './ui/Button';

export default function AdminDashboard({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('inquiries');

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Addons State
  const [addons, setAddons] = useState([]);
  const [editingAddon, setEditingAddon] = useState(null);
  const [isAddonModalOpen, setIsAddonModalOpen] = useState(false);

  // Announcement / Quick settings state
  const [announcement, setAnnouncement] = useState(() => localStorage.getItem('mubeen_announcement') || '');
  const [showAnnouncement, setShowAnnouncement] = useState(() => localStorage.getItem('mubeen_show_announcement') === 'true');
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    });

    // Check session storage for passcode auth
    if (sessionStorage.getItem('mubeen_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadInquiries();
      loadAddons();
    }
  }, [isAuthenticated, isOpen]);

  const loadInquiries = async () => {
    setLoadingInquiries(true);
    const data = await getInquiries();
    setInquiries(data);
    setLoadingInquiries(false);
  };

  const loadAddons = async () => {
    const data = await getAddons();
    setAddons(data);
  };

  const handlePasscodeLogin = (e) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === 'mubeen782' || passcode.trim() === '782' || passcode.trim() === 'admin123') {
      sessionStorage.setItem('mubeen_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Please try again or use Google Sign In.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsAuthenticated(true);
      setAuthError('');
    } catch (err) {
      setAuthError(err?.message || 'Google sign-in failed');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    sessionStorage.removeItem('mubeen_admin_auth');
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateInquiryStatus(id, newStatus);
    setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    await deleteInquiry(id);
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveAddon = async (e) => {
    e.preventDefault();
    if (!editingAddon?.title) return;
    await saveAddon(editingAddon);
    await loadAddons();
    setIsAddonModalOpen(false);
    setEditingAddon(null);
  };

  const handleDeleteAddon = async (id) => {
    if (!id || !window.confirm('Delete this addon?')) return;
    await deleteAddon(id);
    await loadAddons();
  };

  const handleSaveSettings = () => {
    localStorage.setItem('mubeen_announcement', announcement);
    localStorage.setItem('mubeen_show_announcement', showAnnouncement ? 'true' : 'false');
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const exportInquiriesCsv = () => {
    if (!inquiries.length) return;
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Service', 'Status', 'Message'];
    const rows = inquiries.map((i) => [
      `"${i.createdAt}"`,
      `"${i.name}"`,
      `"${i.email}"`,
      `"${i.phone || ''}"`,
      `"${i.service || ''}"`,
      `"${i.status}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mubeen_khatri_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(20, 19, 18, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-16)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '92vh',
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-card)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: 'var(--space-20) var(--space-32)',
            backgroundColor: '#1E1D1B',
            color: 'var(--color-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                backgroundColor: 'var(--color-primary)',
              }}
            />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-white)', margin: 0 }}>
              Mubeen Khatri — Admin Control Center
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                style={{
                  fontSize: '0.85rem',
                  color: '#DDD',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: 'none',
                }}
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-white)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div style={{ padding: 'var(--space-64) var(--space-32)', maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-subtle)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-20)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-ink)' }}>
              Private Owner Access
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-32)' }}>
              Enter your admin passcode or log in with Google to manage inquiries and addons.
            </p>

            {authError && (
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#FFEBEE',
                  color: '#C62828',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  marginBottom: 'var(--space-16)',
                }}
              >
                {authError}
              </div>
            )}

            <form onSubmit={handlePasscodeLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="password"
                placeholder="Enter Admin Passcode (e.g. mubeen782)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="form-input"
                autoFocus
              />

              <Button type="submit" variant="primary" size="md" style={{ justifyContent: 'center' }}>
                Unlock Dashboard
              </Button>
            </form>

            <div style={{ margin: 'var(--space-20) 0', color: 'var(--color-ink-subtle)', fontSize: '0.85rem' }}>
              — or —
            </div>

            <Button
              onClick={handleGoogleLogin}
              variant="secondary"
              size="md"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign In with Google
            </Button>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
            {/* Tab Navigation */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: 'var(--space-12) var(--space-32)',
                backgroundColor: 'var(--color-secondary-light)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <button
                onClick={() => setActiveTab('inquiries')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  backgroundColor: activeTab === 'inquiries' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'inquiries' ? '#FFF' : 'var(--color-ink)',
                }}
              >
                Inquiries Inbox ({inquiries.filter((i) => i.status === 'new').length} New)
              </button>

              <button
                onClick={() => setActiveTab('addons')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  backgroundColor: activeTab === 'addons' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'addons' ? '#FFF' : 'var(--color-ink)',
                }}
              >
                SEO Add-ons ({addons.length})
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  backgroundColor: activeTab === 'settings' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'settings' ? '#FFF' : 'var(--color-ink)',
                }}
              >
                Live Controls & Settings
              </button>
            </div>

            {/* Tab 1: Inquiries Inbox */}
            {activeTab === 'inquiries' && (
              <div style={{ padding: 'var(--space-24) var(--space-32)', overflowY: 'auto', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-20)' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Client Messages & Inquiries</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                      Every submission on your website form is saved here in Firestore. You will never miss an email or client lead.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button onClick={loadInquiries} variant="secondary" size="sm">
                      ↻ Refresh
                    </Button>
                    <Button onClick={exportInquiriesCsv} variant="subtle" size="sm">
                      📥 Export CSV
                    </Button>
                  </div>
                </div>

                {loadingInquiries ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-ink-muted)' }}>
                    Loading inquiries from database...
                  </div>
                ) : inquiries.length === 0 ? (
                  <div
                    style={{
                      padding: 'var(--space-48)',
                      textAlign: 'center',
                      backgroundColor: 'var(--color-secondary-light)',
                      borderRadius: 'var(--radius-card)',
                      border: '1px dashed var(--color-border)',
                    }}
                  >
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '8px' }}>
                      No inquiries recorded yet
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)' }}>
                      When a client fills out the contact form on your website, it appears here immediately!
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                    {inquiries.map((inq) => {
                      const isNew = inq.status === 'new';
                      const formattedDate = new Date(inq.createdAt).toLocaleString();
                      const clientPhone = inq.phone ? inq.phone.replace(/[^0-9+]/g, '') : '';
                      const whatsappLink = clientPhone ? `https://wa.me/${clientPhone}` : null;
                      const mailtoLink = `mailto:${inq.email}?subject=RE: SEO Inquiry&body=Hi ${inq.name},`;

                      return (
                        <div
                          key={inq.id}
                          style={{
                            padding: 'var(--space-20)',
                            borderRadius: '12px',
                            border: `1px solid ${isNew ? 'var(--color-primary-border)' : 'var(--color-border)'}`,
                            backgroundColor: isNew ? '#FFFDFB' : 'var(--color-white)',
                            boxShadow: 'var(--shadow-resting)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-ink)' }}>
                                  {inq.name}
                                </span>
                                {isNew && (
                                  <span
                                    style={{
                                      fontSize: '0.75rem',
                                      backgroundColor: 'var(--color-primary)',
                                      color: '#FFF',
                                      padding: '2px 8px',
                                      borderRadius: '4px',
                                      fontWeight: 700,
                                    }}
                                  >
                                    NEW
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', marginTop: '2px' }}>
                                ✉️ {inq.email} {inq.phone && `· 📞 ${inq.phone}`} · 📌 {inq.service || 'General'}
                              </div>
                            </div>

                            <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-subtle)' }}>
                              {formattedDate}
                            </div>
                          </div>

                          {/* Message Body */}
                          <p
                            style={{
                              backgroundColor: 'var(--color-secondary-light)',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              fontSize: '0.95rem',
                              color: 'var(--color-ink)',
                              margin: '12px 0',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {inq.message}
                          </p>

                          {/* Quick Actions */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {whatsappLink && (
                                <a
                                  href={whatsappLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: '#2E7D32',
                                    backgroundColor: '#E8F5E9',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                  }}
                                >
                                  💬 Chat on WhatsApp
                                </a>
                              )}

                              <a
                                href={mailtoLink}
                                style={{
                                  fontSize: '0.85rem',
                                  fontWeight: 600,
                                  color: 'var(--color-primary)',
                                  backgroundColor: 'var(--color-primary-subtle)',
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                ✉️ Reply via Email
                              </a>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <select
                                value={inq.status}
                                onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                                style={{
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  border: '1px solid var(--color-border)',
                                  fontSize: '0.85rem',
                                }}
                              >
                                <option value="new">Mark New</option>
                                <option value="contacted">Mark Contacted</option>
                                <option value="archived">Mark Archived</option>
                              </select>

                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                style={{
                                  color: '#C62828',
                                  border: 'none',
                                  background: 'none',
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  padding: '4px',
                                }}
                              >
                                🗑 Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: SEO Add-ons Manager */}
            {activeTab === 'addons' && (
              <div style={{ padding: 'var(--space-24) var(--space-32)', overflowY: 'auto', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-20)' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Custom SEO Add-ons Manager</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                      Create, edit, and toggle additional SEO packages displayed on your website.
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setEditingAddon({
                        title: '',
                        description: '',
                        price: 'Custom',
                        category: 'SEO Addon',
                        isActive: true,
                        deliveryTime: '2–3 Days',
                      });
                      setIsAddonModalOpen(true);
                    }}
                    variant="primary"
                    size="sm"
                  >
                    + Add New Add-on
                  </Button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-16)' }}>
                  {addons.map((addon) => (
                    <div
                      key={addon.id}
                      style={{
                        padding: 'var(--space-20)',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-white)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {addon.category}
                        </span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: addon.isActive ? '#2E7D32' : '#C62828',
                          }}
                        >
                          {addon.isActive ? '● Active on Site' : '○ Hidden'}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>{addon.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', marginBottom: '16px', flexGrow: 1 }}>
                        {addon.description}
                      </p>

                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '12px' }}>
                        Price: {addon.price} {addon.deliveryTime && `· ⏱ ${addon.deliveryTime}`}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '10px' }}>
                        <Button
                          onClick={() => {
                            setEditingAddon(addon);
                            setIsAddonModalOpen(true);
                          }}
                          variant="secondary"
                          size="sm"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteAddon(addon.id)}
                          variant="subtle"
                          size="sm"
                          style={{ color: '#C62828' }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Live Settings */}
            {activeTab === 'settings' && (
              <div style={{ padding: 'var(--space-24) var(--space-32)', overflowY: 'auto', flexGrow: 1, maxWidth: '680px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Website Live Overrides</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-24)' }}>
                  Manage site-wide announcement banners and instant contact details.
                </p>

                {settingsSaved && (
                  <div style={{ padding: '10px', backgroundColor: '#E8F5E9', color: '#2E7D32', borderRadius: '6px', marginBottom: '16px' }}>
                    ✓ Settings saved successfully!
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        checked={showAnnouncement}
                        onChange={(e) => setShowAnnouncement(e.target.checked)}
                      />
                      Enable Top Announcement Banner
                    </label>
                  </div>

                  {showAnnouncement && (
                    <div className="form-group">
                      <label className="form-label">Announcement Banner Text</label>
                      <input
                        type="text"
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        placeholder="e.g. Special Offer: 20% discount on Wikipedia Backlink packages this week!"
                        className="form-input"
                      />
                    </div>
                  )}

                  <div style={{ marginTop: '16px' }}>
                    <Button onClick={handleSaveSettings} variant="primary" size="md">
                      Save Settings
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Addon Modal */}
        {isAddonModalOpen && editingAddon && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFF',
                borderRadius: '12px',
                padding: '24px',
                width: '100%',
                maxWidth: '480px',
                boxShadow: 'var(--shadow-hover)',
              }}
            >
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
                {editingAddon.id ? 'Edit Add-on' : 'New Add-on'}
              </h4>

              <form onSubmit={handleSaveAddon} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Addon Title *</label>
                  <input
                    type="text"
                    required
                    value={editingAddon.title}
                    onChange={(e) => setEditingAddon({ ...editingAddon, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    value={editingAddon.category}
                    onChange={(e) => setEditingAddon({ ...editingAddon, category: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Price / Fee</label>
                    <input
                      type="text"
                      value={editingAddon.price || ''}
                      onChange={(e) => setEditingAddon({ ...editingAddon, price: e.target.value })}
                      placeholder="e.g. $150 or Quote"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Delivery Time</label>
                    <input
                      type="text"
                      value={editingAddon.deliveryTime || ''}
                      onChange={(e) => setEditingAddon({ ...editingAddon, deliveryTime: e.target.value })}
                      placeholder="e.g. 2–3 Days"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={editingAddon.description}
                    onChange={(e) => setEditingAddon({ ...editingAddon, description: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={editingAddon.isActive}
                      onChange={(e) => setEditingAddon({ ...editingAddon, isActive: e.target.checked })}
                    />
                    Display on Website
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <Button onClick={() => setIsAddonModalOpen(false)} variant="secondary" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Add-on
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
