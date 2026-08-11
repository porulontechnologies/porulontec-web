import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getContactMessages, updateMessageStatus, deleteContactMessage } from '../api/adminApi';
import { useTheme } from '../context/ThemeContext';
import { Mail, Trash2, CheckCircle2, Clock, Filter, Phone, User, Inbox, AlertCircle } from 'lucide-react';

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
    if (confirm('Delete this message inquiry?')) {
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
    <div className={`flex-1 min-h-screen transition-colors ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header title="Contact Messages & Inquiries" subtitle="Submissions received directly from website contact forms" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Banner Action Bar */}
        <div className={`p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
          isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 font-extrabold text-xs mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Inbound Portal Inbox</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">Customer Messages ({messages.length})</h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Filter, review, and track response statuses for inquiries.
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            {['all', 'unread', 'read', 'replied'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold capitalize transition-all ${
                  filterStatus === st
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-400">Loading messages...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200'}`}>
            <Inbox className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-bold">No messages found</h3>
            <p className="text-xs text-slate-400 mt-1">Inquiries submitted via `/contact` will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((m) => {
              const msgId = m._id || m.id;
              return (
                <div
                  key={msgId}
                  className={`rounded-3xl border p-5 transition-all space-y-3 ${
                    isDark ? 'bg-[#121824] border-[#1f293d]' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-500/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                        {m.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-extrabold text-white">{m.name}</h4>
                          <span className="text-xs text-purple-400 font-semibold">{m.email}</span>
                        </div>
                        {m.phone && (
                          <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-purple-400" /> {m.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={m.status || 'unread'}
                        onChange={(e) => handleStatusChange(msgId, e.target.value)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold border ${
                          isDark ? 'bg-[#1a2233] border-[#222d42] text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'
                        }`}
                      >
                        <option value="unread">🟡 Unread</option>
                        <option value="read">🔵 Read</option>
                        <option value="replied">🟢 Replied</option>
                      </select>

                      <button
                        onClick={() => handleDelete(msgId)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/5 font-medium">
                    {m.message}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>Received: {m.createdAt ? new Date(m.createdAt).toLocaleString() : 'Recently'}</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">ID: #{String(msgId).slice(-6)}</span>
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
