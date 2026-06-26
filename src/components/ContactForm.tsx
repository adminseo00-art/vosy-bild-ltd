import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Shield, Check, Send, Sparkles, Clock, Trash2 } from 'lucide-react';
import { Inquiry } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [serviceType, setServiceType] = useState('Home Extension (Rear/Side)');
  const [message, setMessage] = useState('');
  
  // Storage for submitted inquiries to show live user tracking
  const [submittedInquiries, setSubmittedInquiries] = useState<Inquiry[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load inquiries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('vose_build_inquiries');
    if (stored) {
      try {
        setSubmittedInquiries(JSON.parse(stored));
      } catch (e) {
        setSubmittedInquiries([]);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) return;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      phone,
      address,
      serviceType,
      message,
      status: 'Received',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newInquiry, ...submittedInquiries];
    setSubmittedInquiries(updated);
    localStorage.setItem('vose_build_inquiries', JSON.stringify(updated));

    // Construct WhatsApp pre-filled message
    const whatsappMessage = `*New Build Inquiry - Vose Build Ltd*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Site/Build Address:* ${address}\n` +
      `*Service Required:* ${serviceType}\n` +
      `*Requirements/Details:* ${message}`;

    // Open WhatsApp URL in a new window/tab
    const whatsappUrl = `https://wa.me/447377419674?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsSuccess(true);
    
    // Clear form
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setMessage('');

    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = submittedInquiries.filter(inq => inq.id !== id);
    setSubmittedInquiries(updated);
    localStorage.setItem('vose_build_inquiries', JSON.stringify(updated));
  };

  return (
    <div id="contact-portal" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Left Column: Direct Office Contact Details (4 cols) */}
      <div className="lg:col-span-5 space-y-6 lg:space-y-8">
        <div>
          <h3 className="font-display font-extrabold text-brand-950 text-2xl tracking-tight mb-2">
            Let's Discuss Your Build
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Ready to design your next loft extension, kitchen layout, or structural refurb? Request a site visit or send us a general inquiry. Our director, Nemo, will respond within 24 hours.
          </p>
        </div>

        {/* Contact list cards */}
        <div className="space-y-4">
          {/* Phone */}
          <a 
            href="tel:+447377419674"
            className="flex items-start gap-4 p-5 bg-white border border-brand-200 rounded-2xl hover:border-brand-400 hover:shadow-2xs transition-all duration-150 group"
          >
            <div className="p-3 bg-brand-100 text-brand-800 rounded-xl group-hover:bg-brand-900 group-hover:text-white transition duration-150">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 font-mono">
                Call Direct (Nemo)
              </p>
              <p className="text-base font-bold text-gray-900 mt-0.5">
                +44 7377 419674
              </p>
              <p className="text-xs text-gray-500 mt-1">Available Mon-Sat (8am - 6pm)</p>
            </div>
          </a>

          {/* WhatsApp Direct */}
          <a 
            href="https://wa.me/447377419674"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-5 bg-green-50/40 border border-green-200/80 rounded-2xl hover:border-green-400 hover:shadow-2xs transition-all duration-150 group"
          >
            <div className="p-3 bg-green-100/80 text-green-700 rounded-xl group-hover:bg-green-600 group-hover:text-white transition duration-150 font-bold font-mono text-center text-sm w-11 h-11 flex items-center justify-center shrink-0">
              WA
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[10px] uppercase font-bold tracking-widest text-green-700 font-mono">
                  Direct WhatsApp Chat
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
              </div>
              <p className="text-base font-bold text-green-800 mt-0.5 font-mono">
                wa.me/447377419674
              </p>
              <p className="text-xs text-green-600 mt-1">Send floorplans, site photos & layouts</p>
            </div>
          </a>

          {/* Email */}
          <a 
            href="mailto:vosebuildltd@gmail.com"
            className="flex items-start gap-4 p-5 bg-white border border-brand-200 rounded-2xl hover:border-brand-400 hover:shadow-2xs transition-all duration-150 group"
          >
            <div className="p-3 bg-brand-100 text-brand-800 rounded-xl group-hover:bg-brand-900 group-hover:text-white transition duration-150">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 font-mono">
                Email Address
              </p>
              <p className="text-base font-bold text-gray-900 mt-0.5 break-all">
                vosebuildltd@gmail.com
              </p>
              <p className="text-xs text-gray-500 mt-1">Direct inquiries & architectural plans</p>
            </div>
          </a>

          {/* Location */}
          <div className="flex items-start gap-4 p-5 bg-white border border-brand-200 rounded-2xl">
            <div className="p-3 bg-brand-100 text-brand-800 rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 font-mono">
                Registered Office Address
              </p>
              <p className="text-xs font-semibold text-gray-900 mt-1 leading-relaxed">
                VOSE BUILD LTD<br />
                Flat 13 Prospect House, North Circular Road,<br />
                London, England, NW10 7GH
              </p>
            </div>
          </div>
        </div>

        {/* Credentials badge */}
        <div className="bg-brand-100 rounded-2xl p-5 border border-brand-200/60 text-xs text-brand-900 flex items-start gap-3.5">
          <Shield className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Fully Certified & Compliant Business</p>
            <p className="text-brand-800 leading-relaxed">
              <strong>VOSE BUILD LTD</strong> is officially registered in England & Wales with Companies House. 
              <br />
              <span className="font-mono bg-white/70 px-1.5 py-0.5 rounded text-[10px] font-bold inline-block mt-1">
                Company Number: 16669336
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Form (7 cols) */}
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-white border border-brand-200 rounded-2xl p-6 md:p-8 shadow-sm relative">
          
          {/* Success Overlay Banner */}
          {isSuccess && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-10 flex flex-col justify-center items-center p-6 text-center animate-in fade-in duration-200">
              <div className="w-16 h-16 bg-green-100 text-[#00b67a] rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="font-display font-extrabold text-2xl text-gray-900 mb-1">
                Sent to WhatsApp!
              </h4>
              <p className="text-sm text-gray-600 max-w-md leading-relaxed mb-4">
                Your structured inquiry has been compiled and opened in WhatsApp so you can send it directly to Nemo. It is also logged in your local history below.
              </p>
              <p className="text-xs font-mono text-gray-400">
                Nemo at Vose Build Ltd will get back to you promptly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-6 px-5 py-2.5 bg-brand-900 text-white rounded-xl text-xs font-bold hover:bg-brand-800 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          )}

          {/* Form Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-100 pb-5 mb-6">
            <h4 className="font-display font-bold text-gray-900 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              Inquiry Form
            </h4>
          </div>

          {/* Actual Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Foster"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +44 7911 123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. liam@example.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Build Site Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NW10 London House"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Service Required
              </label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-4 py-2.5 border border-brand-200 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-500"
              >
                <option>Home Extension (Rear/Side)</option>
                <option>Dormer Loft Conversion</option>
                <option>Full Property Refurbishment</option>
                <option>Structural Steelwork & Openings</option>
                <option>Bespoke Carpentry & Joinery</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Inquiry Details & Requirements
              </label>
              <textarea
                rows={5}
                required
                placeholder="Describe your property. Do you have architectural drawings ready? What are your key milestones or layout objectives?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 border border-brand-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-900 hover:bg-brand-800 text-white text-sm font-bold rounded-xl transition duration-150 shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Submit Inquiry
            </button>
          </form>
        </div>

        {/* Sent Inquiries Feed (LocalStorage tracker so it's a fully functional app) */}
        {submittedInquiries.length > 0 && (
          <div className="bg-white border border-brand-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-brand-100 pb-4 mb-4">
              <h5 className="font-display font-bold text-gray-900 text-sm flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 text-brand-600" />
                Your Inquiry History ({submittedInquiries.length})
              </h5>
              <span className="text-[10px] font-mono bg-brand-100 text-brand-800 px-2 py-0.5 rounded font-bold">
                Local Tracking
              </span>
            </div>

            <div className="space-y-4">
              {submittedInquiries.map((inq) => (
                <div 
                  key={inq.id}
                  className="p-4 bg-brand-50/50 rounded-xl border border-brand-100/80 relative group"
                >
                  <button
                    onClick={() => handleDeleteInquiry(inq.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 rounded-md transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-900">
                      {inq.serviceType}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {inq.date}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3">
                    {inq.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-brand-100/50 text-[10px] text-gray-500">
                    <div>
                      Address: <span className="font-semibold text-gray-800">{inq.address}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                      <span className="font-bold uppercase tracking-wide text-brand-800">
                        {inq.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
