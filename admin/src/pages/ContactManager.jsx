import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getContactMessages, updateMessageStatus, deleteContactMessage } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import { Mail, Trash2, Clock, Phone, Inbox } from 'lucide-react';

export default function ContactManager() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const loadMessages = () => {
    setLoading(true);
    getContactMessages()
      .then((res) => setMessages(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateMessageStatus(id, status);
      loadMessages();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this customer inquiry?')) {
      try {
        await deleteContactMessage(id);
        loadMessages();
      } catch (err) {
        alert('Failed to delete message: ' + err.message);
      }
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filterStatus === 'all') return true;
    return m.status === filterStatus;
  });

  return (
    <div className={`flex-1 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <Header title="Contact Messages & Inquiries" subtitle="Submissions received directly from website contact forms" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Simple & Neat Top Action Bar */}
        <div className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
          isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-white border-slate-200 shadow-2xs'
        }`}>
          <div>
            <h1 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Customer Inquiries ({messages.length})
            </h1>
            <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Filter, review, and manage response statuses for inbound website leads
            </p>
          </div>

          {/* Status Filter Pills */}
          <div className={`flex items-center gap-1.5 p-1 rounded-full border ${
            isDark ? 'bg-[#0b0f19] border-[#1f2a3e]' : 'bg-slate-100 border-slate-200'
          }`}>
            {['all', 'unread', 'read', 'replied'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold capitalize transition-all ${
                  filterStatus === st
                    ? 'bg-purple-600 text-white shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List with Bright Light Theme Contrast */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Loading messages...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border ${
            isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-white border-slate-200 shadow-2xs'
          }`}>
            <Inbox className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>No messages found</h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Inquiries submitted via `/contact` will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((m) => {
              const msgId = m._id || m.id;
              return (
                <div
                  key={msgId}
                  className={`rounded-2xl border p-5 transition-all space-y-4 ${
                    isDark ? 'bg-[#131927] border-[#1f2a3e]' : 'bg-white border-slate-200/90 shadow-2xs'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/20 dark:border-[#1f2a3e]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                        {m.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{m.name}</h4>
                          <span className={`text-xs font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>{m.email}</span>
                        </div>
                        {m.phone && (
                          <span className={`text-xs font-medium flex items-center gap-1 mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            <Phone className="w-3 h-3 text-purple-500" /> {m.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={m.status || 'unread'}
                        onChange={(e) => handleStatusChange(msgId, e.target.value)}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold border transition-all ${
                          isDark 
                            ? 'bg-[#0b0f19] border-[#1f2a3e] text-slate-200' 
                            : 'bg-slate-100 border-slate-300 text-slate-900 font-extrabold'
                        }`}
                      >
                        <option value="unread">🟡 Unread</option>
                        <option value="read">🔵 Read</option>
                        <option value="replied">🟢 Replied</option>
                      </select>

                      <button
                        onClick={() => handleDelete(msgId)}
                        className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Bright High-Contrast Message Text Block */}
                  <div className={`text-xs whitespace-pre-wrap leading-relaxed p-4 rounded-xl font-medium ${
                    isDark 
                      ? 'bg-[#0b0f19] border border-[#1f2a3e] text-slate-200' 
                      : 'bg-slate-50 border border-slate-200 text-slate-900 font-semibold'
                  }`}>
                    {m.message}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold pt-1">
                    <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      <span>Received: {m.createdAt ? new Date(m.createdAt).toLocaleString() : 'Recently'}</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">ID: #{String(msgId).slice(-6)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
