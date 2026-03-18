import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
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
  Facebook,
  Instagram,
  Twitter,
  Award,
  Zap,
  Users,
  Contact,
  Layout,
  FileText,
  Monitor,
  CreditCard,
  IdCard,
  Shirt,
  Sun,
  Tent,
  Layers,
  Coffee,
  ArrowLeft
} from 'lucide-react';

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
        Your Solutions, Our Moto.
      </span>
      <span className={`text-[7px] font-bold tracking-wider mt-0.5 ${(scrolled || !light) ? 'text-indigo-600' : 'text-indigo-400'}`}>
        www.uttamflexprinting.com
      </span>
    </div>
  </div>
);

const services = [
  {
    slug: "flex-printing",
    title: "Flex Printing",
    description: "High-quality large format flex printing for billboards and shop fronts.",
    longDescription: "Our Flex Printing service offers durable and vibrant solutions for all your large-scale advertising needs. We use high-grade PVC flex material that is weather-resistant and perfect for outdoor use. Whether it's for shop banners, event backdrops, or massive billboards, our state-of-the-art printing technology ensures crisp images and true-to-life colors that grab attention from a distance.",
    icon: <Printer className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Large Format"
  },
  {
    slug: "vinyl-printing",
    title: "Vinyl Printing",
    description: "Premium vinyl printing for windows, walls, and vehicle branding.",
    longDescription: "Vinyl printing is the perfect choice for high-resolution graphics and long-lasting applications. We offer various types of vinyl, including glossy, matte, and transparent options. Our vinyl is ideal for wall decals, window displays, and vehicle wraps. With precision cutting and high-quality adhesive, our vinyl prints are easy to apply and resistant to fading, ensuring your brand looks professional for years.",
    icon: <ImageIcon className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Large Format"
  },
  {
    slug: "visiting-cards",
    title: "Visiting Cards",
    description: "Professional business cards with premium finishes and textures.",
    longDescription: "Make a lasting first impression with our premium business card printing. We offer a wide range of paper stocks, from standard cardstock to luxury textured papers. Choose from various finishes like matte lamination, spot UV, or gold foiling to add that extra touch of sophistication. Our design team can help you create a card that perfectly represents your professional identity.",
    icon: <Contact className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Business Essentials"
  },
  {
    slug: "banners-posters",
    title: "Banners & Posters",
    description: "Eye-catching large scale banners and posters for all your events.",
    longDescription: "From small indoor posters to massive outdoor banners, we provide high-impact visual solutions for any occasion. Our posters are printed on high-quality photo paper with rich colors, while our banners are made from reinforced vinyl with grommets for easy hanging. Perfect for sales promotions, movie releases, or educational displays, our prints are designed to stand out.",
    icon: <Flag className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Large Format"
  },
  {
    slug: "standees",
    title: "Standees",
    description: "Portable and durable roll-up standees for exhibitions and shops.",
    longDescription: "Our roll-up standees are the ultimate portable marketing tool. Lightweight and easy to set up, they come with a durable aluminum base and a high-quality printed graphic. Ideal for trade shows, retail stores, and corporate events, our standees provide a professional backdrop that can be transported and reused multiple times.",
    icon: <Monitor className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Large Format"
  },
  {
    slug: "invitation-cards",
    title: "Invitation Cards",
    description: "Custom designed cards for weddings, parties, and corporate events.",
    longDescription: "Celebrate your special moments with beautifully crafted invitation cards. We specialize in custom designs for weddings, birthdays, and corporate galas. Our printing process includes high-quality cardstock and specialized techniques like embossing and laser cutting. Let us help you set the tone for your event with an invitation that your guests will cherish.",
    icon: <CreditCard className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Promotional Materials"
  },
  {
    slug: "id-cards",
    title: "ID Cards",
    description: "High-quality PVC ID cards for schools, colleges, and corporate offices.",
    longDescription: "We provide secure and professional PVC ID card printing for organizations of all sizes. Our cards are durable, tamper-resistant, and can include features like barcodes, QR codes, and magnetic strips. We also offer a variety of accessories like lanyards and card holders to complete your identification system.",
    icon: <IdCard className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Business Essentials"
  },
  {
    slug: "tshirt-printing",
    title: "T-shirt Printing",
    description: "Customized T-shirt printing for events, teams, and branding.",
    longDescription: "Get your brand noticed with our custom T-shirt printing services. We use various methods like screen printing, heat transfer, and sublimation to ensure high-quality, long-lasting prints on a variety of fabrics. Whether it's for promotional giveaways, sports teams, or corporate uniforms, we deliver comfortable and stylish apparel.",
    icon: <Shirt className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Promotional Materials"
  },
  {
    slug: "glow-sign-boards",
    title: "Glow Sign Boards",
    description: "Backlit glow sign boards for high visibility during day and night.",
    longDescription: "Illuminate your brand with our premium glow sign boards. These backlit displays are designed for maximum visibility, making your business stand out even in the dark. We use high-quality LED lighting and durable translucent materials to create signs that are energy-efficient and long-lasting.",
    icon: <Sun className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Large Format"
  },
  {
    slug: "canopy",
    title: "Canopy",
    description: "Branded promotional canopies for outdoor marketing and events.",
    longDescription: "Our promotional canopies are perfect for outdoor activations and events. They provide shade and protection while serving as a massive branding surface. Easy to assemble and dismantle, our canopies are made from high-quality, water-resistant fabric and a sturdy frame, ensuring your brand remains visible in any weather.",
    icon: <Tent className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Large Format"
  },
  {
    slug: "sunboard-printing",
    title: "Sunboard Printing",
    description: "Direct printing on durable sunboards for indoor and outdoor displays.",
    longDescription: "Sunboard printing is a versatile solution for indoor signage and displays. We print directly onto high-density foam boards, resulting in a lightweight yet rigid product. Perfect for menu boards, directional signs, and exhibition panels, our sunboard prints are durable and offer a professional finish.",
    icon: <Layers className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Large Format"
  },
  {
    slug: "mug-printing",
    title: "Mug Printing",
    description: "Personalized ceramic mugs for gifts and corporate branding.",
    longDescription: "Our custom mug printing is a popular choice for personalized gifts and corporate branding. We use high-quality sublimation printing to ensure vibrant colors that are dishwasher and microwave safe. Choose from standard white mugs, magic mugs, or travel tumblers to showcase your brand or special message.",
    icon: <Coffee className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800&h=600",
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

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Large Format", "Promotional Materials", "Business Essentials"];
  
  const filteredServices = activeCategory === "All" 
    ? services 
    : services.filter(service => service.category === activeCategory);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Request a Quote</h3>
                  <button onClick={() => setIsQuoteModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-slate-500" />
                  </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                    <input type="text" required className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                    <input type="tel" required className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Your Phone" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Service</label>
                    <select 
                      value={selectedService} 
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
                    >
                      <option value="">Select a Service</option>
                      {services.map(s => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                    <textarea rows={3} className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Project details..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                    Submit Request
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Logo scrolled={scrolled} light={!scrolled} />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => openQuoteModal()}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Get a Quote
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl font-bold text-slate-900"
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
                className="bg-indigo-600 text-white w-full py-4 rounded-xl text-lg font-bold"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-slate-900 pt-24 pb-12 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="Printing Background" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
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
              Bringing Your <span className="text-indigo-500">Vision</span> to Large Format Life.
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Uttam Flex Printing delivers high-quality, durable, and vibrant printing solutions for all your business needs. From massive billboards to intricate vinyl decals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => openQuoteModal()}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group"
              >
                Get a Quote
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#services" className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
                Our Services
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 right-0 z-10 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Services</h2>
            <p className="text-slate-600 mb-10">We offer a wide range of printing services tailored to meet your specific requirements, ensuring the highest quality output every time.</p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
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
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 1.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group cursor-pointer transition-shadow hover:shadow-xl"
                >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link to={`/services/${service.slug}`} className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuoteModal(service.title);
                      }}
                      className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all"
                    >
                      Request Custom Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
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
              <h3 className="text-xl font-bold text-slate-900 mb-4">Fast Turnaround</h3>
              <p className="text-slate-600">We understand deadlines. Our efficient workflow ensures your projects are delivered on time, every time.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Premium Quality</h3>
              <p className="text-slate-600">Using state-of-the-art machinery and high-grade materials, we guarantee vibrant and long-lasting prints.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Expert Support</h3>
              <p className="text-slate-600">Our team of design and printing experts is always ready to help you choose the best options for your needs.</p>
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
                  alt="Our Workshop" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-600 rounded-3xl -z-0 hidden md:block" />
              <div className="absolute -top-8 -left-8 w-32 h-32 border-8 border-indigo-100 rounded-3xl -z-0 hidden md:block" />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Expert Printing Solutions Since 2010</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Uttam Flex Printing has been a leader in the printing industry in Jehanabad for over 15 years. We specialize in large format printing, promotional materials, and business essentials. Our mission is to provide high-quality, durable, and vibrant printing solutions that help your business stand out.
              </p>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                We use state-of-the-art machinery and premium materials to ensure every project meets the highest standards. Whether you need a massive billboard or a set of professional visiting cards, we've got you covered.
              </p>
              
              <div className="space-y-4 mb-10">
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

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
            <p className="text-slate-600">We take pride in our work and our customers' satisfaction is our top priority.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Verma", role: "Event Manager", text: "Uttam Flex provided the best quality banners for our corporate event. The colors were vibrant and the delivery was on time." },
              { name: "Priya Singh", role: "Shop Owner", text: "The vinyl printing for my shop front is amazing. It has been 2 years and the colors haven't faded at all. Highly recommended!" },
              { name: "Amit Kumar", role: "Marketing Head", text: "Professional service and great attention to detail. They handled our large-scale billboard project with ease." }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{testimonial.name}</div>
                    <div className="text-slate-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-700 skew-x-12 translate-x-1/2 -z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">Let's Start Your Project</h2>
              <p className="text-indigo-100 mb-12 text-lg">
                Have a question or ready to get started? Reach out to us today and our team will get back to you within 24 hours.
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
                    <div className="font-bold text-lg">Our Location</div>
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
                      <div className="font-bold text-lg">Call Us</div>
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
                    <div className="font-bold text-lg">Email Us</div>
                    <div className="text-indigo-100 group-hover:text-white transition-colors">uttamprinting.10@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Service Needed</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all bg-white">
                    <option>Flex Printing</option>
                    <option>Vinyl Printing</option>
                    <option>Banner Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all" placeholder="Tell us about your project..."></textarea>
                </div>
                <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  Send Message
                </button>
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
                Your trusted partner for high-quality large format printing solutions. Quality you can see, service you can trust.
              </p>
              <div className="text-indigo-400 font-bold text-sm mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                www.uttamflexprinting.com
              </div>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Flex & Vinyl Printing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ID & Visiting Cards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Banners & Posters</a></li>
                <li><a href="#" className="hover:text-white transition-colors">T-shirt & Glow Signs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Working Hours</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex justify-between">
                  <span>Mon - Sat:</span>
                  <span className="text-white">9:00 AM - 9:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-white">10:00 AM - 2:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p>© 2026 Uttam Flex Printing. All rights reserved.</p>
              <p className="text-slate-400">made with by ❤️ Ayush</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </Router>
  );
}
