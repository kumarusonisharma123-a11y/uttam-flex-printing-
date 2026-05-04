import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { GoogleGenAI } from "@google/genai";

import { PortfolioSection } from "./components/PortfolioSection";
import { QuoteCalculatorSection } from "./components/QuoteCalculatorSection";
import { MaterialGuideSection } from "./components/MaterialGuideSection";
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
  Percent,
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
  ArrowRight,
  ShieldCheck,
  Upload,
  Square,
  Play,
  Pause,
  Loader2,
  Share2,
  Key,
  StickyNote,
  BookOpen,
  Plus,
  Minus,
  ShoppingBag,
  Trash,
  Wallet,
  Truck,
  Sparkles,
} from "lucide-react";

const WHATSAPP_NUMBER = "917481068602"; // User's WhatsApp number
const UPI_ID = "7481068602@ybl"; // User's UPI ID
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'm interested in your printing services.",
);

const translations = {
  en: {
    heroTitle: "Premium Printing Solutions for Your Brand",
    heroSubtitle:
      "From high-quality flex banners to professional business cards, we bring your vision to life with precision and speed.",
    getQuote: "Get a Quote",
    ourServices: "Our Services",
    featuredProjects: "Featured Projects",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    all: "All",
    searchServices: "Search services...",
    viewDetails: "View Details",
    popular: "Popular",
    footerText:
      "Uttam Flex Printing - Your trusted partner for all printing needs in Jehanabad.",
    rightsReserved: "All rights reserved.",
    callUs: "Call Us",
    emailUs: "Email Us",
    visitUs: "Visit Us",
    location: "Jehanabad, Bihar",
    fastDelivery: "Fast Delivery",
    qualityWork: "Quality Work",
    bestPrice: "Best Price",
    happyClients: "Happy Clients",
    projectsCompleted: "Projects Completed",
    yearsExperience: "Years Experience",
    gallery: "Gallery",
    close: "Close",
    send: "Send",
    typeMessage: "Type a message...",
    aiAssistant: "AI Assistant",
    clearChat: "Clear Chat",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    hindi: "Hindi",
    english: "English",
    voiceInput: "Voice Input",
    stopVoice: "Stop Voice",
    uploadImage: "Upload Image",
    calculating: "Calculating...",
    totalPrice: "Total Price",
    orderNow: "Order Now",
    pricePerSqft: "Price per sqft",
    quantity: "Quantity",
    size: "Size",
    width: "Width",
    height: "Height",
    feet: "Feet",
    inches: "Inches",
    selectService: "Select Service",
    noResults: "No results found.",
    loading: "Loading...",
    success: "Success!",
    error: "Error occurred.",
    submit: "Submit",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    subject: "Subject",
    sending: "Sending...",
    messageSent: "Your message has been sent successfully!",
    topOffer: "Special Offer: 10% OFF on first order! Code: UTTAM10",
    help: "Help",
    faq: "FAQ",
    share: "Share",
    whatsapp: "WhatsApp",
    call: "Call",
    website: "Website",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    proprietor: "Proprietor",
    address: "Address",
    openingHours: "Opening Hours",
    monSat: "Mon - Sat",
    sunday: "Sunday",
    whatsappUs: "WhatsApp Us",
    ourStory: "Our Story",
    expertPrintingSolutions: "Expert Printing Solutions Since 2015",
    aboutDesc1:
      "With over 9 years of excellence, we've been the heartbeat of quality printing in Jehanabad.",
    aboutDesc2:
      "We specialize in state-of-the-art flex, vinyl, and promotional printing.",
    contactDesc:
      "Ready to elevate your brand? Get in touch with us for premium printing services.",
    fullName: "Full Name",
    emailAddress: "Email Address",
    serviceNeeded: "Service Needed",
    sendMessage: "Send Message",
    footerDesc: "Your ultimate destination for all your printing needs.",
    quickLinks: "Quick Links",
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    workingHours: "Working Hours",
    serviceDetails: "View Details",
    startChattingNow: "Start Chatting Now",
    aiPoweredSupport: "AI-Powered Support",
    chatWithOurAIAssistant: "Chat with Our AI Assistant",
    aiAssistantDesc:
      "Need quick answers about prices or material? Our AI is here 24/7.",
    fullScreenMode: "Full Screen Mode",
    featuredWork: "Featured Work",
    priceEstimator: "Price Estimator",
    off: "OFF",
    servicesSubtitle:
      "We offer a wide range of high-quality printing services to meet all your business and personal needs.",
    chatOnWhatsApp: "Chat on WhatsApp",
    addToCart: "Add to Cart",
    cart: "Cart",
    emptyCart: "Your cart is empty",
    total: "Total",
    checkout: "Checkout",
    sale: "Sale",
    items: "items",
    item: "item",
    removedFromCart: "Removed from cart",
    addedToCart: "Added to cart",
  },
  hi: {
    heroTitle: "आपके ब्रांड के लिए प्रीमियम प्रिंटिंग समाधान",
    heroSubtitle:
      "उच्च गुणवत्ता वाले फ्लेक्स बैनर से लेकर पेशेवर बिजनेस कार्ड तक, हम आपकी दृष्टि को सटीकता और गति के साथ जीवंत करते हैं।",
    getQuote: "कोट प्राप्त करें",
    ourServices: "हमारी सेवाएँ",
    featuredProjects: "चुनिंदा प्रोजेक्ट्स",
    aboutUs: "हमारे बारे में",
    contactUs: "संपर्क करें",
    all: "सभी",
    searchServices: "सेवाएं खोजें...",
    viewDetails: "विवरण देखें",
    popular: "लोकप्रिय",
    footerText:
      "उत्तम फ्लेक्स प्रिंटिंग - जहानाबाद में आपकी सभी प्रिंटिंग आवश्यकताओं के लिए आपका भरोसेमंद साथी।",
    rightsReserved: "सर्वाधिकार सुरक्षित।",
    callUs: "हमें कॉल करें",
    emailUs: "हमें ईमेल करें",
    visitUs: "हमसे मिलें",
    location: "जहानाबाद, बिहार",
    fastDelivery: "तेज़ डिलीवरी",
    qualityWork: "गुणवत्तापूर्ण कार्य",
    bestPrice: "सबसे अच्छी कीमत",
    happyClients: "खुश ग्राहक",
    projectsCompleted: "प्रोजेक्ट्स पूरे हुए",
    yearsExperience: "वर्षों का अनुभव",
    gallery: "गैलरी",
    close: "बंद करें",
    send: "भेजें",
    typeMessage: "संदेश टाइप करें...",
    aiAssistant: "AI सहायक",
    clearChat: "चैट साफ़ करें",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    language: "भाषा",
    hindi: "हिंदी",
    english: "अंग्रेजी",
    voiceInput: "वॉयस इनपुट",
    stopVoice: "वॉयस बंद करें",
    uploadImage: "छवि अपलोड करें",
    calculating: "गणना की जा रही है...",
    totalPrice: "कुल कीमत",
    pricePerSqft: "प्रति वर्ग फुट कीमत",
    quantity: "मात्रा",
    size: "आकार",
    topOffer: "विशेष ऑफर: अपने पहले ऑर्डर पर 10% की छूट पाएं! कोड: UTTAM10",
    help: "सहायता",
    faq: "सामान्य प्रश्न",
    share: "शेयर करें",
    whatsapp: "व्हाट्सएप",
    call: "कॉल",
    website: "वेबसाइट",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    proprietor: "मालिक",
    address: "पता",
    openingHours: "खुलने का समय",
    monSat: "सोम - शनि",
    sunday: "रविवार",
    whatsappUs: "व्हाट्सएप करें",
    ourStory: "हमारी कहानी",
    expertPrintingSolutions: "2015 से विशेषज्ञ प्रिंटिंग समाधान",
    aboutDesc1:
      "9 वर्षों से अधिक की उत्कृष्टता के साथ, हम जहानाबाद में गुणवत्तापूर्ण प्रिंटिंग की धड़कन रहे हैं।",
    aboutDesc2:
      "हम अत्याधुनिक फ्लेक्स, विनाइल और प्रचार प्रिंटिंग में विशेषज्ञ हैं।",
    contactDesc:
      "अपने ब्रांड को नई ऊंचाइयों पर ले जाने के लिए तैयार हैं? हमसे संपर्क करें।",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    serviceNeeded: "आवश्यक सेवा",
    sendMessage: "संदेश भेजें",
    footerDesc: "आपकी सभी प्रिंटिंग आवश्यकताओं के लिए आपका अंतिम गंतव्य।",
    quickLinks: "त्वरित लिंक",
    home: "होम",
    services: "सेवाएं",
    about: "हमारे बारे में",
    contact: "संपर्क करें",
    workingHours: "कार्य के घंटे",
    serviceDetails: "विवरण देखें",
    startChattingNow: "अभी चैट शुरू करें",
    aiPoweredSupport: "एआई-संचालित सहायता",
    chatWithOurAIAssistant: "हमारे एआई सहायक के साथ चैट करें",
    aiAssistantDesc:
      "कीमतों या सामग्री के बारे में त्वरित उत्तर चाहिए? हमारा एआई 24/7 यहां है।",
    fullScreenMode: "फुल स्क्रीन मोड",
    featuredWork: "चुनिंदा कार्य",
    priceEstimator: "कीमत अनुमानक",
    off: "छूट",
    servicesSubtitle:
      "हम आपकी सभी व्यावसायिक और व्यक्तिगत आवश्यकताओं को पूरा करने के लिए उच्च गुणवत्ता वाली प्रिंटिंग सेवाओं की एक विस्तृत श्रृंखला प्रदान करते हैं।",
    chatOnWhatsApp: "व्हाट्सएप पर चैट करें",
    addToCart: "कार्ट में जोड़ें",
    cart: "कार्ट",
    emptyCart: "आपकी कार्ट खाली है",
    total: "कुल",
    checkout: "चेकआउट",
    sale: "सेल",
    items: "आइटम",
    item: "आइटम",
    removedFromCart: "कार्ट से हटाया गया",
    addedToCart: "कार्ट में जोड़ा गया",
  },
};

