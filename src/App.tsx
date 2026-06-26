import React, { useState } from 'react';
import { 
  Hammer, 
  Phone, 
  Mail, 
  ChevronRight, 
  Star, 
  CheckCircle, 
  Menu,
  X
} from 'lucide-react';
import TrustpilotWidget from './components/TrustpilotWidget';
import ContactForm from './components/ContactForm';

const HERO_IMAGE_PATH = "/src/assets/images/hero_construction_1782508807210.jpg";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [view, setView] = useState<'home' | 'reviews'>('home');

  const navigateToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'reviews') {
      setView('reviews');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 text-gray-900 flex flex-col font-sans">
      {/* 1. TOP UTILITY STRIP */}
      <div className="bg-brand-950 text-white text-xs py-2.5 px-4 sm:px-6 md:px-8 border-b border-brand-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1 text-[11px] text-brand-300 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00b67a] inline-block animate-pulse"></span>
              VOSE BUILD LTD
            </span>
            <span>Reg: 16669336</span>
            <span className="hidden md:inline">vosebuildltd@gmail.com</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-brand-200">
            <span>Direct Contacts:</span>
            <div className="flex items-center gap-3">
              <a href="tel:+447377419674" className="hover:text-white font-bold transition flex items-center gap-1">
                <Phone className="w-3 h-3 text-brand-400" /> Call
              </a>
              <span className="text-brand-800">|</span>
              <a 
                href="https://wa.me/447377419674" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-green-300 font-bold transition flex items-center gap-1 text-green-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVBAR */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-brand-100 z-40 transition-all duration-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            onClick={() => navigateToSection('hero')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="p-2.5 bg-brand-950 text-brand-400 rounded-xl group-hover:bg-brand-900 transition duration-150 shadow-xs">
              <Hammer className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="font-display font-black text-lg md:text-xl text-brand-950 tracking-tight group-hover:text-brand-800 transition">
                VOSE BUILD LTD
              </h1>
              <p className="text-[10px] font-mono text-gray-400 font-bold tracking-widest uppercase leading-none mt-0.5">
                London Developers
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <button onClick={() => navigateToSection('reviews')} className={`transition cursor-pointer ${view === 'reviews' ? 'text-brand-900 font-bold underline decoration-[#00b67a] decoration-2 underline-offset-4' : 'hover:text-brand-900'}`}>Reviews</button>
            <button onClick={() => navigateToSection('contact')} className="hover:text-brand-900 transition cursor-pointer">Contact Us</button>
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => navigateToSection('contact')}
              className="px-5 py-2.5 bg-brand-950 text-white hover:bg-brand-800 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-150 cursor-pointer"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-gray-500 hover:text-brand-950 transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-brand-100 p-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
              <button onClick={() => navigateToSection('reviews')} className={`text-left py-2 transition ${view === 'reviews' ? 'text-brand-900 font-bold' : ''}`}>Reviews</button>
              <button onClick={() => navigateToSection('contact')} className="text-left py-2 hover:text-brand-950 transition">Contact Us</button>
            </div>
            <button 
              onClick={() => navigateToSection('contact')}
              className="w-full py-3 bg-brand-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
            >
              Request Quote
            </button>
          </div>
        )}
      </header>

      {/* 3. CONDITIONAL VIEWS SYSTEM */}
      {view === 'reviews' ? (
        <main className="flex-grow py-12 bg-brand-50 animate-in fade-in duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <button onClick={() => navigateToSection('hero')} className="hover:text-brand-950 font-bold uppercase tracking-wider transition">Home</button>
              <span>/</span>
              <span className="text-gray-400 uppercase tracking-wider">Verified Reviews</span>
            </div>

            {/* Back Button and Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-200 pb-6">
              <div>
                <h2 className="font-display font-black text-3xl text-gray-900 tracking-tight">
                  Verified Trustpilot Board
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Read genuine feedback from our clients, view official registration details, or submit your own review.
                </p>
              </div>
              <button 
                onClick={() => navigateToSection('hero')}
                className="self-start sm:self-center px-4 py-2 bg-white border border-brand-200 hover:bg-brand-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-2xs cursor-pointer shrink-0"
              >
                ← Back to Home
              </button>
            </div>

            {/* Main Widget */}
            <div className="bg-white/50 backdrop-blur-md rounded-2xl">
              <TrustpilotWidget />
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-grow">
          {/* 3. HERO SHOWCASE SECTION */}
          <section id="hero" className="relative bg-brand-950 text-white overflow-hidden py-16 md:py-24 lg:py-28">
            {/* Ambient image background */}
            <div className="absolute inset-0 z-0 opacity-20">
              <img 
                src={HERO_IMAGE_PATH} 
                alt="Vose Build Project Background" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter blur-xs scale-102" 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-transparent z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6 md:space-y-8">
                <button 
                  onClick={() => navigateToSection('reviews')}
                  className="inline-flex items-center gap-2 bg-brand-900/60 hover:bg-brand-900 backdrop-blur-md border border-brand-800 rounded-full py-1.5 px-3.5 text-xs text-brand-300 font-mono transition text-left"
                >
                  <Star className="w-3.5 h-3.5 text-[#00b67a] fill-[#00b67a]" />
                  <span>4.9/5 Excellent Rating on Trustpilot (Click to View)</span>
                </button>

                <div className="space-y-4">
                  <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
                    High-End Building & Refurbishments.
                  </h1>
                  <p className="text-brand-200 text-base md:text-lg max-w-2xl font-light leading-relaxed">
                    VOSE BUILD LTD delivers architectural extensions, dormer loft conversions, and premium carpentry finishes in London. Built safely, priced transparently, and backed by authentic Trustpilot reviews.
                  </p>
                </div>

                {/* Quick Specs List */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-brand-900">
                  <div>
                    <p className="text-[10px] font-mono text-brand-400 uppercase tracking-widest">Licensed Builder</p>
                    <p className="text-sm font-bold mt-0.5">Reg 16669336</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-brand-400 uppercase tracking-widest">Area Coverage</p>
                    <p className="text-sm font-bold mt-0.5">Greater London</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-brand-400 uppercase tracking-widest">Pricing Policy</p>
                    <p className="text-sm font-bold mt-0.5">Fixed Estimates</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-brand-400 uppercase tracking-widest">Owner Response</p>
                    <p className="text-sm font-bold mt-0.5">Under 24 Hours</p>
                  </div>
                </div>

                {/* Interactive CTAs */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => navigateToSection('contact')}
                    className="flex items-center gap-2 px-6 py-3.5 bg-white text-brand-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-brand-100 transition shadow-md cursor-pointer"
                  >
                    Book Site Survey
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hero Right Banner Card */}
              <div className="lg:col-span-5 relative">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
                  {/* Trustpilot Overlay Banner */}
                  <div 
                    onClick={() => navigateToSection('reviews')}
                    className="flex items-center justify-between border-b border-white/10 pb-4 cursor-pointer hover:opacity-80 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-white text-base">Trustpilot Score</span>
                      <span className="text-[10px] font-mono bg-[#00b67a] text-white px-1.5 py-0.5 rounded font-bold">
                        4.9
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className="bg-[#00b67a] p-[1px] rounded-xs flex items-center">
                          <Star className="w-2.5 h-2.5 fill-white text-transparent" />
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Company Guarantees & Accreditations */}
                  <div className="space-y-3.5 text-xs text-brand-200">
                    <p className="font-mono text-[10px] text-brand-400 uppercase tracking-widest">Our Guarantees</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#00b67a] rounded-full shrink-0"></span>
                        <span>Full Building Regulations Compliance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#00b67a] rounded-full shrink-0"></span>
                        <span>Architectural Structural Calculations Included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#00b67a] rounded-full shrink-0"></span>
                        <span>Fully Insured & Registered (No. 16669336)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Company Info Box */}
                  <div className="pt-4 border-t border-white/10 text-[11px] text-brand-300 space-y-1">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full inline-block"></span>
                      Company: <strong>VOSE BUILD LTD</strong>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full inline-block"></span>
                      Reg Office: <strong>Prospect House, London</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. THE TRUSTPILOT BAR */}
          <div className="bg-white border-y border-brand-150 py-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <button 
                onClick={() => navigateToSection('reviews')}
                className="flex items-center gap-3 text-left hover:opacity-85 transition"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold">Verified on</span>
                <span className="font-display font-extrabold text-lg text-gray-900 tracking-tight flex items-center gap-1.5">
                  Trustpilot
                  <div className="bg-[#00b67a] p-[2px] rounded-xs flex items-center">
                    <Star className="w-3.5 h-3.5 fill-white text-transparent" />
                  </div>
                </span>
              </button>
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-600" /> Professional Steel Span installations</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#00b67a]" /> Tidy Builders & Cleanup</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-600" /> Direct Communication (Nemo)</span>
              </div>
            </div>
          </div>

          {/* 5. CONTACT & INQUIRY PORTAL */}
          <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </section>
        </main>
      )}

      {/* 7. DETAILED REGISTERED COMPANY FOOTER */}
      <footer className="bg-brand-950 text-white border-t border-brand-900 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-brand-900 pb-12 mb-12">
          {/* Col 1: Corporate Details */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-brand-900 text-brand-400 rounded-xl">
                <Hammer className="w-5.5 h-5.5" />
              </div>
              <div>
                <h4 className="font-display font-black text-lg text-white tracking-tight">
                  VOSE BUILD LTD
                </h4>
                <p className="text-[10px] font-mono text-brand-400 font-bold tracking-widest uppercase">
                  London Developers
                </p>
              </div>
            </div>
            
            <p className="text-xs text-brand-300 max-w-sm leading-relaxed font-light">
              Providing premium home extensions, dormer loft layouts, structural partition removal, and bespoke carpentry fitouts across Northwest London. Regulated by building guidelines and client expectations.
            </p>

            <div className="text-[11px] text-brand-400 space-y-1">
              <p>Registered in England & Wales with Companies House</p>
              <p>Company Registration Number: <strong className="text-white font-mono">16669336</strong></p>
              <p>Office Address: <span className="text-brand-300">Flat 13 Prospect House, North Circular Road, London, NW10 7GH</span></p>
            </div>
          </div>

          {/* Col 2: Services List */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-xs uppercase tracking-widest text-brand-400">
              Our Specialities
            </h5>
            <ul className="text-xs text-brand-300 space-y-2 font-mono">
              <li><button onClick={() => navigateToSection('contact')} className="hover:text-white transition">Home Extensions</button></li>
              <li><button onClick={() => navigateToSection('contact')} className="hover:text-white transition">Dormer Loft Conversions</button></li>
              <li><button onClick={() => navigateToSection('contact')} className="hover:text-white transition">Structural Beam Layouts</button></li>
              <li><button onClick={() => navigateToSection('contact')} className="hover:text-white transition">Bespoke Fitouts & Joinery</button></li>
              <li><button onClick={() => navigateToSection('contact')} className="hover:text-white transition">Full Property Refurbs</button></li>
            </ul>
          </div>

          {/* Col 3: Direct Inquiry */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-xs uppercase tracking-widest text-brand-400">
              Direct Contact
            </h5>
            <ul className="text-xs text-brand-300 space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+447377419674" className="hover:text-white transition font-mono">+44 7377 419674</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 text-green-400 font-mono font-bold shrink-0 flex items-center justify-center text-[10px] border border-green-500/30 rounded-full bg-green-500/10">W</span>
                <a 
                  href="https://wa.me/447377419674" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-400 hover:text-green-300 transition font-mono"
                >
                  wa.me/447377419674
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:vosebuildltd@gmail.com" className="hover:text-white transition font-mono break-all">vosebuildltd@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 pt-2 border-t border-brand-900">
                <span className="w-2 h-2 rounded-full bg-[#00b67a] shrink-0"></span>
                <span className="font-mono text-[10px] text-[#00b67a]">Nemo (Director)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Base Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center gap-4 text-[11px] text-brand-400 font-mono">
          <button 
            onClick={() => navigateToSection('reviews')} 
            className="hover:text-white transition flex items-center gap-1.5"
          >
            Trustpilot Verified <Star className="w-3 h-3 fill-[#00b67a] text-transparent" />
          </button>
        </div>
      </footer>

      {/* Persistent Floating WhatsApp widget */}
      <a 
        href="https://wa.me/447377419674" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group font-semibold text-xs md:text-sm"
        title="Chat with Nemo on WhatsApp"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span className="font-mono font-bold">WhatsApp Chat</span>
      </a>
    </div>
  );
}
