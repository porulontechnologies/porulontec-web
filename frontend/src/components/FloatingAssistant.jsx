import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import { IoClose, IoSend, IoMail } from 'react-icons/io5';

export default function FloatingAssistant() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 👋 I am Porulon's AI Assistant. How can I assist you with our AI solutions, cloud systems, training programs, or project quotes today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const phoneNumber = '919791882387';
  const defaultMessage = encodeURIComponent(
    'Hello Porulon Technologies! I would like to know more about your AI solutions and services.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  // Click outside to auto-close the expanded options menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen, isTyping]);

  const quickPrompts = [
    'What AI solutions do you offer?',
    'Tell me about Porulon Academy',
    'How do I get a project quote?',
    'Contact Sales team',
  ];

  const getPorulonSmartAIResponse = (query) => {
    const q = query.toLowerCase().trim();

    // 1. GENERAL KNOWLEDGE
    if (
      q.includes('cm of tamilnadu') ||
      q.includes('cm of tamil nadu') ||
      q.includes('chief minister of tamil nadu') ||
      q.includes('who is the cm of tamilnadu') ||
      q.includes('who is cm of tamil nadu') ||
      q.includes('who is the cm of tamil nadu')
    ) {
      return {
        text: 'The Chief Minister of Tamil Nadu is M. K. Stalin (Muthuvel Karunanidhi Stalin), serving since May 2021.',
      };
    }
    if (q.includes('governor of tamil nadu') || q.includes('governor of tamilnadu')) {
      return {
        text: 'The Governor of Tamil Nadu is R. N. Ravi (Ravindra Narayana Ravi).',
      };
    }
    if (q.includes('capital of tamil nadu') || q.includes('capital of tamilnadu')) {
      return {
        text: 'The capital of Tamil Nadu is Chennai (formerly known as Madras).',
      };
    }
    if (
      q.includes('pm of india') ||
      q.includes('prime minister of india') ||
      q.includes('who is the pm of india') ||
      q.includes('who is pm of india')
    ) {
      return {
        text: 'The Prime Minister of India is Narendra Modi, serving since May 2014.',
      };
    }
    if (q.includes('president of india') || q.includes('who is the president of india')) {
      return {
        text: 'The President of India is Droupadi Murmu, the 15th President of India.',
      };
    }
    if (q.includes('capital of india')) {
      return {
        text: 'The capital of India is New Delhi.',
      };
    }

    // 2. PROGRAMMING & TECH DEFINITIONS
    if (q.includes('what is python')) {
      return {
        text: 'Python is a high-level, general-purpose programming language renowned for its clean syntax, dynamic typing, and immense ecosystem for Artificial Intelligence, Machine Learning, Data Science, and Web Development.',
      };
    }
    if (q.includes('what is react')) {
      return {
        text: 'React is a popular open-source JavaScript library developed by Meta (Facebook) for building fast, interactive, component-based user interfaces for web and mobile applications.',
      };
    }
    if (q.includes('what is javascript') || q.includes('what is js')) {
      return {
        text: 'JavaScript is a lightweight, high-level programming language that powers interactive behavior on the web, full-stack Node.js servers, and mobile ecosystems.',
      };
    }
    if (q.includes('what is ai') || q.includes('artificial intelligence')) {
      return {
        text: 'Artificial Intelligence (AI) refers to computer systems engineered to simulate human intelligence, enabling machines to learn, reason, solve complex problems, and process natural language.',
      };
    }

    // 3. DEEP / COMPLEX INQUIRY DETECTOR (Appends Porulon Experts Contact Card)
    const isDeepQuery =
      q.includes('custom llm') ||
      q.includes('hipaa') ||
      q.includes('fine tune') ||
      q.includes('fine-tune') ||
      q.includes('enterprise architecture') ||
      q.includes('custom erp') ||
      q.includes('billion requests') ||
      q.includes('audit codebase') ||
      q.includes('hire dedicated team') ||
      q.includes('enterprise sla') ||
      q.includes('custom budget') ||
      q.split(' ').length > 14;

    if (isDeepQuery) {
      return {
        text: `For deep technical & enterprise architectural inquiries like "${query}", our senior principal architects work directly with your technical team to design custom solutions.`,
        showContactCard: true,
      };
    }

    // 4. PORULON WEBSITE KNOWLEDGE BASE
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|vanakkam)\b/.test(q)) {
      return {
        text: 'Hello! 👋 Welcome to Porulon Technologies. How can I help you today? Feel free to ask any general knowledge questions or inquire about our AI solutions, Cloud architecture, Porulon Academy, or project quotes!',
      };
    }
    if (
      q.includes('who are you') ||
      q.includes('what are you') ||
      q.includes('your name') ||
      q.includes('who built you')
    ) {
      return {
        text: "I am Porulon's AI Assistant 🤖! I can answer general knowledge questions as well as provide full information about Porulon Technologies' software services, AI capabilities, training programs, and contact options.",
      };
    }
    if (
      q.includes('porulon') ||
      q.includes('about company') ||
      q.includes('what do you do') ||
      q.includes('overview') ||
      q.includes('mission')
    ) {
      return {
        text: 'Porulon Technologies is an AI-enabled software engineering services partner based in Coimbatore, Tamil Nadu, India. We build predictive AI engines, cloud infrastructure, full-stack applications, and train engineers through Porulon Academy.',
      };
    }
    if (
      q.includes('service') ||
      q.includes('what do you offer') ||
      q.includes('capabilities') ||
      q.includes('solutions')
    ) {
      return {
        text: 'Porulon offers 6 core engineering services:\n1. 🤖 AI & Machine Learning\n2. ☁️ Cloud Architecture & DevOps\n3. 💻 Full-Stack Web & Mobile Dev\n4. 🛡️ Cybersecurity & Compliance\n5. 🌐 IoT Ecosystems & Edge Computing\n6. 🧪 R&D Consultancy\n\nWhich service would you like to explore?',
      };
    }
    if (
      q.includes('ai') ||
      q.includes('machine learning') ||
      q.includes('ml') ||
      q.includes('nlp') ||
      q.includes('vision') ||
      q.includes('llm') ||
      q.includes('generative')
    ) {
      return {
        text: 'Our AI & ML Division builds:\n• Predictive analytics & automated decision tools\n• NLP & Conversational Cognitive AI\n• Computer Vision & Image Analytics\n• Custom Generative AI & LLM integrations\n• Machine Learning workflow automation.',
      };
    }
    if (
      q.includes('cloud') ||
      q.includes('devops') ||
      q.includes('aws') ||
      q.includes('azure') ||
      q.includes('gcp') ||
      q.includes('serverless') ||
      q.includes('k8s') ||
      q.includes('docker')
    ) {
      return {
        text: 'Our Cloud Architecture services feature:\n• High-availability cloud migrations (AWS / Azure / GCP)\n• Serverless & microservices infrastructure\n• CI/CD automated deployment pipelines\n• Zero-downtime reliability with 99.9% Uptime SLA.',
      };
    }
    if (
      q.includes('full stack') ||
      q.includes('web') ||
      q.includes('mobile') ||
      q.includes('app') ||
      q.includes('react') ||
      q.includes('node') ||
      q.includes('python')
    ) {
      return {
        text: 'We build high-performance Full-Stack Web & Mobile ecosystems using React, Next.js, Node.js, Python, and React Native with microservices architecture and bank-grade security.',
      };
    }
    if (
      q.includes('cyber') ||
      q.includes('security') ||
      q.includes('audit') ||
      q.includes('encrypt') ||
      q.includes('zero trust')
    ) {
      return {
        text: 'Porulon Cybersecurity provides:\n• Bank-grade end-to-end data encryption\n• Zero-Trust security protocols\n• SOC 2 / ISO standard compliance audits\n• Automated threat monitoring & vulnerability patching.',
      };
    }
    if (q.includes('iot') || q.includes('sensor') || q.includes('hardware') || q.includes('edge')) {
      return {
        text: 'Our IoT Division connects physical hardware with digital intelligence using smart sensor networks, real-time edge processing, and hardware-software integration.',
      };
    }
    if (
      q.includes('academy') ||
      q.includes('train') ||
      q.includes('course') ||
      q.includes('student') ||
      q.includes('learn') ||
      q.includes('upskill') ||
      q.includes('intern') ||
      q.includes('certif')
    ) {
      return {
        text: '🎓 Porulon Academy Technical Training:\n• Industry-aligned courses in Full-Stack, AI/ML, Cloud DevOps, & Data Science\n• Hands-on project mentorship with senior architects\n• Corporate team upskilling & student certifications\n• Career placement assistance for top performers.',
      };
    }
    if (
      q.includes('price') ||
      q.includes('cost') ||
      q.includes('quote') ||
      q.includes('estimate') ||
      q.includes('budget') ||
      q.includes('pricing') ||
      q.includes('rate')
    ) {
      return {
        text: '💼 Project quotes are customized based on scope & architecture. We offer flexible engagement models with dedicated senior architects. Email info@porulontech.com or call Sales at +91 97918 82387 for a free consultation!',
      };
    }
    if (
      q.includes('location') ||
      q.includes('where') ||
      q.includes('address') ||
      q.includes('coimbatore') ||
      q.includes('india') ||
      q.includes('office')
    ) {
      return {
        text: '📍 Headquarters:\nPorulon Technologies Pvt. Ltd.\nCoimbatore, Tamil Nadu, India.\n\nWe collaborate with enterprise partners globally across India, US, Europe, and Asia.',
      };
    }
    if (
      q.includes('contact') ||
      q.includes('phone') ||
      q.includes('email') ||
      q.includes('call') ||
      q.includes('sales') ||
      q.includes('hr') ||
      q.includes('reach')
    ) {
      return {
        text: '📞 Contact Porulon Team:\n• Sales: +91 97918 82387\n• HR: +91 99005 59922\n• New Projects: +91 97900 05442\n• Email: info@porulontech.com\n• WhatsApp: Click WhatsApp option in the menu!',
      };
    }
    if (
      q.includes('job') ||
      q.includes('career') ||
      q.includes('hiring') ||
      q.includes('vacancy') ||
      q.includes('apply')
    ) {
      return {
        text: '🚀 We are hiring senior engineers, AI developers, and cloud architects! Send your resume to hr@porulontech.com or call HR at +91 99005 59922.',
      };
    }

    // GENERAL FALLBACK RESPONSE
    return {
      text: `Thank you for your question! As Porulon's AI assistant, I can answer general knowledge queries as well as details about Porulon Technologies.\n\nFor custom technical inquiries or project quotes, you can connect directly with our engineering team at info@porulontech.com or +91 97918 82387.`,
    };
  };

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
      const responseObj = getPorulonSmartAIResponse(query);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: responseObj.text,
          showContactCard: responseObj.showContactCard || false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 750);
  };

  return (
    <div
      ref={containerRef}
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="fixed bottom-6 right-6 z-50 font-sans"
    >
      {/* AI Assistant Chat Drawer Modal - Compact Neat Modern Design */}
      {isChatOpen && (
        <div className="mb-4 w-[310px] sm:w-[340px] h-[420px] sm:h-[440px] rounded-2xl glass-card bg-white/95 dark:bg-[#0c0a1a]/95 border border-slate-200 dark:border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl flex flex-col overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
                  <FaRobot className="text-base" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-purple-900 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs sm:text-sm font-semibold tracking-tight text-white leading-tight">
                  Porulon AI Assistant
                </h4>
                <span className="text-[10.5px] text-purple-200 font-light tracking-wide inline-flex items-center gap-1 mt-0.5">
                  <HiSparkles className="text-amber-300 text-xs" /> Online • AI Powered
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              title="Close chat"
              className="w-8 h-8 rounded-full flex items-center justify-center text-purple-200 hover:text-white hover:bg-white/15 transition-colors cursor-pointer shrink-0"
            >
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-[#070512]/60 no-scrollbar">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-xs shadow-md font-normal'
                      : 'bg-white dark:bg-[#14102b] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-purple-500/20 rounded-bl-xs shadow-sm font-normal whitespace-pre-line'
                  }`}
                >
                  {m.text}

                  {/* Deep Technical Inquiry Interactive Contact Card */}
                  {m.showContactCard && (
                    <div className="mt-3 pt-2.5 border-t border-purple-500/20 space-y-1.5">
                      <p className="text-[10.5px] font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-wider">
                        Connect with Senior Architects:
                      </p>
                      <div className="flex flex-col gap-1.5 pt-1">
                        <a
                          href="tel:+919791882387"
                          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-sm"
                        >
                          <FaPhoneAlt className="text-xs" /> Call Sales (+91 97918 82387)
                        </a>
                        <a
                          href="mailto:info@porulontech.com"
                          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-purple-950/60 hover:bg-purple-200 dark:hover:bg-purple-900/60 text-slate-800 dark:text-purple-200 transition-colors border border-purple-300 dark:border-purple-700/50"
                        >
                          <IoMail className="text-xs" /> Email info@porulontech.com
                        </a>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
                        >
                          <FaWhatsapp className="text-sm" /> Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  )}
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

          {/* Quick Prompts Bar */}
          <div className="p-2.5 bg-white dark:bg-[#0c0a1a] border-t border-slate-200/60 dark:border-purple-500/20 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-[10.5px] font-light text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800/60 rounded-full px-2.5 py-1 whitespace-nowrap transition-colors shrink-0 cursor-pointer active:scale-95"
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
              className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer active:scale-95"
            >
              <IoSend className="text-sm" />
            </button>
          </form>
        </div>
      )}

      {/* Expanded Options Menu (AI Chat, WhatsApp & X) */}
      {isExpanded && !isChatOpen && (
        <div className="mb-3.5 space-y-2.5 animate-fade-up">
          {/* Option 1: AI Chat */}
          <button
            onClick={() => {
              setIsExpanded(false);
              setIsChatOpen(true);
            }}
            className="w-56 glass-card bg-white/95 dark:bg-[#0e0c1f]/95 hover:bg-purple-50 dark:hover:bg-purple-950/60 border border-slate-200/80 dark:border-purple-500/30 p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-3 transition-all duration-300 hover:scale-[1.03] group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
              <FaRobot className="text-lg" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                AI Chat
              </h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light tracking-tight">
                Instant smart answers 24/7
              </p>
            </div>
          </button>

          {/* Option 2: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsExpanded(false)}
            className="w-56 glass-card bg-white/95 dark:bg-[#0e0c1f]/95 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-emerald-500/30 p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-3 transition-all duration-300 hover:scale-[1.03] group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
              <FaWhatsapp className="text-xl" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#25D366] transition-colors">
                WhatsApp
              </h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light tracking-tight">
                Chat with Sales & Support
              </p>
            </div>
          </a>

          {/* Option 3: X (Twitter) */}
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsExpanded(false)}
            className="w-56 glass-card bg-white/95 dark:bg-[#0e0c1f]/95 hover:bg-slate-100 dark:hover:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/50 p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-3 transition-all duration-300 hover:scale-[1.03] group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0 border border-white/20">
              <FaXTwitter className="text-lg" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-purple-400 transition-colors">
                X (Twitter)
              </h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light tracking-tight">
                Follow Porulon Community
              </p>
            </div>
          </a>
        </div>
      )}

      {/* Main Single Circular FAB Trigger Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle AI Assistant Options"
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(109,40,217,0.55)] hover:shadow-[0_12px_40px_rgba(109,40,217,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ml-auto"
        >
          <div className={`relative flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
            {isExpanded ? (
              <IoClose className="text-2xl" />
            ) : (
              <>
                <FaRobot className="text-2xl" />
                <HiSparkles className="absolute -top-1 -right-1.5 text-xs text-amber-300 animate-pulse" />
              </>
            )}
          </div>
          <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping pointer-events-none -z-10" />
        </button>
      )}
    </div>
  );
}
