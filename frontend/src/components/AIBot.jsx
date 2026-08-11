import { useState, useRef, useEffect } from 'react';
import { IoClose, IoSend } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';
import { RiRobot2Line } from 'react-icons/ri';
import { FaRobot } from 'react-icons/fa';

export default function AIBot() {
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am Porulon\'s AI Assistant. How can I assist you with our AI solutions, cloud systems, or training programs today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  if (isHidden) return null;

  const quickPrompts = [
    'What AI solutions do you offer?',
    'Tell me about Porulon Academy',
    'How do I get a project quote?',
    'Contact Sales team',
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = 'Thank you for asking! Our engineering team specializes in AI, ML, and enterprise software. Feel free to contact us at info@porulontech.com or call +91 97918 82387 for immediate support.';
      const lower = query.toLowerCase();

      if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('ml') || lower.includes('solution')) {
        botResponse = 'We build custom AI & ML solutions including predictive engines, NLP cognitive agents, computer vision, and generative AI models tailored to optimize business operations.';
      } else if (lower.includes('academy') || lower.includes('training') || lower.includes('course') || lower.includes('student')) {
        botResponse = 'Porulon Academy offers industry-aligned technical training in Full-Stack development, AI/ML, Cloud DevOps, and Data Science for students and corporate teams.';
      } else if (lower.includes('quote') || lower.includes('project') || lower.includes('price') || lower.includes('cost')) {
        botResponse = 'You can request a free project consultation and quote by visiting our Contact page or emailing info@porulontech.com. Our architects respond within 24 hours!';
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('sales')) {
        botResponse = 'Reach our team directly:\n• Sales: +91 97918 82387\n• HR: +91 99005 59922\n• Projects: +91 97900 05442\n• Email: info@porulontech.com';
      } else if (lower.includes('cloud') || lower.includes('devops') || lower.includes('aws') || lower.includes('azure')) {
        botResponse = 'Our Cloud Architecture services cover AWS/Azure/GCP cloud-native migrations, microservices, serverless scaling, and zero-downtime DevOps pipelines.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="fixed bottom-24 right-6 z-50 font-sans">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] h-[480px] rounded-3xl glass-card bg-white/95 dark:bg-[#0c0a1a]/95 border border-slate-200 dark:border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl flex flex-col overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
                  <FaRobot className="text-lg" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-purple-900 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-tight leading-none text-white">
                  Porulon AI Assistant
                </h4>
                <span className="text-[10px] text-purple-200 font-light tracking-wide inline-flex items-center gap-1 mt-1">
                  <HiSparkles className="text-amber-300" /> Online • Ready to help
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="w-7 h-7 rounded-full flex items-center justify-center text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <IoClose className="text-lg" />
              </button>
              <button
                onClick={() => setIsHidden(true)}
                title="Hide AI Bot"
                className="w-7 h-7 rounded-full flex items-center justify-center text-purple-200 hover:text-white hover:bg-red-500/80 transition-colors text-xs font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-[#070512]/60 no-scrollbar">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed font-light ${
                    m.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-xs shadow-md'
                      : 'bg-white dark:bg-[#14102b] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-purple-500/20 rounded-bl-xs shadow-sm whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9.5px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white dark:bg-[#14102b] border border-slate-200/80 dark:border-purple-500/20 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 bg-white dark:bg-[#0c0a1a] border-t border-slate-200/60 dark:border-purple-500/20 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-[10.5px] font-light text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800/60 rounded-full px-2.5 py-1 whitespace-nowrap transition-colors shrink-0 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-[#0c0a1a] border-t border-slate-200/60 dark:border-purple-500/20 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Porulon..."
              className="flex-1 bg-slate-100 dark:bg-[#15112e] text-slate-800 dark:text-white placeholder-slate-400 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-transparent dark:border-purple-500/20 font-light"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
            >
              <IoSend className="text-sm" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="relative group">
          {/* Close/Hide Button Badge on top-right of floating icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsHidden(true);
            }}
            title="Hide AI Bot"
            aria-label="Hide AI Bot"
            className="absolute -top-1.5 -right-1.5 z-20 w-5 h-5 rounded-full bg-slate-900 text-slate-300 hover:text-white hover:bg-red-500 border border-white/20 flex items-center justify-center text-[10px] font-bold shadow-md transition-all cursor-pointer opacity-90 group-hover:opacity-100"
          >
            ✕
          </button>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
            className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(109,40,217,0.55)] hover:shadow-[0_12px_40px_rgba(109,40,217,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <FaRobot className="text-2xl" />
              <HiSparkles className="absolute -top-1 -right-1.5 text-xs text-amber-300 animate-pulse" />
            </div>
            <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping pointer-events-none -z-10" />
          </button>
        </div>
      )}
    </div>
  );
}