const ChatBot = ({
  isOpen,
  onClose,
  isStandalone = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  isStandalone?: boolean;
}) => {
  const [language, setLanguage] = useState<"en" | "hi">(() => {
    try {
      const saved = localStorage.getItem("uttam_chat_lang");
      return saved === "en" || saved === "hi" ? saved : "en";
    } catch (e) {
      return "en";
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("uttam_chat_darkmode");
      return saved === "true";
    } catch (e) {
      return false;
    }
  });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string; image?: string }[]
  >(() => {
    try {
      const saved = localStorage.getItem("uttam_chat_history");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore error
    }

    return [
      {
        role: "bot",
        text:
          language === "hi"
            ? "नमस्ते! मैं उत्तम फ्लेक्स प्रिंटिंग का AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?"
            : "Namaste! I'm Uttam's AI Assistant. How can I help you with your printing needs today?",
      },
    ];
  });
  const [input, setInput] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === "hi" ? "hi-IN" : "en-IN";

      recognitionRef.current.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
        if (event.results[event.results.length - 1].isFinal) {
          setIsListening(false);
          recognitionRef.current?.stop();
        }
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
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          setInput(transcript);
          if (event.results[event.results.length - 1].isFinal) {
            setIsListening(false);
            recognitionRef.current?.stop();
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
          if (event.error === "not-allowed") {
            console.warn("Microphone access denied.");
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }

      recognitionRef.current.lang = language === "hi" ? "hi-IN" : "en-IN";

      try {
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
    localStorage.setItem("uttam_chat_history", JSON.stringify(messages));
    localStorage.setItem("uttam_chat_lang", language);
    localStorage.setItem("uttam_chat_darkmode", String(darkMode));

    return () => {};
  }, [messages, language, darkMode]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {};
  }, []);

  const clearChat = () => {
    const initialMessage = [
      {
        role: "bot",
        text:
          language === "hi"
            ? "नमस्ते! मैं उत्तम फ्लेक्स प्रिंटिंग का AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?"
            : "Namaste! I'm Uttam's AI Assistant. How can I help you with your printing needs today?",
      },
    ] as { role: "user" | "bot"; text: string }[];
    setMessages(initialMessage);
    localStorage.removeItem("uttam_chat_history");
    setShowClearConfirm(false);
  };

  const chatRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || (!isOpen && !isStandalone)) {
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey });
      chatRef.current = ai.chats.create({
        model: "gemini-3.1-flash-lite-preview",
        history: messages
          .filter((m) => m.text)
          .map((m: any) => ({
            role: m.role === "bot" ? "model" : "user",
            parts: [{ text: m.text }],
          })),
        config: {
          systemInstruction: `You are the AI Assistant for 'Uttam Flex Printing', located in Jehanabad, Bihar. 
          Your goal is to help customers with their printing queries.
          
          LANGUAGE: 
          - Current Language: ${language === "hi" ? "Hindi" : "English"}.
          - You MUST respond ONLY in ${language === "hi" ? "Hindi" : "English"}.
          
          CRITICAL: BE EXTREMELY FAST AND CONCISE. Answer in a snap. Use short sentences. DO NOT use introductory filler phrases or promotional small talk (e.g., DO NOT say "If you need the best printing press in Bihar..."). Just answer the exact question directly.
          
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
          ${JSON.stringify(services.map((s) => ({ title: s.title, description: s.description })))}
          
          MATERIAL GUIDE:
          ${JSON.stringify([
            {
              name: "Flex",
              description: "Durable for outdoor banners, cost-effective.",
            },
            {
              name: "Vinyl",
              description:
                "Waterproof, high-quality finish, great for stickers.",
            },
            {
              name: "Sunboard",
              description: "Rigid, ideal for indoor displays and signs.",
            },
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
    } catch (err) {
      console.error("Failed to initialize Gemini AI:", err);
    }
  }, [language, isOpen, isStandalone]);

  if (!isOpen && !isStandalone) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !uploadedImage) || isLoading) return;

    const userMessage = input.trim();
    const currentImage = uploadedImage;
    setInput("");
    setUploadedImage(null);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage, image: currentImage || undefined },
    ]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error("GEMINI_API_KEY is missing");
        }
        const ai = new GoogleGenAI({ apiKey });
        chatRef.current = ai.chats.create({
          model: "gemini-3.1-flash-lite-preview",
          history: messages
            .filter((m) => m.text)
            .map((m: any) => ({
              role: m.role === "bot" ? "model" : "user",
              parts: [{ text: m.text }],
            })),
          config: {
            systemInstruction: `You are the AI Assistant for 'Uttam Flex Printing', located in Jehanabad, Bihar. 
            Your goal is to help customers with their printing queries.
            
            LANGUAGE: 
            - Current Language: ${language === "hi" ? "Hindi" : "English"}.
            - You MUST respond ONLY in ${language === "hi" ? "Hindi" : "English"}.
            
            CRITICAL: BE EXTREMELY FAST AND CONCISE. Answer in a snap. Use short sentences. DO NOT use introductory filler phrases or promotional small talk (e.g., DO NOT say "If you need the best printing press in Bihar..."). Just answer the exact question directly.
            
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
            ${JSON.stringify(services.map((s) => ({ title: s.title, description: s.description })))}
            
            MATERIAL GUIDE:
            ${JSON.stringify([
              {
                name: "Flex",
                description: "Durable for outdoor banners, cost-effective.",
              },
              {
                name: "Vinyl",
                description:
                  "Waterproof, high-quality finish, great for stickers.",
              },
              {
                name: "Sunboard",
                description: "Rigid, ideal for indoor displays and signs.",
              },
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
      }

      const parts: any[] = [
        {
          text:
            userMessage || "Describe this image relative to printing services.",
        },
      ];

      if (currentImage) {
        const base64Data = currentImage.split(",")[1];
        const mimeType = currentImage.split(";")[0].split(":")[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        });
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const stream = await chatRef.current.sendMessageStream({
        message: currentImage ? { parts } : userMessage,
        config: {
          abortSignal: abortControllerRef.current.signal,
        },
      });
      stopRef.current = false;

      let botResponse = "";
      setMessages((prev) => [...prev, { role: "bot", text: "" }]);

      for await (const chunk of stream) {
        if (stopRef.current) {
          setIsStopping(false);
          setIsLoading(false);
          break;
        }
        const text = chunk.text;
        if (text) {
          botResponse += text;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = botResponse;
            return newMessages;
          });
        }
      }

      // Auto-play speech if enabled
      // Audio removed
    } catch (error: any) {
      if (error?.name === "AbortError" || stopRef.current) {
        // Ignored on abort
        return;
      }
      console.error("ChatBot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsStopping(false);
    }
  };

  const handleStop = () => {
    stopRef.current = true;
    setIsStopping(true);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div
      className={
        isStandalone
          ? `w-full h-[100dvh] ${darkMode ? "bg-slate-900" : "bg-white"} flex flex-col relative z-[120]`
          : `fixed bottom-20 sm:bottom-24 right-4 sm:right-8 z-[120] w-[calc(100%-32px)] sm:w-[450px] md:w-[480px] ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} rounded-3xl shadow-2xl border overflow-hidden flex flex-col h-[600px] max-h-[calc(100dvh-100px)]`
      }
    >
      {/* Header */}
      <div
        className={`${darkMode ? "bg-zinc-800" : "bg-zinc-900"} px-3 py-3 sm:p-4 text-white flex justify-between items-center shrink-0 gap-2 shrink-0`}
      >
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink min-w-0">
          {isStandalone && (
            <button
              onClick={onClose}
              className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all flex items-center gap-1 sm:gap-2 border border-white/10 shrink-0"
              title="Back to Home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">
                Back
              </span>
            </button>
          )}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-xs sm:text-sm truncate">Uttam AI</div>
            <div className="text-[10px] opacity-80 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {!isStandalone && (
            <Link
              to="/chat"
              title="Open in Full Screen"
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${darkMode ? "text-white/80 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"}`}
            >
              <Maximize2 className="w-4 h-4 sm:w-4 sm:h-4" />
            </Link>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-1.5 sm:p-2 rounded-full transition-all ${darkMode ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <div className="relative shrink-0">
            <button
              onClick={() => setShowClearConfirm(!showClearConfirm)}
              title="Clear Chat History"
              className={`flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg transition-colors text-xs font-medium ${showClearConfirm ? "bg-blue-500 text-white" : "hover:bg-white/10 text-white/90 hover:text-white"}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {showClearConfirm ? "Confirm?" : "Clear"}
              </span>
              {showClearConfirm && <span className="sm:hidden">?</span>}
            </button>

            {showClearConfirm && (
              <div className="absolute top-full right-0 mt-2 z-[110] ml-[-100px] bg-white rounded-xl shadow-xl border border-slate-200 p-2 flex flex-col gap-1 min-w-[120px]">
                <button
                  onClick={clearChat}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="px-2 lg:px-3 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all flex items-center gap-1 sm:gap-2 border border-blue-400 shadow-lg shadow-blue-900/20 shrink-0"
            title="Close Chat"
          >
            <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">
              Close
            </span>
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
            <div
              key={idx}
              className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
            >
              {m.image && (
                <div className="max-w-[85%] mb-2">
                  <img
                    src={m.image}
                    alt="User upload"
                    className="rounded-2xl shadow-sm border border-slate-200"
                  />
                </div>
              )}
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm relative group transition-all duration-300 ${
                  m.role === "user"
                    ? "bg-zinc-900 text-white rounded-tr-none"
                    : `${darkMode ? "bg-zinc-700 text-zinc-100" : "bg-white text-zinc-900"} shadow-sm border rounded-tl-none ${darkMode ? "border-zinc-600" : "border-zinc-100"}`
                }`}
              >
                {m.text}

                {m.role === "bot" && m.text && (
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
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    AI is typing...
                  </span>
                </div>
                <button
                  onClick={handleStop}
                  disabled={isStopping}
                  className="p-1 px-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-all flex items-center gap-1.5 border border-slate-200"
                  title="Stop AI Response"
                >
                  <Square className="w-2.5 h-2.5 fill-current" />
                  <span className="text-[9px] font-bold uppercase tracking-tight">
                    Stop
                  </span>
                </button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div
        className={`p-4 border-t ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
      >
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { en: "Flex Printing Price?", hi: "फ्लेक्स प्रिंटिंग का रेट?" },
              { en: "Turnaround time?", hi: "कितना समय लगेगा?" },
              { en: "Contact info", hi: "संपर्क जानकारी" },
            ].map((faq, i) => (
              <button
                key={i}
                onClick={() => {
                  const text = language === "hi" ? faq.hi : faq.en;
                  setInput(text);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  darkMode
                    ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {language === "hi" ? faq.hi : faq.en}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleSend} className="flex gap-2 items-center">
          <div className="flex-col w-full gap-2">
            {uploadedImage && (
              <div className="relative w-12 h-12 mb-2">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="flex-1 relative flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setUploadedImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className={`p-2 rounded-full cursor-pointer ${darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-700"}`}
              >
                <Upload className="w-5 h-5" />
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (isListening) {
                    recognitionRef.current?.stop();
                    setIsListening(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e as any);
                  }
                }}
                aria-label={language === "hi" ? "चैट इनपुट" : "Chat input"}
                placeholder={
                  language === "hi"
                    ? "मुझसे कुछ भी पूछें..."
                    : "Ask me anything..."
                }
                className={`w-full px-4 py-2 pr-20 rounded-xl border-none focus:ring-2 focus:ring-blue-600 outline-none text-sm ${darkMode ? "bg-slate-700 text-white placeholder-slate-400" : "bg-slate-100 text-slate-800 placeholder-slate-500"}`}
              />
              <button
                type="button"
                onClick={toggleListening}
                aria-label={language === "hi" ? "बोलकर पूछें" : "Voice Input"}
                className={`absolute right-12 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : darkMode
                      ? "text-slate-400 hover:text-blue-400 hover:bg-slate-600"
                      : "text-slate-400 hover:text-blue-600 hover:bg-slate-200"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const FloatingHelpButton = ({ onOpenChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-end gap-2 sm:gap-4 z-[110]">
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 sm:p-6 w-[calc(100vw-32px)] sm:w-72 max-w-[320px] mb-2 origin-bottom-right animate-in fade-in zoom-in duration-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
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
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Chat with AI
                </div>
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
                <div className="text-sm font-bold text-slate-900">
                  WhatsApp Chat
                </div>
                <div className="text-xs text-slate-500">Human support</div>
              </div>
            </a>
            <a
              href="tel:+917481068602"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Call Support
                </div>
                <div className="text-xs text-slate-500">9 AM - 8 PM</div>
              </div>
            </a>
            <Link
              to="/#faq"
              onClick={(e) => {
                setIsOpen(false);
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
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
                  title: "Uttam Flex Printing",
                  text: "Check out Uttam Flex Printing for all your printing needs!",
                  url: window.location.href,
                };
                if (navigator.share) {
                  navigator.share(shareData).catch(console.error);
                } else {
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      alert("Link copied to clipboard!");
                    })
                    .catch(() => {
                      alert("Share not supported and copy failed.");
                    });
                }
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Share Website
                </div>
                <div className="text-xs text-slate-500">Spread the word</div>
              </div>
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        {isOpen && (
          <span className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl">
            Close
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isOpen
              ? "bg-slate-900 text-white rotate-90"
              : "bg-blue-600 text-white hover:scale-110"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          ) : (
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          )}
        </button>
      </div>
    </div>
  );
};

const PriceCalculator = ({
  isOpen,
  onClose,
  setIsChatOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  setIsChatOpen: (v: boolean) => void;
}) => {
  const [service, setService] = useState("flex");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(5);

  const prices: Record<string, number> = {
    flex: 12, // per sq ft
    vinyl: 25,
    glow: 150,
    banner: 15,
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
                  <Calculator className="w-6 h-6 text-blue-600" />
                  Price Estimator
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Select Service
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="flex">Flex Printing (₹12/sqft)</option>
                    <option value="vinyl">Vinyl Printing (₹25/sqft)</option>
                    <option value="glow">Glow Sign Board (₹150/sqft)</option>
                    <option value="banner">Banner/Poster (₹15/sqft)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Width (ft)
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Height (ft)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <div className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-1">
                    Estimated Total
                  </div>
                  <div className="text-4xl font-black text-slate-900">
                    ₹{total.toLocaleString()}
                  </div>
                  <p className="text-slate-500 text-xs mt-2">
                    * This is an estimate. Final price may vary based on design
                    and material quality.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    setIsChatOpen(true);
                  }}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg mb-4"
                >
                  Chat with AI
                </button>

                <button
                  onClick={() => {
                    onClose();
                    window.open(
                      `https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I got an estimate of ₹${total} for a ${width}x${height} ${service} print. I'd like to proceed.`,
                      "_blank",
                    );
                  }}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
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
      answer:
        "Typically, a standard flex banner can be printed and ready for pickup within 2-4 hours. Larger projects or those requiring custom design work may take 24-48 hours.",
    },
    {
      question: "Do you provide installation services?",
      answer:
        "Yes, we have a professional team for billboard and signage installation across Jehanabad and nearby areas. Installation charges depend on the size and height of the site.",
    },
    {
      question: "Can I provide my own design?",
      answer:
        "Absolutely! You can bring your designs in high-resolution PDF, CDR, or AI formats. We also offer professional design services if you only have an idea.",
    },
    {
      question: "What is the life of outdoor flex prints?",
      answer:
        "Premium quality flex prints are weather-resistant and typically last 1-3 years outdoors, depending on sun exposure and wind conditions.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-24 bg-slate-950 text-white border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400">
            Everything you need to know about our services and process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-white/10 rounded-2xl overflow-hidden transition-all bg-white/5 backdrop-blur-md"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-white text-lg">
                  {faq.question}
                </span>
                {activeIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-blue-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {activeIndex === idx && (
                  <motion.div
                    key={`content-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
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

const Logo = ({
  scrolled = false,
  light = false,
}: {
  scrolled?: boolean;
  light?: boolean;
}) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 ${scrolled ? "bg-white/5 backdrop-blur-md border border-white/10" : "bg-transparent"}`}
  >
    <div className="flex flex-col leading-none">
      <div className="flex items-center gap-1 mb-0.5">
        <Zap className="w-2.5 h-2.5 text-blue-500 fill-blue-500" />
        <span
          className={`text-[8px] font-black uppercase tracking-[0.2em] transition-all ${scrolled ? "text-white" : "text-white"}`}
        >
          UTTAM
        </span>
      </div>
      <span
        className={`text-xs font-black tracking-tighter transition-all ${scrolled ? "text-white" : "text-white"}`}
      >
        FLEX PRINTING
      </span>
    </div>
  </div>
);

const services = [
  {
    slug: "flex-printing",
    title: "Flex Printing",
    price: "₹12/sqft",
    originalPrice: "₹15/sqft",
    numericPrice: 12,
    onSale: false,
    discount: "0%",
    description:
      "High-quality large format flex printing for billboards and shop fronts.",
    longDescription:
      "Our Flex Printing service offers durable and vibrant solutions for all your large-scale advertising needs. We use high-grade PVC flex material that is weather-resistant and perfect for outdoor use.",
    icon: <Printer className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1593642634443-44ba5cc6cbd2?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Large Format",
    popularity: 10,
    variants: [
      { size: "2x3 ft", price: 72 },
      { size: "3x4 ft", price: 144 },
      { size: "4x5 ft", price: 240 },
      { size: "5x8 ft", price: 480 },
      { size: "10x10 ft", price: 1200 },
    ],
  },
  {
    slug: "banners",
    title: "Banner",
    price: "₹18/sqft",
    originalPrice: "₹22/sqft",
    numericPrice: 18,
    onSale: false,
    discount: "0%",
    description:
      "Eye-catching large scale banners for all your events and promotions.",
    longDescription:
      "From small indoor banners to massive outdoor displays, we provide high-impact visual solutions for any occasion. Our banners are made from reinforced vinyl with grommets for easy hanging.",
    icon: <Flag className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Large Format",
    popularity: 9,
    variants: [
      { size: "2x3 ft", price: 108 },
      { size: "3x4 ft", price: 216 },
      { size: "4x5 ft", price: 360 },
      { size: "5x8 ft", price: 720 },
    ],
  },
  {
    slug: "posters",
    title: "Poster",
    price: "₹15/sqft",
    originalPrice: "₹20/sqft",
    numericPrice: 15,
    onSale: false,
    discount: "0%",
    description: "High-quality posters for indoor and outdoor advertising.",
    longDescription:
      "Our posters are printed on high-quality photo paper with rich colors. Perfect for sales promotions, movie releases, or educational displays, our prints are designed to stand out.",
    icon: <ImageIcon className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Large Format",
    popularity: 8,
    variants: [
      { size: "A4", price: 30 },
      { size: "A3", price: 60 },
      { size: "2x3 ft", price: 90 },
      { size: "3x4 ft", price: 180 },
    ],
  },
  {
    slug: "visiting-cards",
    title: "Visiting Card",
    price: "₹250/100pcs",
    originalPrice: "₹300/100pcs",
    numericPrice: 250,
    onSale: false,
    discount: "0%",
    description:
      "Professional business cards with premium finishes and textures.",
    longDescription:
      "Make a lasting first impression with our premium business card printing. We offer a wide range of paper stocks and finishes like matte lamination and spot UV.",
    icon: <Contact className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Business Essentials",
    popularity: 9,
    variants: [
      { size: "100 pcs", price: 250 },
      { size: "250 pcs", price: 550 },
      { size: "500 pcs", price: 1000 },
    ],
  },
  {
    slug: "glow-sign-boards",
    title: "Glow Sign Board",
    price: "₹180/sqft",
    originalPrice: "₹200/sqft",
    numericPrice: 180,
    onSale: false,
    discount: "0%",
    description:
      "Backlit glow sign boards for high visibility during day and night.",
    longDescription:
      "Illuminate your brand with our premium glow sign boards. These backlit displays are designed for maximum visibility, making your business stand out even in the dark.",
    icon: <Sun className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Large Format",
    popularity: 7,
  },
  {
    slug: "t-shirt-printing",
    title: "T-Shirt Printing",
    price: "₹350/piece",
    originalPrice: "₹450/piece",
    numericPrice: 350,
    onSale: false,
    discount: "0%",
    description:
      "Custom T-shirt printing with high-quality vinyl or screen printing.",
    longDescription:
      "Personalize your wardrobe or promote your brand with our custom T-shirt printing services. We offer high-quality prints that are durable and soft to the touch.",
    icon: <Shirt className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Apparel",
    popularity: 9,
    variants: [
      { size: "S", price: 350 },
      { size: "M", price: 350 },
      { size: "L", price: 350 },
      { size: "XL", price: 350 },
    ],
  },
  {
    slug: "id-cards",
    title: "ID Card",
    price: "₹60/piece",
    originalPrice: "₹80/piece",
    numericPrice: 60,
    onSale: false,
    discount: "0%",
    description: "Professional PVC ID cards for schools, offices, and events.",
    longDescription:
      "Our PVC ID cards are durable, waterproof, and feature high-resolution printing for clear identification. Perfect for corporate, school, or event use.",
    icon: <IdCard className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1611095773767-116b5420216b?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Business Essentials",
    popularity: 8,
  },
  {
    slug: "mugs",
    title: "Custom Mug",
    price: "₹199/piece",
    originalPrice: "₹250/piece",
    numericPrice: 199,
    onSale: false,
    discount: "0%",
    description: "Personalized ceramic mugs with vibrant, long-lasting prints.",
    longDescription:
      "Make every sip special with our custom-printed ceramic mugs. Perfect for gifts, corporate branding, or personal use, our prints are dishwasher safe and vibrant.",
    icon: <Coffee className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Gifts",
    popularity: 7,
  },
  {
    slug: "keychains",
    title: "Custom Keychain",
    price: "₹50/piece",
    originalPrice: "₹70/piece",
    numericPrice: 50,
    onSale: false,
    discount: "0%",
    description: "Acrylic or metal keychains with custom designs.",
    longDescription:
      "Durable and stylish keychains perfect for branding or gifts. Available in various shapes and materials.",
    icon: <Key className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1595763517918-7711343c4423?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Gifts",
    popularity: 6,
  },
  {
    slug: "stickers",
    title: "Custom Stickers",
    price: "₹10/piece",
    originalPrice: "₹15/piece",
    numericPrice: 10,
    onSale: false,
    discount: "0%",
    description: "High-quality vinyl stickers for branding or personal use.",
    longDescription:
      "Waterproof and vibrant vinyl stickers. Perfect for laptops, bottles, or promotional giveaways.",
    icon: <StickyNote className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1572676990675-01e915152865?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Business Essentials",
    popularity: 8,
  },
  {
    slug: "standee",
    title: "Standee",
    price: "₹850/piece",
    originalPrice: "₹1000/piece",
    numericPrice: 850,
    onSale: false,
    discount: "0%",
    description: "Roll-up standees for exhibitions and shop displays.",
    longDescription:
      "Portable and professional roll-up standees. Easy to carry and set up, perfect for events, showrooms, and exhibitions.",
    icon: <Flag className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=800&h=600&auto=format&fit=crop",
    category: "Large Format",
    popularity: 8,
  },
  {
    slug: "brochures",
    title: "Brochures",
    price: "₹8/piece",
    originalPrice: "₹10/piece",
    numericPrice: 8,
    onSale: false,
    discount: "0%",
    description: "Professional brochures to showcase your business.",
    longDescription:
      "High-quality glossy or matte brochures to effectively communicate your business information.",
    icon: <BookOpen className="w-6 h-6" />,
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Business Essentials",
    popularity: 7,
  },
];

const stats = [
  {
    label: "Years Experience",
    value: "15+",
    icon: <Award className="w-5 h-5" />,
  },
  {
    label: "Happy Clients",
    value: "5000+",
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Projects Done",
    value: "12000+",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

const themes = [
  { primaryColor: "#2563eb", fontFamily: "Inter, sans-serif" }, // Blue, Inter
  { primaryColor: "#dc2626", fontFamily: "Outfit, sans-serif" }, // Red, Outfit
  { primaryColor: "#059669", fontFamily: "Space Grotesk, sans-serif" }, // Green, Space Grotesk
];

const getDailyPrice = (basePrice: number) => {
  const day = new Date().getDate();
  const factor = 1 + Math.sin(day) * 0.1; // +/- 10% fluctuation
  return Math.round(basePrice * factor);
};

const getDynamicServices = () => {
  return services.map((service) => ({
    ...service,
    numericPrice: getDailyPrice(service.numericPrice),
    price: `₹${getDailyPrice(service.numericPrice)}/${service.price.split("/")[1] || "piece"}`,
  }));
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const service = getDynamicServices().find((s) => s.slug === slug);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"details" | "process" | "faq">(
    "details",
  );
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service?.variants) {
      setSelectedVariant(service.variants[0]);
    }
  }, [pathname, service]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Printer className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            Service Not Found
          </h2>
          <p className="text-slate-600 mb-8">
            The service you are looking for might have been moved or deleted.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const currentPrice = selectedVariant
    ? selectedVariant.price
    : service.numericPrice;

  const features = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      title: "Premium Quality",
      desc: "We use only the best materials for a professional finish.",
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      title: "Fast Turnaround",
      desc: "Most orders are ready within 24-48 hours.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-500" />,
      title: "Durability",
      desc: "Weather-resistant and long-lasting print quality.",
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      title: "Vibrant Colors",
      desc: "High-resolution printing with rich, accurate colors.",
    },
  ];

  const relatedServices = getDynamicServices()
    .filter((s) => s.slug !== slug && s.category === service.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo scrolled={true} />
            </Link>
            <Link
              to="/"
              className="text-sm font-bold text-slate-600 hover:text-blue-600 flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-black/5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square border-8 border-white">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl -z-0 animate-pulse" />
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl -z-0 animate-pulse delay-700" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Quality Guarantee
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      100% Satisfaction
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-8 border border-blue-100">
                {service.icon}
                {service.category}
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-950 mb-8 tracking-tight leading-tight">
                {service.title}
                {slug === "visiting-cards" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold ml-3 align-middle"
                  >
                    <Sparkles className="w-3 h-3" />
                    New!
                  </motion.span>
                )}
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                {service.longDescription}
              </p>

              {/* Tabs */}
              <div className="flex gap-8 border-b border-slate-200 mb-10">
                {(["details", "process", "faq"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                      activeTab === tab
                        ? "text-blue-600"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-10"
                  >
                    {service.variants && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Maximize2 className="w-4 h-4 text-blue-600" />
                          Select Configuration
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {service.variants.map((v: any, index: number) => (
                            <button
                              key={v.size || index}
                              onClick={() => setSelectedVariant(v)}
                              className={`p-5 rounded-2xl border-2 transition-all text-left group hover:scale-[1.02] hover:shadow-md ${
                                selectedVariant?.size === v.size
                                  ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-600/5"
                                  : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                              }`}
                            >
                              <span
                                className={`block font-bold text-lg mb-1 transition-colors ${
                                  selectedVariant?.size === v.size
                                    ? "text-blue-600"
                                    : "text-slate-900"
                                }`}
                              >
                                {v.size}
                              </span>
                              <span className="text-sm font-medium text-slate-500">
                                ₹{v.price}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-[2rem] bg-slate-900 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                      <div className="flex-1">
                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest block mb-2">
                          Estimated Price
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black text-white">
                            ₹{currentPrice}
                          </span>
                          <span className="text-slate-400 line-through text-lg">
                            ₹{Math.round(currentPrice * 1.2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          window.open(
                            `https://wa.me/917481068602?text=I%20want%20to%20order%20${service.title}${selectedVariant ? ` (${selectedVariant.size})` : ""}%20at%20price%20₹${currentPrice}`,
                            "_blank",
                          )
                        }
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95"
                      >
                        <MessageSquare className="w-6 h-6" />
                        Order Now
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "process" && (
                  <motion.div
                    key="process"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    {[
                      {
                        step: "01",
                        title: "Design Selection",
                        desc: "Choose from our templates or provide your own custom design.",
                      },
                      {
                        step: "02",
                        title: "Material Choice",
                        desc: "Select the best material and finish for your specific needs.",
                      },
                      {
                        step: "03",
                        title: "Professional Printing",
                        desc: "We use high-end machinery to ensure the best print quality.",
                      },
                      {
                        step: "04",
                        title: "Quality Check & Delivery",
                        desc: "Every item is inspected before being shipped or picked up.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 items-start group">
                        <div className="text-4xl font-black text-slate-100 group-hover:text-blue-100 transition-colors duration-300">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "faq" && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {[
                      {
                        q: "How long does it take?",
                        a: "Standard production time is 24-48 hours depending on order size.",
                      },
                      {
                        q: "Do you provide design services?",
                        a: "Yes, our expert designers can help create the perfect design for you.",
                      },
                      {
                        q: "Is there a minimum order quantity?",
                        a: "Most items have no minimum, but visiting cards start at 100 pieces.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <h4 className="font-bold text-slate-900 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-blue-600" />
                            {item.q}
                          </h4>
                          {activeFaq === idx ? (
                            <ChevronUp className="w-5 h-5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </button>
                        <AnimatePresence initial={false}>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-blue-600/5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="mb-24">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">
                    Explore More
                  </div>
                  <h2 className="text-4xl font-display font-bold text-slate-950 tracking-tight">
                    Related Services
                  </h2>
                </div>
                <Link
                  to="/"
                  className="text-blue-600 font-bold hover:underline flex items-center gap-2"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedServices.map((s, idx) => (
                  <Link
                    key={idx}
                    to={`/services/${s.slug}`}
                    className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                        {s.icon}
                        {s.category}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2">
                        {s.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <Logo light={true} />
          <div className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
            <p>© 2026 Uttam Flex Printing. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProjectGalleryModal = ({
  project,
  isOpen,
  onClose,
}: {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
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
                    setActiveImage((prev) =>
                      prev === 0 ? project.gallery.length - 1 : prev - 1,
                    );
                  }}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all backdrop-blur-md pointer-events-auto"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) =>
                      prev === project.gallery.length - 1 ? 0 : prev + 1,
                    );
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
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Project Gallery
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {project.gallery.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === idx
                          ? "border-blue-600 scale-95 shadow-inner"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <Link
                  to={`/services/${project.serviceSlug}`}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-center hover:bg-blue-700 transition-all block"
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

function Home() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const t = (key: keyof typeof translations.en) =>
    translations[language][key] || key;
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
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingData(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      name: "Rahul Kumar",
      role: "Local Business Owner",
      text: "Uttam Flex Printing ne mere shop ka banner bahut hi kam samay mein aur best quality mein banaya. Highly recommended!",
    },
    {
      name: "Priya Singh",
      role: "Event Planner",
      text: "Main hamesha apne events ke liye posters aur banners yahi se banwati hoon. Quality aur service dono top-notch hai.",
    },
    {
      name: "Amit Verma",
      role: "Student",
      text: "Visiting cards aur project posters ke liye best place in Jehanabad. Prices bhi bahut reasonable hain.",
    },
  ];

  const faqs = [
    {
      question: "Do you provide same-day delivery?",
      answer:
        "Yes, for most small orders, we provide same-day delivery if ordered before 12 PM.",
    },
    {
      question: "What is the minimum order quantity?",
      answer:
        "We accept orders of all sizes, from a single unit to bulk orders.",
    },
    {
      question: "Do you offer graphic design services?",
      answer:
        "Yes, we have expert designers who can help you with custom designs for your projects.",
    },
  ];

  const Testimonials = () => (
    <section className="py-24 bg-slate-950 text-white border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-16 tracking-tight uppercase">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-10 bg-white/5 rounded-[2rem] border border-white/10 hover:border-blue-500/30 transition-all group shadow-sm hover:shadow-xl backdrop-blur-md"
            >
              <p className="text-slate-300 mb-8 italic text-lg leading-relaxed">
                "{t.text}"
              </p>
              <div className="font-bold text-white text-xl">{t.name}</div>
              <div className="text-sm text-blue-400 font-bold uppercase tracking-widest mt-1">
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );



  const Newsletter = () => (
    <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6 tracking-tight">Stay Updated</h2>
        <p className="mb-8 text-blue-100/80 text-lg">
          Subscribe to our newsletter for exclusive offers and printing tips.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-blue-200 outline-none focus:bg-white/20 transition-all"
          />
          <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
  const featuredProjects = [
    {
      title: "Custom Shop Banner",
      description:
        "High-quality outdoor banner for a local shop in Jehanabad. Best quality in low price.",
      image:
        "https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=800&h=600",
      gallery: [
        "https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1612810806563-4cb8265db55f?auto=format&fit=crop&q=80&w=800&h=600",
      ],
      serviceSlug: "flex-printing",
      category: "Large Format",
    },
    {
      title: "Professional Visiting Cards",
      description: "Premium matte-finish business cards. ₹199 se start.",
      image:
        "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=800&h=600",
      gallery: [
        "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1586075010633-2442dc3d6334?auto=format&fit=crop&q=80&w=800&h=600",
      ],
      serviceSlug: "visiting-cards",
      category: "Business Essentials",
    },
    {
      title: "LED Glow Sign Board",
      description:
        "Custom LED backlit glow sign board for shop fronts. High visibility.",
      image:
        "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80&w=800&h=600",
      gallery: [
        "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800&h=600",
      ],
      serviceSlug: "glow-sign-boards",
      category: "Large Format",
    },
    {
      title: "Event Poster",
      description:
        "Vibrant posters for events and promotions. Fast delivery available.",
      image:
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800&h=600",
      gallery: [
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800&h=600",
      ],
      serviceSlug: "posters",
      category: "Large Format",
    },
    {
      title: "Exhibition Standee",
      description: "Professional roll-up standee for business events.",
      image:
        "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=800&h=600",
      gallery: [
        "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=800&h=600",
      ],
      serviceSlug: "standee",
      category: "Large Format",
    },
  ];

  const projectCategories = useMemo(
    () => ["All", ...new Set(featuredProjects.map((p) => p.category))],
    [],
  );

  const filteredProjects = useMemo(
    () =>
      featuredProjects.filter(
        (project) =>
          activeProjectCategory === "All" ||
          project.category === activeProjectCategory,
      ),
    [activeProjectCategory],
  );

  const categories = useMemo(
    () => ["All", ...new Set(services.map((s) => s.category))],
    [],
  );

  const filteredServices = useMemo(
    () =>
      getDynamicServices()
        .filter((service) => {
          const matchesCategory =
            activeCategory === "All" || service.category === activeCategory;
          const matchesSearch =
            service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
          if (sortBy === "alphabetical") {
            return a.title.localeCompare(b.title);
          } else {
            return (b.popularity || 0) - (a.popularity || 0);
          }
        }),
    [activeCategory, searchQuery, sortBy],
  );

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          const isShowTop = window.scrollY > 300;
          setShowScrollTop((prev) => (prev !== isShowTop ? isShowTop : prev));

          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = document.documentElement.clientHeight;
          const scrollTop = window.scrollY;
          const isShowDown = scrollHeight - scrollTop - clientHeight > 300;
          setShowScrollDown((prev) =>
            prev !== isShowDown ? isShowDown : prev,
          );

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openQuoteModal = (serviceName = "") => {
    setSelectedService(serviceName);
    setIsQuoteModalOpen(true);
  };

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Form Validation
    const form = e.target as HTMLFormElement;
    const nameInput = form.querySelector('input[type="text"]') as HTMLInputElement;
    const phoneInput = form.querySelector('input[type="tel"]') as HTMLInputElement;
    
    if (nameInput.value.length < 3) {
      setFormError("Name must be at least 3 characters long.");
      return;
    }
    
    if (!phoneInput.value.match(/^[0-9]{10}$/)) {
      setFormError("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsFormLoading(true);
    setFormError("");
    
    // Simulate API call
    setTimeout(() => {
      setIsFormLoading(false);
      // Simulate 10% chance of server error
      if (Math.random() > 0.9) {
        setFormError("Oops! Something went wrong on the server. Please try again.");
      } else {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setIsQuoteModalOpen(false); // Close Modal on Success
        }, 3000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">

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
                  <h3 className="text-2xl font-bold text-zinc-950">
                    Request a Quote
                  </h3>
                  <button
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-zinc-500" />
                  </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-950 transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-950 transition-all"
                      placeholder="Your Phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1">
                      Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-950 transition-all bg-white"
                    >
                      <option value="">Select a Service</option>
                      {services.map((s) => (
                        <option key={s.title} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-950 transition-all"
                      placeholder="Project details..."
                    ></textarea>
                  </div>
                  {formError && (
                    <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
                      {formError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isFormLoading}
                    className="w-full bg-zinc-950 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isFormLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Submit Request"
                    )}
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
        setIsChatOpen={setIsChatOpen}
      />

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-[90] w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:-translate-y-1 transition-all"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <ProjectGalleryModal
        project={selectedProject}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Header Wrapper */}
      <div className="sticky top-0 z-[100] w-full flex flex-col shadow-md transition-all duration-500 bg-slate-950">
        {/* Special Offer Banner */}
        <div className="bg-red-600 text-white h-10 flex items-center overflow-hidden block">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap flex gap-10 items-center"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <span
                key={i}
                className="text-sm font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {t("topOffer")}
                <Zap className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </span>
            ))}
          </motion.div>
        </div>
        {/* Limited Offer Banner */}
        <div className="bg-blue-600 text-white py-2.5 px-4 flex items-center justify-center text-center text-sm font-bold shadow-lg shadow-blue-500/10 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 whitespace-nowrap">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 shrink-0" />
              Limited Time Offer: 10% OFF Bulk Orders!
            </span>
            <span className="hidden md:inline text-white/50">|</span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-4 h-4 text-white shrink-0" />
              Same Day Delivery
            </span>
          </div>
        </div>

      <nav
        className={`w-full transition-all duration-500 ${scrolled || isMenuOpen ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl py-3 border-b border-white/5" : "bg-slate-950/80 backdrop-blur-md py-4 border-b border-white/10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Logo
                scrolled={scrolled || isMenuOpen}
                light={!scrolled && !isMenuOpen}
              />
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${language === "en" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${language === "hi" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
                >
                  हिं
                </button>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["home", "about", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-blue-400 ${scrolled ? 'text-slate-300' : 'text-white'}`}
                >
                  {t(item as any)}
                </a>
              ))}
              <button
                onClick={() => setIsChatOpen(true)}
                className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-blue-400 ${scrolled ? 'text-slate-300' : 'text-white'}`}
              >
                <Bot className="w-4 h-4" />
                {t("aiAssistant")}
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-blue-400 flex items-center gap-1 ${scrolled ? 'text-slate-300' : 'text-white'}`}
                >
                  {t("services" as any)}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                    {services.map((service) => (
                      <a
                        key={service.title}
                        href={`#services`}
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => openQuoteModal()}
                className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20"
              >
                {t("getQuote")}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 relative z-[80]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="text-slate-900 w-8 h-8" />
              ) : (
                <Menu
                  className={
                    scrolled ? "text-slate-900 w-8 h-8" : "text-white w-8 h-8"
                  }
                />
              )}
            </button>
          </div>
        </div>
      </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col pt-24 px-6 md:hidden"
          >
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
                Navigation Menu
              </div>
              
              {["Home", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-4xl font-black text-white py-4 border-b border-white/10 uppercase tracking-tighter flex justify-between items-center group hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                  <ChevronRight className="w-8 h-8 text-slate-700 group-hover:text-blue-400" />
                </a>
              ))}
              
              <button
                onClick={() => {
                  setIsChatOpen(true);
                  setIsMenuOpen(false);
                }}
                className="text-4xl font-black text-blue-500 flex py-4 border-b border-white/10 uppercase tracking-tighter justify-between items-center group hover:text-blue-400"
              >
                AI Assistant
                <ChevronRight className="w-8 h-8" />
              </button>

              <button
                onClick={() => {
                  openQuoteModal();
                  setIsMenuOpen(false);
                }}
                className="bg-blue-600 text-white w-full py-5 rounded-2xl text-xl font-bold mt-8 hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40"
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
        className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-12 pb-12 md:pt-0 md:pb-0"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <motion.div
              animate={{
                x: [0, 80, 0],
                y: [0, 40, 0],
                scale: [1, 1.1, 1],
                rotate: [0, 45, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ willChange: "transform" }}
              className="absolute -top-[15%] -left-[15%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-[80px]"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 80, 0],
                scale: [1, 1.2, 1],
                rotate: [0, -45, 0],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{ willChange: "transform" }}
              className="absolute top-[5%] -right-[15%] w-[70%] h-[70%] bg-cyan-500/20 rounded-full blur-[90px]"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <Zap className="w-3.5 h-3.5" />
                Best in Jehanabad
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <Truck className="w-3.5 h-3.5" />
                All Bihar & Jharkhand Delivery
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6 font-display uppercase">
              <span className="text-xl md:text-3xl lg:text-4xl font-black mb-4 tracking-widest uppercase drop-shadow-2xl block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-gradient-x">PRINT LIKE A BOSS</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Uttam Flex Printing
              </span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl text-slate-300 font-bold tracking-tight mt-4 block text-shadow-sm">
                Best Printing In Jehanabad
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-2xl mx-auto font-medium tracking-wide">
              Fast Delivery <span className="text-white/30 px-2">|</span> Low
              Price <span className="text-white/30 px-2">|</span> High Quality
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openQuoteModal()}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1"
              >
                {t("getQuote")}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                {t("whatsappUs")}
              </a>
              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1"
              >
                <Bot className="w-5 h-5" />
                Chat with AI
              </button>
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
              >
                <Calculator className="w-5 h-5 text-blue-400" />
                {t("priceEstimator")}
              </button>
            </div>
            
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-white/10 pt-8">
              {[
                { label: "Projects Completed", value: "10,000+" },
                { label: "Happy Clients", value: "5,000+" },
                { label: "Years Experience", value: "8+" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-blue-300/60 font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 right-0 z-10 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                      {t(stat.label.toLowerCase().replace(" ", "") as any)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section
        id="services"
        className="py-32 bg-slate-950 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-display font-bold text-white mb-6 tracking-tight">
              <span className="text-blue-500">Our</span> Services & Pricing
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t("servicesSubtitle")}
            </p>

            <div className="max-w-md mx-auto mt-12 mb-10 relative">
              <input
                type="text"
                placeholder="Search services by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border border-white/10 shadow-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all pl-12 bg-white/5 text-white placeholder:text-slate-500"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-2.5 rounded-full border border-slate-200 shadow-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white text-slate-900 text-sm font-bold cursor-pointer hover:bg-slate-50"
              >
                <option value="popularity" className="bg-white">
                  Sort by Popularity
                </option>
                <option value="alphabetical" className="bg-white">
                  Sort Alphabetically
                </option>
              </select>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {isLoadingData
                ? Array.from({ length: 6 }).map((_, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      key={`skeleton-${idx}`}
                      className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 p-8"
                    >
                      <div className="animate-pulse flex flex-col gap-4">
                        <div className="w-full h-48 bg-slate-200 rounded-2xl"></div>
                        <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
                        <div className="w-3/4 h-6 bg-slate-200 rounded"></div>
                        <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
                        <div className="w-full h-10 bg-slate-200 rounded-xl mt-4"></div>
                      </div>
                    </motion.div>
                  ))
                : filteredServices.map((service, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={service.title}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 group cursor-pointer transition-all hover:border-blue-500/50 hover:shadow-2xl"
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="h-56 overflow-hidden relative">
                    {service.onSale && (
                      <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                        <Percent className="w-3 h-3" />
                        {service.discount} {t("off")}
                      </div>
                    )}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <motion.div
                        className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/20"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                      >
                        {service.icon}
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex flex-col">
                        <span className="text-blue-600 font-black text-xl">
                          {service.price}
                        </span>
                        {service.onSale && (
                          <span className="text-slate-400 text-xs line-through">
                            {service.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                        Starting from
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuoteModal(service.title);
                        }}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group/btn"
                      >
                        <MessageSquare className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                        {t("orderNow")}
                      </button>
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuoteModal(service.title);
                          }}
                          className="bg-slate-100 text-slate-900 py-3 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all border border-slate-200"
                        >
                          {t("getQuote")}
                        </button>
                      </div>
                      <Link
                        to={`/services/${service.slug}`}
                        className="text-slate-400 font-bold text-xs flex items-center justify-center gap-2 hover:text-blue-600 transition-all mt-2"
                      >
                        {t("viewDetails")} <ChevronRight className="w-3 h-3" />
                      </Link>
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
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No services found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* AI Assistant Section */}
      <section
        id="ai-assistant"
        className="py-32 bg-slate-950 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-8 md:p-20 overflow-hidden relative shadow-2xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-bold mb-8 border border-white/20">
                  <Bot className="w-5 h-5" />
                  {t("aiPoweredSupport")}
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight leading-tight">
                  {t("chatWithOurAIAssistant")}
                </h2>
                <p className="text-blue-100 text-xl mb-12 leading-relaxed font-medium">
                  {t("aiAssistantDesc")}
                </p>
                <div className="flex flex-wrap gap-6">
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all flex items-center gap-3 shadow-xl shadow-blue-900/20 hover:-translate-y-1"
                  >
                    <MessageSquare className="w-6 h-6" />
                    {t("startChattingNow")}
                  </button>
                  <Link
                    to="/chat"
                    className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all flex items-center gap-3 border border-white/20 hover:-translate-y-1"
                  >
                    <Maximize2 className="w-6 h-6" />
                    {t("fullScreenMode")}
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-blue-400 blur-[100px] opacity-30 animate-pulse" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-10 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex justify-start">
                      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white text-lg max-w-[85%] border border-white/10">
                        Namaste! How can I help you today?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-white rounded-2xl p-4 text-blue-600 text-lg max-w-[85%] font-bold shadow-lg">
                        What is the price for flex printing?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white text-lg max-w-[85%] border border-white/10">
                        Flex printing starts at just ₹12 per sq. ft. for
                        high-quality durable material!
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
      <section
        id="about"
        className="py-32 bg-slate-950 text-white overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 -skew-y-6 translate-y-24" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] border-8 border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=800&h=1000"
                  alt="Workshop"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-inner border border-white/20">
                        <Users className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1">
                          {t("proprietor")}
                        </div>
                        <div className="text-xl font-bold text-white">
                          Mr. Ravi Kumar
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                {t("ourStory")}
              </div>
              <h2 className="text-5xl font-display font-bold text-white mb-8 tracking-tight leading-tight">
                {t("expertPrintingSolutions")}
              </h2>
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed mb-12">
                <p>{t("aboutDesc1")}</p>
                <p>{t("aboutDesc2")}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Fast turnaround times for urgent projects",
                  "High-resolution printing with vibrant colors",
                  "Durable materials for long-lasting results",
                  "Competitive pricing without compromising quality",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-blue-400/50 transition-colors group backdrop-blur-sm"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-slate-300 font-medium text-sm leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection />
      <MaterialGuideSection />
      <Testimonials />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-32 bg-slate-900 relative overflow-hidden text-white"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-1/2 -z-0 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-cyan-600/10 -skew-x-12 -translate-x-1/2 -z-0 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-display font-bold mb-6 tracking-tight text-white">
                Let's Start Your <span className="text-blue-500">Project</span>
              </h2>
              <p className="text-slate-400 mb-12 text-lg leading-relaxed max-w-md">
                {t("contactDesc")}
              </p>

              <div className="space-y-6">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Uttam+Flex+Printing+Near+Palan+G+Mall+Jehanabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-6 group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-400/50 shadow-sm hover:shadow-md transition-all backdrop-blur-md"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-all shrink-0 text-blue-400 group-hover:text-white">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-bold text-xl mb-1 text-white">
                      {t("location")}
                    </div>
                    <div className="text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
                      Near Palan G Mall, MI Realme Store
                      <br />
                      Jehanabad, Bihar 804408
                    </div>
                  </div>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <a
                    href="tel:+917481068602"
                    className="flex items-start gap-5 group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-400/50 shadow-sm hover:shadow-md transition-all backdrop-blur-md"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-all shrink-0 text-blue-400 group-hover:text-white">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1 text-white">
                        First Number
                      </div>
                      <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
                        +91 74810 68602
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+917488574905"
                    className="flex items-start gap-5 group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-400/50 shadow-sm hover:shadow-md transition-all backdrop-blur-md"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-all shrink-0 text-blue-400 group-hover:text-white">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1 text-white">
                        Secondary Number
                      </div>
                      <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
                        +91 74885 74905
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+919263722075"
                    className="flex items-start gap-5 group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-400/50 shadow-sm hover:shadow-md transition-all backdrop-blur-md"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-all shrink-0 text-blue-400 group-hover:text-white">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1 text-white">
                        Third Number
                      </div>
                      <div className="text-slate-400 group-hover:text-slate-200 transition-colors">
                        +91 92637 22075
                      </div>
                    </div>
                  </a>
                </div>

                <a
                  href={`https://wa.me/917481068602`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-6 rounded-3xl font-bold text-xl hover:bg-[#128C7E] transition-all shadow-xl shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-1 active:scale-95"
                >
                  <MessageCircle className="w-7 h-7" />
                  {t("chatOnWhatsApp")}
                </a>

                {/* Google Map Embed */}
                <div className="mt-8 rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-72 relative group">
                  <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14406.84074246824!2d84.9922262!3d25.215456!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2d7f877777777%3A0x7777777777777777!2sUttam%20Flex%20Printing!5e0!3m2!1sen!2sin!4v1712200000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="filter grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 backdrop-blur-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      {t("fullName")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 rounded-2xl border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/5 hover:bg-white/10 text-white placeholder-white/30"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      {t("emailAddress")}
                    </label>
                    <input
                      type="email"
                      className="w-full px-5 py-4 rounded-2xl border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/5 hover:bg-white/10 text-white placeholder-white/30"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    {t("serviceNeeded")}
                  </label>
                  <select className="w-full px-5 py-4 rounded-2xl border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/5 hover:bg-white/10 text-white appearance-none">
                    <option className="bg-slate-900 text-white">Flex Printing</option>
                    <option className="bg-slate-900 text-white">Vinyl Printing</option>
                    <option className="bg-slate-900 text-white">Banner Design</option>
                    <option className="bg-slate-900 text-white">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    {t("message")}
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-5 py-4 rounded-2xl border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/5 hover:bg-white/10 text-white resize-none placeholder-white/30"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:-translate-y-1"
                >
                  {t("sendMessage")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-24 relative overflow-hidden border-t border-white/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-8 text-white">
                <Logo scrolled={false} light={true} />
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {t("footerDesc")}
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 text-white uppercase tracking-widest">
                {t("quickLinks")}
              </h4>
              <ul className="space-y-5 text-slate-400 text-lg">
                <li>
                  <a
                    href="#home"
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />{" "}
                    {t("home")}
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />{" "}
                    {t("services")}
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />{" "}
                    {t("aiAssistant")}
                  </button>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />{" "}
                    {t("about")}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />{" "}
                    {t("contact")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 text-white uppercase tracking-widest">
                Services
              </h4>
              <ul className="space-y-5 text-slate-400 text-lg">
                <li className="flex items-center gap-2 group">
                  <a href="#services" className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />{" "}
                    Flex & Vinyl Printing
                  </a>
                </li>
                <li className="flex items-center gap-2 group">
                  <a href="#services" className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />{" "}
                    ID & Visiting Cards
                  </a>
                </li>
                <li className="flex items-center gap-2 group">
                  <a href="#services" className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />{" "}
                    Banners & Posters
                  </a>
                </li>
                <li className="flex items-center gap-2 group">
                  <a href="#services" className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />{" "}
                    T-shirt & Glow Signs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 text-white uppercase tracking-widest">
                {t("workingHours")}
              </h4>
              <ul className="space-y-6 text-slate-400 text-lg">
                <li className="flex flex-col gap-1">
                  <span className="text-blue-400 font-bold text-sm uppercase tracking-wider">
                    {t("monSat")}
                  </span>
                  <span className="text-white font-medium">
                    9:00 AM - 9:00 PM
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-blue-400 font-bold text-sm uppercase tracking-wider">
                    {t("sunday")}
                  </span>
                  <span className="text-white font-medium">
                    10:00 AM - 2:00 PM
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p>© 2026 Uttam Flex Printing. All rights reserved.</p>
              <p className="text-slate-400">
                Proprietor:{" "}
                <span className="text-white font-bold">Mr. Ravi Kumar</span>
              </p>
              <p className="text-slate-400 mt-3 text-base tracking-wide">
                Made with <span className="animate-pulse inline-block text-red-500 mx-1">❤️</span> by <span className="text-blue-400 font-bold tracking-tight">Ayush</span>
              </p>
            </div>
            <div className="flex gap-10">
              <a
                href="javascript:void(0)"
                className="hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="javascript:void(0)"
                className="hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
        <div className="fixed bottom-6 right-6 z-[100]">
          <FloatingHelpButton onOpenChat={() => setIsChatOpen(true)} />
        </div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const t = (key: keyof typeof translations.en) =>
    translations[language][key] || key;

  useEffect(() => {
    const day = new Date().getDate();
    const theme = themes[day % themes.length];
    document.documentElement.style.setProperty(
      "--primary-color",
      theme.primaryColor,
    );
    document.documentElement.style.setProperty(
      "--font-family",
      theme.fontFamily,
    );
  }, []);

  return (
    <div
      className="overflow-x-hidden w-full min-h-screen"
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </Router>
    </div>
  );
}
