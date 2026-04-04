import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

import { TestimonialsSection } from './components/TestimonialsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { QuoteCalculatorSection } from './components/QuoteCalculatorSection';
import { MaterialGuideSection } from './components/MaterialGuideSection';
import { 
  Printer, 
  Flag, 
  Image as ImageIcon, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  Award,
  Zap,
  Tag,
  Users,
  Contact,
  Layout,
  FileText,
  Monitor,
  CreditCard,
  IdCard,
  Shirt,
  Sun,
  Moon,
  Tent,
  Layers,
  Coffee,
  HelpCircle,
  Calculator,
  MessageCircle,
  MessageSquare,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Info,
  Send,
  Bot,
  Trash2,
  Mic,
  MicOff,
  ArrowLeft,
  Upload,
  Square,
  Play,
  Pause,
  Loader2,
  Share2
} from 'lucide-react';

const WHATSAPP_NUMBER = "917481068602"; // User's WhatsApp number
const WHATSAPP_MESSAGE = encodeURIComponent("Hi, I'm interested in your printing services.");

const ChatBot = ({ isOpen, onClose, isStandalone = false }: { isOpen: boolean, onClose: () => void, isStandalone?: boolean }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>(() => {
    try {
      const saved = localStorage.getItem('uttam_chat_lang');
      return (saved === 'en' || saved === 'hi') ? saved : 'en';
    } catch (e) {
      return 'en';
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('uttam_chat_darkmode');
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>(() => {
    try {
      const saved = localStorage.getItem('uttam_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore error
    }
    
    return [
      { 
        role: 'bot', 
        text: language === 'hi' 
          ? "नमस्ते! मैं उत्तम फ्लेक्स प्रिंटिंग का AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?" 
          : "Namaste! I'm Uttam's AI Assistant. How can I help you with your printing needs today?" 
      }
    ];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'hi' ? "आपका ब्राउज़र बोलने की सुविधा का समर्थन नहीं करता है।" : "Your browser does not support voice input.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        if (!recognitionRef.current) {
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

          recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
          };

          recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
              alert(language === 'hi' ? "कृपया माइक्रोफ़ोन की अनुमति दें।" : "Please allow microphone access.");
            }
          };

          recognitionRef.current.onend = () => {
            setIsListening(false);
          };
        }
        
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        setIsListening(false);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('uttam_chat_history', JSON.stringify(messages));
    localStorage.setItem('uttam_chat_lang', language);
    localStorage.setItem('uttam_chat_darkmode', String(darkMode));
    
    return () => {};
  }, [messages, language, darkMode]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {};
  }, []);

  const clearChat = () => {
    const initialMessage = [
      { 
        role: 'bot', 
        text: language === 'hi' 
          ? "नमस्ते! मैं उत्तम फ्लेक्स प्रिंटिंग का AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?" 
          : "Namaste! I'm Uttam's AI Assistant. How can I help you with your printing needs today?" 
      }
    ] as { role: 'user' | 'bot', text: string }[];
    setMessages(initialMessage);
    localStorage.removeItem('uttam_chat_history');
    setShowClearConfirm(false);
  };

  const chatRef = useRef<any>(null);

  useEffect(() => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing");
      return;
    }
    const ai = new GoogleGenAI({ apiKey });
    chatRef.current = ai.chats.create({
      model: "gemini-3.1-pro-preview",
      config: {
        systemInstruction: `You are the AI Assistant for 'Uttam Flex Printing', located in Jehanabad, Bihar. 
        Your goal is to help customers with their printing queries.
        
        LANGUAGE: 
        - Current Language: ${language === 'hi' ? 'Hindi' : 'English'}.
        - You MUST respond ONLY in ${language === 'hi' ? 'Hindi' : 'English'}.
        
        CRITICAL: BE EXTREMELY FAST AND CONCISE. Answer in a snap. Use short sentences.
        
        MEMORY & CONTEXT:
        - You MUST recall and refer to previous parts of the current conversation to provide relevant responses.
        - If a user asks a follow-up question, use the previous context to answer accurately.
        
        BUSINESS INFO:
        - Name: Uttam Flex Printing
        - Proprietor: Mr. Ravi Kumar
        - Tagline: Your Solutions, Your Moto.
        - Location: Jehanabad, Bihar
        - Phone: +91 7481068602
        
        AVAILABLE SERVICES:
        ${JSON.stringify(services.map(s => ({ title: s.title, description: s.description })))}
        
        MATERIAL GUIDE:
        ${JSON.stringify([
          { name: "Flex", description: "Durable for outdoor banners, cost-effective." },
          { name: "Vinyl", description: "Waterproof, high-quality finish, great for stickers." },
          { name: "Sunboard", description: "Rigid, ideal for indoor displays and signs." },
        ])}
        
        INSTRUCTIONS:
        - Use the AVAILABLE SERVICES and MATERIAL GUIDE to answer customer questions accurately.
        - If a user asks about a service or material not listed, politely inform them that you can help with other printing needs and ask for more details.
        - If asked about pricing or specific turnaround times, provide general information based on the business context and suggest contacting the proprietor for specific quotes.
        - Flex Printing: ₹12 per sq. ft.
        - Vinyl Printing: ₹25 per sq. ft.
        - Glow Sign Boards: ₹150 per sq. ft.
        - Banners & Posters: ₹15 per sq. ft.
        - Visiting Cards, ID Cards, T-shirt Printing, Standees, Mugs, etc.
        
        TURNAROUND TIMES:
        - Standard Flex Printing: 2-4 hours (for simple designs)
        - Vinyl Printing & Glow Sign Boards: 12-24 hours
        - Complex/Bulk Projects: 48-72 hours
        - Visiting Cards, ID Cards, T-shirts: 24 hours
        
        GUIDELINES:
        - Be professional, friendly, and extremely concise.
        - Answer in English or Hindi as per user preference.
        - If the user is asking about printing services, prices, or orders, encourage them to visit the shop or contact via WhatsApp. If the user is asking general knowledge questions, do not push for orders.
        - MAGIC DESIGN STORY: If the user asks for a "Magic Design Story", you MUST generate a creative design concept for their banner AND a short, culturally relevant story or blessing that can be printed as a QR code on the banner.`,
      },
    });
  }, [language]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const stream = await chatRef.current.sendMessageStream({ message: userMessage });
      stopRef.current = false;

      let botResponse = "";
      setMessages(prev => [...prev, { role: 'bot', text: "" }]);
      
      for await (const chunk of stream) {
        if (stopRef.current) {
          setIsStopping(false);
          break;
        }
        const text = chunk.text;
        if (text) {
          botResponse += text;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = botResponse;
            return newMessages;
          });
        }
      }

      // Auto-play speech if enabled
      // Audio removed
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
      setIsStopping(false);
    }
  };

  const handleStop = () => {
    stopRef.current = true;
    setIsStopping(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={isStandalone ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
          animate={isStandalone ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={isStandalone ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
          className={isStandalone 
            ? `w-full h-[100dvh] ${darkMode ? 'bg-slate-900' : 'bg-white'} flex flex-col` 
            : `fixed bottom-28 right-8 z-[100] w-80 md:w-96 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} rounded-3xl shadow-2xl border overflow-hidden flex flex-col h-[500px]`
          }
        >
          {/* Header */}
          <div className={`${darkMode ? 'bg-zinc-800' : 'bg-zinc-900'} p-4 text-white flex justify-between items-center shrink-0`}>
            <div className="flex items-center gap-3">
              {isStandalone && (
                <button 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all flex items-center gap-2 border border-white/10"
                  title="Back to Home"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">Back</span>
                </button>
              )}
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm">Uttam AI Assistant</div>
                <div className="text-[10px] opacity-80 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!isStandalone && (
                <Link 
                  to="/chat" 
                  title="Open in Full Screen"
                  className={`p-2 rounded-full transition-colors ${darkMode ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`}
                >
                  <Maximize2 className="w-4 h-4" />
                </Link>
              )}

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all ${darkMode ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowClearConfirm(!showClearConfirm)} 
                  title="Clear Chat History"
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium ${showClearConfirm ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-white/90 hover:text-white'}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{showClearConfirm ? 'Confirm?' : 'Clear'}</span>
                  {showClearConfirm && <span className="sm:hidden">?</span>}
                </button>
                
                {showClearConfirm && (
                  <div className="absolute top-full right-0 mt-2 z-[110] bg-white rounded-xl shadow-xl border border-slate-200 p-2 flex flex-col gap-1 min-w-[120px]">
                    <button 
                      onClick={clearChat}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Yes, Clear All
                    </button>
                    <button 
                      onClick={() => setShowClearConfirm(false)}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={onClose} 
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-xl transition-all flex items-center gap-2 border border-red-400 shadow-lg shadow-red-900/20"
                title="Close Chat"
              >
                <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 relative overflow-hidden bg-slate-50">
            <div 
              ref={scrollContainerRef}
              className="w-full h-full overflow-y-auto p-4 space-y-4"
            >
              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm relative group transition-all duration-300 ${
                    m.role === 'user' 
                      ? 'bg-zinc-900 text-white rounded-tr-none' 
                      : `${darkMode ? 'bg-zinc-700 text-zinc-100' : 'bg-white text-zinc-900'} shadow-sm border rounded-tl-none ${darkMode ? 'border-zinc-600' : 'border-zinc-100'}`
                  }`}>
                    {m.text}
                    
                    {m.role === 'bot' && m.text && (
                      <div className="absolute -right-10 top-0 p-2" />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-900 p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">AI is typing...</span>
                    </div>
                    <button 
                      onClick={handleStop}
                      disabled={isStopping}
                      className="p-1 px-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all flex items-center gap-1.5 border border-slate-200"
                      title="Stop AI Response"
                    >
                      <Square className="w-2.5 h-2.5 fill-current" />
                      <span className="text-[9px] font-bold uppercase tracking-tight">Stop</span>
                    </button>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { en: "Flex Printing Price?", hi: "फ्लेक्स प्रिंटिंग का रेट?" },
                  { en: "Turnaround time?", hi: "कितना समय लगेगा?" },
                  { en: "Contact info", hi: "संपर्क जानकारी" }
                ].map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const text = language === 'hi' ? faq.hi : faq.en;
                      setInput(text);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      darkMode 
                        ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {language === 'hi' ? faq.hi : faq.en}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={handleSend} className="flex gap-2 items-center">
              <div className={`flex rounded-xl p-1 border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-200'} shrink-0`}>
                <button 
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${language === 'en' ? (darkMode ? 'bg-slate-600 text-white' : 'bg-white text-indigo-600 shadow-sm') : (darkMode ? 'text-slate-400' : 'text-slate-500 hover:text-slate-700')}`}
                >
                  EN
                </button>
                <button 
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${language === 'hi' ? (darkMode ? 'bg-slate-600 text-white' : 'bg-white text-indigo-600 shadow-sm') : (darkMode ? 'text-slate-400' : 'text-slate-500 hover:text-slate-700')}`}
                >
                  हिं
                </button>
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      handleSend(e as any);
                    }
                  }}
                  aria-label={language === 'hi' ? "चैट इनपुट" : "Chat input"}
                  placeholder={language === 'hi' ? "मुझसे कुछ भी पूछें..." : "Ask me anything..."}
                  className={`w-full px-4 py-2 pr-10 rounded-xl border-none focus:ring-2 focus:ring-indigo-600 outline-none text-sm ${darkMode ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-slate-100 text-slate-800 placeholder-slate-500'}`}
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  aria-label={language === 'hi' ? "बोलकर पूछें" : "Voice Input"}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : (darkMode ? 'text-slate-400 hover:text-indigo-400 hover:bg-slate-600' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-200')
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FloatingHelpButton = ({ onOpenChat }: { onOpenChat: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 w-72 mb-2"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              How can we help?
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  onOpenChat();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Chat with AI</div>
                  <div className="text-xs text-slate-500">Instant answers</div>
                </div>
              </button>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">WhatsApp Chat</div>
                  <div className="text-xs text-slate-500">Human support</div>
                </div>
              </a>
              <a 
                href="tel:+917481068602"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Call Support</div>
                  <div className="text-xs text-slate-500">9 AM - 8 PM</div>
                </div>
              </a>
              <Link 
                to="/#faq"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">FAQs</div>
                  <div className="text-xs text-slate-500">Common questions</div>
                </div>
              </Link>
              
              <button 
                onClick={() => {
                  const shareData = {
                    title: 'Uttam Flex Printing',
                    text: 'Check out Uttam Flex Printing for all your printing needs!',
                    url: window.location.href,
                  };
                  if (navigator.share) {
                    navigator.share(shareData).catch(console.error);
                  } else {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                      alert('Link copied to clipboard!');
                    }).catch(() => {
                      alert('Share not supported and copy failed.');
                    });
                  }
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Share Website</div>
                  <div className="text-xs text-slate-500">Spread the word</div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-3">
        {isOpen && (
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl"
          >
            Close
          </motion.span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-indigo-600 text-white hover:scale-110'
          }`}
        >
          {isOpen ? <X className="w-8 h-8" /> : <HelpCircle className="w-8 h-8" />}
        </button>
      </div>
    </div>
  );
};

const PriceCalculator = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [service, setService] = useState('flex');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(5);
  
  const prices: Record<string, number> = {
    flex: 12, // per sq ft
    vinyl: 25,
    glow: 150,
    banner: 15
  };

  const total = width * height * (prices[service] || 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-indigo-600" />
                  Price Estimator
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Select Service</label>
                  <select 
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="flex">Flex Printing (₹12/sqft)</option>
                    <option value="vinyl">Vinyl Printing (₹25/sqft)</option>
                    <option value="glow">Glow Sign Board (₹150/sqft)</option>
                    <option value="banner">Banner/Poster (₹15/sqft)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Width (ft)</label>
                    <input 
                      type="number" 
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Height (ft)</label>
                    <input 
                      type="number" 
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <div className="text-indigo-600 text-sm font-bold uppercase tracking-wider mb-1">Estimated Total</div>
                  <div className="text-4xl font-black text-slate-900">₹{total.toLocaleString()}</div>
                  <p className="text-slate-500 text-xs mt-2">* This is an estimate. Final price may vary based on design and material quality.</p>
                </div>

                <button 
                  onClick={() => {
                    onClose();
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I got an estimate of ₹${total} for a ${width}x${height} ${service} print. I'd like to proceed.`, '_blank');
                  }}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                  Order Now via WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does it take to print a flex banner?",
      answer: "Typically, a standard flex banner can be printed and ready for pickup within 2-4 hours. Larger projects or those requiring custom design work may take 24-48 hours."
    },
    {
      question: "Do you provide installation services?",
      answer: "Yes, we have a professional team for billboard and signage installation across Jehanabad and nearby areas. Installation charges depend on the size and height of the site."
    },
    {
      question: "Can I provide my own design?",
      answer: "Absolutely! You can bring your designs in high-resolution PDF, CDR, or AI formats. We also offer professional design services if you only have an idea."
    },
    {
      question: "What is the life of outdoor flex prints?",
      answer: "Premium quality flex prints are weather-resistant and typically last 1-3 years outdoors, depending on sun exposure and wind conditions."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">Everything you need to know about our services and process.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-lg">{faq.question}</span>
                {activeIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Logo = ({ scrolled = false, light = false }: { scrolled?: boolean; light?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div className="absolute w-4 h-4 bg-cyan-400 rounded-full -translate-x-1 -translate-y-1 opacity-90 mix-blend-multiply" />
      <div className="absolute w-4 h-4 bg-[#c2185b] rounded-full translate-x-1 -translate-y-1 opacity-90 mix-blend-multiply" />
      <div className="absolute w-4 h-4 bg-yellow-400 rounded-full -translate-x-1 translate-y-1 opacity-90 mix-blend-multiply" />
      <div className="absolute w-4 h-4 bg-slate-900 rounded-full translate-x-1 translate-y-1 opacity-90 mix-blend-multiply" />
    </div>
    <div className="flex flex-col leading-none">
      <div className="flex items-center gap-1 mb-0.5">
        <Zap className={`w-2 h-2 ${scrolled ? 'text-indigo-600' : 'text-indigo-400'}`} />
        <span className={`text-[7px] font-black uppercase tracking-tighter ${scrolled ? 'text-indigo-600' : 'text-indigo-400'}`}>
          Premium Printing
        </span>
      </div>
      <span className={`text-2xl font-black tracking-tighter ${(scrolled || !light) ? 'text-slate-900' : 'text-white'}`}>
        UTTAM
      </span>
      <span className="text-[#c2185b] text-[10px] font-bold tracking-[0.2em] uppercase">
        FLEX PRINTING
      </span>
      <span className={`text-[8px] italic font-medium mt-0.5 ${(scrolled || !light) ? 'text-slate-500' : 'text-white/60'}`}>
        Your Solutions, Your Moto.
      </span>
    </div>
  </div>
);

const services = [
  {
    slug: "flex-printing",
    title: "Flex Printing",
    description: "High-quality large format flex printing for billboards and shop fronts.",
    longDescription: "Flex Printing service offers durable and vibrant solutions for all your large-scale advertising needs. We use high-grade PVC flex material that is weather-resistant and perfect for outdoor use. Whether it's for shop banners, event backdrops, or massive billboards, the state-of-the-art printing technology ensures crisp images and true-to-life colors that grab attention from a distance.",
    icon: <Printer className="w-6 h-6" />,
    image: "https://picsum.photos/seed/flex-printing-banner/800/600",
    category: "Large Format",
    popularity: 10
  },
  {
    slug: "vinyl-printing",
    title: "Vinyl Printing",
    description: "Premium vinyl printing for windows, walls, and vehicle branding.",
    longDescription: "Vinyl printing is the perfect choice for high-resolution graphics and long-lasting applications. We offer various types of vinyl, including glossy, matte, and transparent options. Vinyl is ideal for wall decals, window displays, and vehicle wraps. With precision cutting and high-quality adhesive, vinyl prints are easy to apply and resistant to fading, ensuring your brand looks professional for years.",
    icon: <ImageIcon className="w-6 h-6" />,
    image: "https://picsum.photos/seed/vinyl-printing-stickers/800/600",
    category: "Large Format",
    popularity: 8
  },
  {
    slug: "visiting-cards",
    title: "Visiting Cards",
    description: "Professional business cards with premium finishes and textures.",
    longDescription: "Make a lasting first impression with premium business card printing. We offer a wide range of paper stocks, from standard cardstock to luxury textured papers. Choose from various finishes like matte lamination, spot UV, or gold foiling to add that extra touch of sophistication. The design team can help you create a card that perfectly represents your professional identity.",
    icon: <Contact className="w-6 h-6" />,
    image: "https://picsum.photos/seed/visiting-cards-design/800/600",
    category: "Business Essentials",
    popularity: 9
  },
  {
    slug: "banners-posters",
    title: "Banners & Posters",
    description: "Eye-catching large scale banners and posters for all your events.",
    longDescription: "From small indoor posters to massive outdoor banners, we provide high-impact visual solutions for any occasion. Posters are printed on high-quality photo paper with rich colors, while banners are made from reinforced vinyl with grommets for easy hanging. Perfect for sales promotions, movie releases, or educational displays, the prints are designed to stand out.",
    icon: <Flag className="w-6 h-6" />,
    image: "https://picsum.photos/seed/banners-posters-event/800/600",
    category: "Large Format",
    popularity: 7
  },
  {
    slug: "print-your-own-design",
    title: "Print Your Own Design",
    description: "High-quality printing for your provided designs.",
    longDescription: "Have a design ready? We offer professional printing services for your custom artwork, logos, or documents. Upload your file, and we'll ensure it's printed with precision, high-quality ink, and premium materials. Whether it's for personal projects, business needs, or creative endeavors, we handle your files with care to deliver stunning results.",
    icon: <Upload className="w-6 h-6" />,
    image: "https://picsum.photos/seed/custom-printing-design/800/600",
    category: "Business Essentials",
    popularity: 6
  },
  {
    slug: "standees",
    title: "Standees",
    description: "Portable and durable roll-up standees for exhibitions and shops.",
    longDescription: "Roll-up standees are the ultimate portable marketing tool. Lightweight and easy to set up, they come with a durable aluminum base and a high-quality printed graphic. Ideal for trade shows, retail stores, and corporate events, standees provide a professional backdrop that can be transported and reused multiple times.",
    icon: <Monitor className="w-6 h-6" />,
    image: "https://picsum.photos/seed/roll-up-standee/800/600",
    category: "Large Format",
    popularity: 5
  },
  {
    slug: "invitation-cards",
    title: "Invitation Cards",
    description: "Custom designed cards for weddings, parties, and corporate events.",
    longDescription: "Celebrate your special moments with beautifully crafted invitation cards. We specialize in custom designs for weddings, birthdays, and corporate galas. The printing process includes high-quality cardstock and specialized techniques like embossing and laser cutting. Let us help you set the tone for your event with an invitation that your guests will cherish.",
    icon: <CreditCard className="w-6 h-6" />,
    image: "https://picsum.photos/seed/invitation-cards-wedding/800/600",
    category: "Promotional Materials",
    popularity: 8
  },
  {
    slug: "id-cards",
    title: "ID Cards",
    description: "High-quality PVC ID cards for schools, colleges, and corporate offices.",
    longDescription: "We provide secure and professional PVC ID card printing for organizations of all sizes. Our cards are durable, tamper-resistant, and can include features like barcodes, QR codes, and magnetic strips. We also offer a variety of accessories like lanyards and card holders to complete your identification system.",
    icon: <IdCard className="w-6 h-6" />,
    image: "https://picsum.photos/seed/pvc-id-cards/800/600",
    category: "Business Essentials",
    popularity: 7
  },
  {
    slug: "tshirt-printing",
    title: "T-shirt Printing",
    description: "Customized T-shirt printing for events, teams, and branding.",
    longDescription: "Get your brand noticed with our custom T-shirt printing services. We use various methods like screen printing, heat transfer, and sublimation to ensure high-quality, long-lasting prints on a variety of fabrics. Whether it's for promotional giveaways, sports teams, or corporate uniforms, we deliver comfortable and stylish apparel.",
    icon: <Shirt className="w-6 h-6" />,
    image: "https://picsum.photos/seed/custom-tshirt-printing/800/600",
    category: "Promotional Materials",
    popularity: 9
  },
  {
    slug: "glow-sign-boards",
    title: "Glow Sign Boards",
    description: "Backlit glow sign boards for high visibility during day and night.",
    longDescription: "Illuminate your brand with our premium glow sign boards. These backlit displays are designed for maximum visibility, making your business stand out even in the dark. We use high-quality LED lighting and durable translucent materials to create signs that are energy-efficient and long-lasting.",
    icon: <Sun className="w-6 h-6" />,
    image: "https://picsum.photos/seed/glow-sign-board/800/600",
    category: "Large Format"
  },
  {
    slug: "canopy",
    title: "Canopy",
    description: "Branded promotional canopies for outdoor marketing and events.",
    longDescription: "Promotional canopies are perfect for outdoor activations and events. They provide shade and protection while serving as a massive branding surface. Easy to assemble and dismantle, canopies are made from high-quality, water-resistant fabric and a sturdy frame, ensuring your brand remains visible in any weather.",
    icon: <Tent className="w-6 h-6" />,
    image: "https://picsum.photos/seed/promotional-canopy/800/600",
    category: "Large Format"
  },
  {
    slug: "sunboard-printing",
    title: "Sunboard Printing",
    description: "Direct printing on durable sunboards for indoor and outdoor displays.",
    longDescription: "Sunboard printing is a versatile solution for indoor signage and displays. We print directly onto high-density foam boards, resulting in a lightweight yet rigid product. Perfect for menu boards, directional signs, and exhibition panels, our sunboard prints are durable and offer a professional finish.",
    icon: <Layers className="w-6 h-6" />,
    image: "https://picsum.photos/seed/sunboard-printing-display/800/600",
    category: "Large Format"
  },
  {
    slug: "mug-printing",
    title: "Mug Printing",
    description: "Personalized ceramic mugs for gifts and corporate branding.",
    longDescription: "Custom mug printing is a popular choice for personalized gifts and corporate branding. Sublimation printing is used to ensure vibrant colors that are dishwasher and microwave safe. Choose from standard white mugs, magic mugs, or travel tumblers to showcase your brand or special message.",
    icon: <Coffee className="w-6 h-6" />,
    image: "https://picsum.photos/seed/custom-mug-printing/800/600",
    category: "Promotional Materials"
  }
];

const stats = [
  { label: "Years Experience", value: "15+", icon: <Award className="w-5 h-5" /> },
  { label: "Happy Clients", value: "5000+", icon: <Users className="w-5 h-5" /> },
  { label: "Projects Done", value: "12000+", icon: <CheckCircle2 className="w-5 h-5" /> },
];

const ServiceDetail = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const service = services.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
        <Link to="/" className="text-indigo-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation (Simplified for Detail Page) */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/">
              <Logo scrolled={true} />
            </Link>
            <Link to="/" className="text-sm font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-600 rounded-3xl -z-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6">
                {service.icon}
                {service.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{service.title}</h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {service.longDescription}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">High Quality</h4>
                  <p className="text-sm text-slate-600">Premium materials and state-of-the-art machinery.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">Fast Delivery</h4>
                  <p className="text-sm text-slate-600">Quick turnaround times for all your projects.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/#contact"
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all text-center"
                >
                  Get a Quote
                </Link>
                <Link 
                  to="/"
                  className="bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all text-center"
                >
                  View All Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer (Simplified) */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Logo light={true} />
          <p className="mt-6 text-slate-400 text-sm">© 2026 Uttam Flex Printing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const ProjectGalleryModal = ({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Image Display */}
            <div className="flex-1 bg-slate-100 relative group overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  src={project.gallery[activeImage]}
                  alt={`${project.title} - Image ${activeImage + 1}`}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
                  }}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all backdrop-blur-md pointer-events-auto"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
                  }}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all backdrop-blur-md pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Sidebar / Thumbnails */}
            <div className="w-full md:w-80 p-8 flex flex-col bg-white overflow-y-auto">
              <div className="mb-8">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{project.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Project Gallery</div>
                <div className="grid grid-cols-3 gap-3">
                  {project.gallery.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === idx ? "border-indigo-600 scale-95 shadow-inner" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <Link
                  to={`/services/${project.serviceSlug}`}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-center hover:bg-indigo-700 transition-all block"
                >
                  Service Details
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ChatPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100dvh] bg-white overflow-hidden">
      <ChatBot isOpen={true} onClose={() => navigate(-1)} isStandalone={true} />
    </div>
  );
};

const translations = {
  en: {
    home: "Home",
    services: "Services",
    aiAssistant: "AI Assistant",
    about: "About",
    contact: "Contact",
    getQuote: "Get a Quote",
    heroTitle: "Bringing Your Vision to Large Format Life.",
    heroSubtitle: "Uttam Flex Printing delivers high-quality, durable, and vibrant printing solutions for all your business needs. From massive billboards to intricate vinyl decals.",
    whatsappUs: "WhatsApp Us",
    chatWithAI: "Chat with AI",
    aiFullScreen: "AI Full Screen",
    priceEstimator: "Price Estimator",
    coreServices: "Core Services",
    servicesSubtitle: "We offer a wide range of printing services tailored to meet your specific requirements, ensuring the highest quality output every time.",
    fastTurnaround: "Fast Turnaround",
    fastTurnaroundDesc: "We understand deadlines. The efficient workflow ensures your projects are delivered on time, every time.",
    premiumQuality: "Premium Quality",
    premiumQualityDesc: "Using state-of-the-art machinery and high-grade materials, we guarantee vibrant and long-lasting prints.",
    expertSupport: "Expert Support",
    expertSupportDesc: "The team of design and printing experts is always ready to help you choose the best options for your needs.",
    featuredProjects: "Featured Projects",
    featuredProjectsSubtitle: "Take a look at some of our recent work. We take pride in delivering excellence across every project we handle.",
    viewAllServices: "View All Services",
    quickView: "Quick View",
    serviceDetails: "Service Details",
    aiPoweredSupport: "AI Powered Support",
    chatWithOurAIAssistant: "Chat with our AI Assistant",
    aiAssistantDesc: "Get instant answers to your questions about pricing, services, and turnaround times. The AI assistant is available 24/7 to help you with your printing needs.",
    startChattingNow: "Start Chatting Now",
    fullScreenMode: "Full Screen Mode",
    expertPrintingSolutions: "Expert Printing Solutions Since 2010",
    aboutDesc1: "Uttam Flex Printing has been a leader in the printing industry in Jehanabad for over 15 years. We specialize in large format printing, promotional materials, and business essentials. The mission is to provide high-quality, durable, and vibrant printing solutions that help your business stand out.",
    aboutDesc2: "We use state-of-the-art machinery and premium materials to ensure every project meets the highest standards. Whether you need a massive billboard or a set of professional visiting cards, we've got you covered.",
    proprietor: "Proprietor",
    letsStartYourProject: "Let's Start Your Project",
    contactDesc: "Have a question or ready to get started? Reach out to us today and our team will get back to you within 24 hours.",
    location: "Location",
    callUs: "Call Us",
    emailUs: "Email Us",
    fullName: "Full Name",
    emailAddress: "Email Address",
    serviceNeeded: "Service Needed",
    message: "Message",
    sendMessage: "Send Message",
    chatOnWhatsApp: "Chat on WhatsApp",
    footerDesc: "Your trusted partner for high-quality large format printing solutions. Quality you can see, service you can trust.",
    quickLinks: "Quick Links",
    workingHours: "Working Hours",
    monSat: "Mon - Sat",
    sunday: "Sunday",
  },
  hi: {
    home: "होम",
    services: "सेवाएं",
    aiAssistant: "AI सहायक",
    about: "हमारे बारे में",
    contact: "संपर्क",
    getQuote: "कोटेशन प्राप्त करें",
    heroTitle: "आपकी दृष्टि को बड़े प्रारूप में जीवन दें।",
    heroSubtitle: "उत्तम फ्लेक्स प्रिंटिंग आपकी सभी व्यावसायिक आवश्यकताओं के लिए उच्च गुणवत्ता, टिकाऊ और जीवंत प्रिंटिंग समाधान प्रदान करती है। बड़े बिलबोर्ड से लेकर जटिल विनाइल डिकल्स तक।",
    whatsappUs: "व्हाट्सएप करें",
    chatWithAI: "AI से चैट करें",
    aiFullScreen: "AI फुल स्क्रीन",
    priceEstimator: "मूल्य अनुमानक",
    coreServices: "मुख्य सेवाएं",
    servicesSubtitle: "हम आपकी विशिष्ट आवश्यकताओं को पूरा करने के लिए प्रिंटिंग सेवाओं की एक विस्तृत श्रृंखला प्रदान करते हैं, जो हर बार उच्चतम गुणवत्ता सुनिश्चित करती है।",
    fastTurnaround: "तेज़ टर्नअराउंड",
    fastTurnaroundDesc: "हम समय सीमा को समझते हैं। कुशल कार्यप्रवाह यह सुनिश्चित करता है कि आपके प्रोजेक्ट समय पर वितरित किए जाएं।",
    premiumQuality: "प्रीमियम गुणवत्ता",
    premiumQualityDesc: "अत्याधुनिक मशीनरी और उच्च श्रेणी की सामग्री का उपयोग करके, हम जीवंत और लंबे समय तक चलने वाले प्रिंट की गारंटी देते हैं।",
    expertSupport: "विशेषज्ञ सहायता",
    expertSupportDesc: "डिजाइन और प्रिंटिंग विशेषज्ञों की टीम आपकी आवश्यकताओं के लिए सर्वोत्तम विकल्प चुनने में आपकी मदद करने के लिए हमेशा तैयार है।",
    featuredProjects: "विशेष प्रोजेक्ट्स",
    featuredProjectsSubtitle: "हमारे हाल के कुछ कार्यों पर एक नज़र डालें। हमें हर प्रोजेक्ट में उत्कृष्टता प्रदान करने पर गर्व है।",
    viewAllServices: "सभी सेवाएं देखें",
    quickView: "त्वरित दृश्य",
    serviceDetails: "सेवा विवरण",
    aiPoweredSupport: "AI संचालित सहायता",
    chatWithOurAIAssistant: "हमारे AI सहायक के साथ चैट करें",
    aiAssistantDesc: "मूल्य निर्धारण, सेवाओं और टर्नअराउंड समय के बारे में अपने सवालों के तुरंत जवाब पाएं। AI सहायक आपकी प्रिंटिंग आवश्यकताओं में मदद के लिए 24/7 उपलब्ध है।",
    startChattingNow: "अभी चैट शुरू करें",
    fullScreenMode: "फुल स्क्रीन मोड",
    expertPrintingSolutions: "2010 से विशेषज्ञ प्रिंटिंग समाधान",
    aboutDesc1: "उत्तम फ्लेक्स प्रिंटिंग 15 वर्षों से अधिक समय से जहानाबाद में प्रिंटिंग उद्योग में अग्रणी रही है। हम बड़े प्रारूप प्रिंटिंग, प्रचार सामग्री और व्यावसायिक आवश्यक वस्तुओं में विशेषज्ञ हैं। हमारा मिशन उच्च गुणवत्ता, टिकाऊ और जीवंत प्रिंटिंग समाधान प्रदान करना है जो आपके व्यवसाय को अलग दिखने में मदद करते हैं।",
    aboutDesc2: "हम यह सुनिश्चित करने के लिए अत्याधुनिक मशीनरी और प्रीमियम सामग्री का उपयोग करते हैं कि हर प्रोजेक्ट उच्चतम मानकों को पूरा करे। चाहे आपको एक विशाल बिलबोर्ड की आवश्यकता हो या पेशेवर विजिटिंग कार्ड के सेट की, हमने आपको कवर किया है।",
    proprietor: "प्रोपराइटर",
    letsStartYourProject: "अपना प्रोजेक्ट शुरू करें",
    contactDesc: "कोई सवाल है या शुरू करने के लिए तैयार हैं? आज ही हमसे संपर्क करें और हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।",
    location: "स्थान",
    callUs: "हमें कॉल करें",
    emailUs: "हमें ईमेल करें",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    serviceNeeded: "आवश्यक सेवा",
    message: "संदेश",
    sendMessage: "संदेश भेजें",
    chatOnWhatsApp: "व्हाट्सएप पर चैट करें",
    footerDesc: "उच्च गुणवत्ता वाले बड़े प्रारूप प्रिंटिंग समाधानों के लिए आपका विश्वसनीय भागीदार। गुणवत्ता जो आप देख सकते हैं, सेवा जिस पर आप भरोसा कर सकते हैं।",
    quickLinks: "त्वरित लिंक",
    workingHours: "काम के घंटे",
    monSat: "सोम - शनि",
    sunday: "रविवार",
  }
};

const Home = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const t = (key: keyof typeof translations.en) => translations[language][key] || key;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [activeProjectCategory, setActiveProjectCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const featuredProjects = [
    {
      title: "Grand Opening Billboard",
      description: "A massive 40x20ft high-resolution flex banner for a major retail launch in Jehanabad.",
      image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=800&h=600",
      gallery: [
        "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=600"
      ],
      serviceSlug: "flex-printing",
      category: "Large Format"
    },
    {
      title: "Corporate Identity Pack",
      description: "Premium visiting cards and ID cards for a local tech firm, featuring matte finish and spot UV.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800&h=600",
      gallery: [
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1586075010633-2442dc3d6334?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800&h=600"
      ],
      serviceSlug: "visiting-cards",
      category: "Business Essentials"
    },
    {
      title: "Event Signage Suite",
      description: "Complete set of roll-up banners, posters, and glow signs for a 3-day cultural festival.",
      image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800&h=600",
      gallery: [
        "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800&h=600"
      ],
      serviceSlug: "banners-posters",
      category: "Large Format"
    },
    {
      title: "Custom Team Apparel",
      description: "High-quality screen-printed T-shirts for a local sports club with vibrant, long-lasting colors.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800&h=600",
      gallery: [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800&h=600"
      ],
      serviceSlug: "tshirt-printing",
      category: "Promotional Materials"
    }
  ];

  const projectCategories = ["All", ...new Set(featuredProjects.map(p => p.category))];

  const filteredProjects = featuredProjects.filter(project => 
    activeProjectCategory === "All" || project.category === activeProjectCategory
  );

  const categories = ["All", ...new Set(services.map(s => s.category))];
  
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === "All" || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    } else {
      return (b.popularity || 0) - (a.popularity || 0);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
      
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;
      setShowScrollDown(scrollHeight - scrollTop - clientHeight > 300);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openQuoteModal = (serviceName = "") => {
    setSelectedService(serviceName);
    setIsQuoteModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Quote Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-zinc-100"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-zinc-950">Request a Quote</h3>
                  <button onClick={() => setIsQuoteModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-zinc-500" />
                  </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1">Full Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-950 transition-all" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1">Phone Number</label>
                    <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-950 transition-all" placeholder="Your Phone" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1">Service</label>
                    <select 
                      value={selectedService} 
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-950 transition-all bg-white"
                    >
                      <option value="">Select a Service</option>
                      {services.map(s => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1">Message</label>
                    <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-950 transition-all" placeholder="Project details..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-zinc-950 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all transform active:scale-[0.98]">
                    Submit Request
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PriceCalculator 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />

      <ChatBot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <ProjectGalleryModal 
        project={selectedProject}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Logo scrolled={scrolled} light={!scrolled} />
              <div className="flex items-center gap-2 bg-black/10 rounded-lg p-1">
                <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${language === 'en' ? 'bg-indigo-600 text-white' : scrolled ? 'text-slate-600' : 'text-white'}`}>EN</button>
                <button onClick={() => setLanguage('hi')} className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${language === 'hi' ? 'bg-indigo-600 text-white' : scrolled ? 'text-slate-600' : 'text-white'}`}>हिं</button>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['home', 'aiAssistant', 'about', 'contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${t(item as any).toLowerCase().replace(' ', '-')}`}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
                >
                  {t(item as any)}
                </a>
              ))}
              <div className="relative">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 flex items-center gap-1 ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
                >
                  {t('services' as any)}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                    {services.map((service) => (
                      <a 
                        key={service.title} 
                        href={`#services`}
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => openQuoteModal()}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                {t('getQuote')}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className={scrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={scrolled ? 'text-slate-900' : 'text-white'} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-zinc-50 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {['Home', 'Services', 'AI Assistant', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-2xl font-bold text-zinc-950 block py-4 border-b border-zinc-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => {
                  openQuoteModal();
                  setIsMenuOpen(false);
                }}
                className="bg-zinc-950 text-white w-full py-4 rounded-xl text-lg font-bold mt-6"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950 pt-24 pb-12 md:pt-0 md:pb-0"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
            src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                <Zap className="w-3 h-3" />
                Premium Printing
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
                <span className="text-cyan-400">C</span>
                <span className="text-[#c2185b]">M</span>
                <span className="text-yellow-400">Y</span>
                <span className="text-slate-900 bg-white px-0.5 rounded-sm">K</span>
                <span className="ml-1 opacity-60">Certified</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => openQuoteModal()}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group"
              >
                {t('getQuote')}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {t('whatsappUs')}
              </a>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-5 h-5" />
                {t('chatWithAI')}
              </button>
              <Link 
                to="/chat"
                className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Maximize2 className="w-5 h-5" />
                {t('aiFullScreen')}
              </Link>
              <button 
                onClick={() => setIsCalculatorOpen(true)}
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 border border-slate-200 shadow-sm"
              >
                <Calculator className="w-5 h-5 text-indigo-600" />
                {t('priceEstimator')}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 right-0 z-10 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">{t(stat.label.toLowerCase().replace(' ', '') as any)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-display font-bold text-slate-950 mb-6 tracking-tight">{t('coreServices')}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{t('servicesSubtitle')}</p>
            
            <div className="max-w-md mx-auto mt-12 mb-10 relative">
              <input 
                type="text" 
                placeholder="Search services by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all pl-12 bg-slate-50"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-2.5 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 text-sm font-bold text-slate-600"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="alphabetical">Sort Alphabetically</option>
              </select>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={service.title}
                  whileHover={{ y: -12, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer transition-all hover:shadow-2xl hover:border-indigo-100 hover:bg-gradient-to-b hover:from-white hover:to-indigo-50/30"
                >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold text-slate-950 mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link to={`/services/${service.slug}`} className="text-slate-950 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuoteModal(service.title);
                      }}
                      className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-md hover:shadow-indigo-500/20"
                    >
                      Request Custom Quote
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const relevantProject = featuredProjects.find(p => p.serviceSlug === service.slug);
                        if (relevantProject) {
                          setSelectedProject(relevantProject);
                          setIsGalleryOpen(true);
                        } else {
                          alert("No gallery available for this service.");
                        }
                      }}
                      className="w-full bg-slate-100 text-slate-900 py-3 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
            {filteredServices.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No services found</h3>
                <p className="text-slate-600">Try adjusting your search or category filter.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-6 text-indigo-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>


      {/* Why Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t('fastTurnaround')}</h3>
              <p className="text-slate-600">{t('fastTurnaroundDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t('premiumQuality')}</h3>
              <p className="text-slate-600">{t('premiumQualityDesc')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t('expertSupport')}</h3>
              <p className="text-slate-600">{t('expertSupportDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Custom Graphic Design Services</h2>
              <p className="text-lg text-slate-600 mb-8">
                Elevate your brand with professional graphic design. Our expert designers create visually stunning graphics that capture your brand's essence, ensuring your marketing materials stand out and leave a lasting impression. From logos and brochures to social media assets, we bring your vision to life.
              </p>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition-all"
              >
                Design Your Vision
              </button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Graphic Design" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('featuredProjects')}</h2>
              <p className="text-slate-600 text-lg mb-8">
                {t('featuredProjectsSubtitle')}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {projectCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveProjectCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                      activeProjectCategory === cat
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <Link 
              to="/#services" 
              className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              {t('viewAllServices')} <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer transition-all hover:shadow-2xl hover:border-indigo-200"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold rounded-full shadow-sm">
                    {project.category}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => {
                        setSelectedProject(project);
                        setIsGalleryOpen(true);
                      }}
                      className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
                    >
                      {t('quickView')} <ImageIcon className="w-4 h-4" />
                    </button>
                    <Link 
                      to={`/services/${project.serviceSlug}`}
                      className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm"
                    >
                      {t('serviceDetails')} <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No projects found</h3>
                <p className="text-slate-600">Try adjusting your category filter.</p>
                <button 
                  onClick={() => setActiveProjectCategory("All")}
                  className="mt-6 text-indigo-600 font-bold hover:underline"
                >
                  Clear filter
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <FAQSection />

      {/* AI Assistant Section */}
      <section id="ai-assistant" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold mb-6">
                  <Bot className="w-4 h-4" />
                  {t('aiPoweredSupport')}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('chatWithOurAIAssistant')}</h2>
                <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                  {t('aiAssistantDesc')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    {t('startChattingNow')}
                  </button>
                  <Link 
                    to="/chat"
                    className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20"
                  >
                    <Maximize2 className="w-5 h-5" />
                    {t('fullScreenMode')}
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-400 blur-3xl opacity-20 animate-pulse" />
                  <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                    <div className="space-y-4">
                      <div className="flex justify-start">
                        <div className="bg-white/20 rounded-2xl p-3 text-white text-sm max-w-[80%]">
                          Namaste! How can I help you today?
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-white rounded-2xl p-3 text-indigo-600 text-sm max-w-[80%] font-medium">
                          What is the price for flex printing?
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white/20 rounded-2xl p-3 text-white text-sm max-w-[80%]">
                          Flex printing starts at just ₹12 per sq. ft. for high-quality durable material!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=800&h=800" 
                  alt="Workshop" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-600 rounded-3xl -z-0 hidden md:block" />
              <div className="absolute -top-8 -left-8 w-32 h-32 border-8 border-indigo-100 rounded-3xl -z-0 hidden md:block" />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('expertPrintingSolutions')}</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                {t('aboutDesc1')}
              </p>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                {t('aboutDesc2')}
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 w-fit">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                    R
                  </div>
                  <div>
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{t('proprietor')}</div>
                    <div className="text-lg font-bold text-slate-900">Mr. Ravi Kumar</div>
                  </div>
                </div>
                {[
                  "Fast turnaround times for urgent projects",
                  "High-resolution printing with vibrant colors",
                  "Durable materials for long-lasting results",
                  "Competitive pricing without compromising quality"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection />
      <MaterialGuideSection />
      <TestimonialsSection />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-700 skew-x-12 translate-x-1/2 -z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">{t('letsStartYourProject')}</h2>
              <p className="text-indigo-100 mb-12 text-lg">
                {t('contactDesc')}
              </p>

              <div className="space-y-8">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Uttam+Flex+Printing+Near+Palan+G+Mall+Jehanabad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group hover:bg-white/5 p-4 rounded-2xl transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{t('location')}</div>
                    <div className="text-indigo-100 group-hover:text-white transition-colors underline underline-offset-4 decoration-white/20">Near Palan G Mall, MI Realme Store, Jehanabad 804408</div>
                  </div>
                </a>

                <div className="flex flex-col gap-2">
                  <a 
                    href="tel:+917481068602"
                    className="flex items-start gap-4 group hover:bg-white/5 p-4 rounded-2xl transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{t('callUs')}</div>
                      <div className="text-indigo-100 group-hover:text-white transition-colors">+91 74810 68602</div>
                    </div>
                  </a>
                  <a 
                    href="tel:+917488574905"
                    className="flex items-start gap-4 group hover:bg-white/5 p-4 rounded-2xl transition-all -mt-4"
                  >
                    <div className="w-12 h-12 opacity-0" /> {/* Spacer */}
                    <div className="text-indigo-100 group-hover:text-white transition-colors">+91 74885 74905</div>
                  </a>
                </div>

                <a 
                  href="mailto:uttamprinting.10@gmail.com"
                  className="flex items-start gap-4 group hover:bg-white/5 p-4 rounded-2xl transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{t('emailUs')}</div>
                    <div className="text-indigo-100 group-hover:text-white transition-colors">uttamprinting.10@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('fullName')}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('emailAddress')}</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('serviceNeeded')}</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all bg-white">
                    <option>Flex Printing</option>
                    <option>Vinyl Printing</option>
                    <option>Banner Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('message')}</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="Tell us about your project..."></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  {t('sendMessage')}
                </button>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {t('chatOnWhatsApp')}
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Logo light={true} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {t('footerDesc')}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6">{t('quickLinks')}</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#home" className="hover:text-white transition-colors">{t('home')}</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">{t('services')}</a></li>
                <li><a href="#ai-assistant" className="hover:text-white transition-colors">{t('aiAssistant')}</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">{t('about')}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t('contact')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="javascript:void(0)" className="hover:text-white transition-colors">Flex & Vinyl Printing</a></li>
                <li><a href="javascript:void(0)" className="hover:text-white transition-colors">ID & Visiting Cards</a></li>
                <li><a href="javascript:void(0)" className="hover:text-white transition-colors">Banners & Posters</a></li>
                <li><a href="javascript:void(0)" className="hover:text-white transition-colors">T-shirt & Glow Signs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">{t('workingHours')}</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex justify-between">
                  <span>{t('monSat')}:</span>
                  <span className="text-white">9:00 AM - 9:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>{t('sunday')}:</span>
                  <span className="text-white">10:00 AM - 2:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p>© 2026 Uttam Flex Printing. All rights reserved.</p>
              <p className="text-slate-400">Proprietor: <span className="text-white font-medium">Mr. Ravi Kumar</span></p>
              <p className="text-slate-500 mt-1">made with by ❤️ Ayush</p>
            </div>
            <div className="flex gap-6">
              <a href="javascript:void(0)" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="javascript:void(0)" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Home Scroll Buttons */}
      <FloatingHelpButton onOpenChat={() => setIsChatOpen(true)} />
    </div>
  );
};

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </Router>
    </div>
  );
}
