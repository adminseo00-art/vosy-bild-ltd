import React, { useState, useEffect } from 'react';
import { Star, Check, Award, Plus, X, MessageSquare, ShieldCheck, User, Trash2 } from 'lucide-react';
import { Review } from '../types';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    rating: 5,
    title: 'Outstanding Loft Extension',
    content: 'Vose Build completed our loft extension in London and we could not be happier. From initial quote to final cleanup, Nemo and the team were professional, punctual, and kept the site clean. Exceptional attention to detail in the custom structural joinery!',
    date: '12 June 2026',
    isVerified: true,
    reply: {
      author: 'Nemo, Vose Build Ltd',
      content: 'Thank you Sarah! It was a pleasure working on your property. We are delighted that you love the custom joinery and structural layout.',
      date: '14 June 2026'
    }
  },
  {
    id: 'rev-2',
    author: 'David H.',
    rating: 5,
    title: 'Highly professional build quality',
    content: 'Very happy with our single-storey rear extension. Vose Build handled the steel beam installations and structural openings effortlessly. Honest pricing, tidy builders, and fully compliant with building regs. Company number 16669336, fully registered and reliable.',
    date: '28 May 2026',
    isVerified: true,
    reply: {
      author: 'Nemo, Vose Build Ltd',
      content: 'Thanks David! Structural stability is our top priority and we always make sure building control compliance goes smoothly.',
      date: '29 May 2026'
    }
  },
  {
    id: 'rev-3',
    author: 'Amir G.',
    rating: 5,
    title: 'Complete Refurbishment - Superb Carpentry',
    content: 'We hired VOSE BUILD LTD for a complete flat refurbishment in Northwest London (Prospect House area). Nemo coordinated everything: custom plastering, premium carpentry, plumbing, and electrical. Friendly communication throughout and superb finishes.',
    date: '02 May 2026',
    isVerified: true
  },
  {
    id: 'rev-4',
    author: 'Emily Watson',
    rating: 5,
    title: 'Great craftsmanship and communication',
    content: 'Vose Build renovated our master bedroom and hallway with gorgeous new partition walls and premium trim work. Very responsive email communication (vosebuildltd@gmail.com). Kept us informed of progress every single day.',
    date: '15 April 2026',
    isVerified: true,
    reply: {
      author: 'Nemo, Vose Build Ltd',
      content: 'Thank you Emily! Glad we kept you informed. Direct communication makes the building process a lot smoother for everyone.',
      date: '16 April 2026'
    }
  }
];

export default function TrustpilotWidget() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<number | 'all'>('all');

  useEffect(() => {
    const stored = localStorage.getItem('vose_build_reviews');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Review[];
        // Filter out any spam/fake reviews automatically
        const clean = parsed.filter((r) => {
          const contentStr = `${r.content} ${r.title} ${r.author}`.toLowerCase();
          const isSpam = /5y5ry|y5ry|5ry|6u67|6u65|uutyu|564y|5ry5ry/i.test(contentStr);
          return !isSpam;
        });

        // Seed with INITIAL_REVIEWS if empty or if everything got cleaned
        if (clean.length === 0) {
          setReviews(INITIAL_REVIEWS);
          localStorage.setItem('vose_build_reviews', JSON.stringify(INITIAL_REVIEWS));
        } else {
          setReviews(clean);
          localStorage.setItem('vose_build_reviews', JSON.stringify(clean));
        }
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('vose_build_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newContent) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      isVerified: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('vose_build_reviews', JSON.stringify(updated));

    // Reset form
    setNewAuthor('');
    setNewTitle('');
    setNewContent('');
    setNewRating(5);
    setIsModalOpen(false);
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('vose_build_reviews', JSON.stringify(updated));
  };

  // Trustpilot calculations
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? Number((reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1))
    : 5.0;

  const starBreakdown = [1, 2, 3, 4, 5].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { star, count, pct };
  }).reverse();

  const filteredReviews = activeFilter === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === activeFilter);

  // Trustpilot Star block helper
  const renderTrustpilotStars = (rating: number, sizeClass = "w-4 h-4") => {
    return (
      <div className="flex gap-[2px]">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          // Trustpilot standard color for stars is bright green (#00b67a)
          const isFilled = starIndex <= rating;
          return (
            <div 
              key={starIndex} 
              className={`p-[2px] rounded-sm flex items-center justify-center ${
                isFilled ? 'bg-[#00b67a]' : 'bg-gray-200'
              }`}
            >
              <Star className={`${sizeClass} fill-white text-transparent`} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div id="trust-reviews" className="w-full">
      {/* Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white border border-brand-200 rounded-2xl p-6 md:p-8 shadow-sm">
        {/* Left: Score Card */}
        <div className="flex flex-col justify-center items-center lg:items-start lg:border-r lg:border-brand-100 lg:pr-8 text-center lg:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-display text-2xl font-bold tracking-tight text-gray-900">Trustpilot</span>
            <div className="bg-[#00b67a] p-[3px] rounded-xs flex items-center">
              <Star className="w-4 h-4 fill-white text-transparent" />
            </div>
          </div>
          
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-5xl font-extrabold tracking-tight font-display text-gray-900">
              {averageRating}
            </span>
            <span className="text-gray-400 font-medium">/ 5</span>
          </div>

          <div className="mt-3">
            {renderTrustpilotStars(Math.round(averageRating), "w-5 h-5")}
          </div>

          <p className="mt-4 text-sm text-gray-600 font-medium flex items-center gap-1.5 justify-center lg:justify-start">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00b67a]"></span>
            Excellent rating based on <span className="font-bold text-gray-900">{totalReviews}</span> reviews
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-brand-900 text-white rounded-xl text-sm font-semibold hover:bg-brand-800 transition duration-150 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Write a Review
          </button>
        </div>

        {/* Middle: Rating Bars */}
        <div className="flex flex-col justify-center py-2 lg:border-r lg:border-brand-100 lg:px-8">
          <div className="space-y-2.5">
            {starBreakdown.map(({ star, count, pct }) => (
              <button
                key={star}
                onClick={() => setActiveFilter(activeFilter === star ? 'all' : star)}
                className={`w-full flex items-center gap-3 text-left group p-1 rounded-lg transition duration-150 hover:bg-brand-50 ${
                  activeFilter === star ? 'bg-brand-100 font-medium' : ''
                }`}
              >
                <span className="text-xs text-gray-500 font-mono w-10 shrink-0">{star} star</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00b67a] rounded-full transition-all duration-500" 
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-gray-400 w-8 text-right">{count}</span>
              </button>
            ))}
          </div>
          {activeFilter !== 'all' && (
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-3 text-xs text-brand-700 font-medium hover:underline self-start"
            >
              Clear filter to show all reviews
            </button>
          )}
        </div>

        {/* Right: Company Core Trust Indicators */}
        <div className="flex flex-col justify-center lg:pl-8 space-y-4">
          <h4 className="font-display font-semibold text-gray-900 text-base">Verified Builder Profile</h4>
          
          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-brand-100 text-brand-700 rounded-lg shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Vose Build Ltd</p>
                <p className="text-xs text-gray-500">Company Reg: 16669336</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-brand-100 text-brand-700 rounded-lg shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Highly Recommended</p>
                <p className="text-xs text-gray-500">100% Client-backed work quality</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-brand-100 text-brand-700 rounded-lg shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Responsive Team</p>
                <p className="text-xs text-gray-500">Every inquiry answered within 24h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="mt-8 space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-white border border-brand-100 rounded-2xl max-w-2xl mx-auto p-6">
            <p className="text-gray-500 text-sm mb-4">No reviews have been posted yet. Be the first to share your experience with Vose Build Ltd!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-900 text-white rounded-xl text-sm font-semibold hover:bg-brand-800 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Write First Review
            </button>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-white border border-brand-100 rounded-2xl">
            <p className="text-gray-500">No reviews found for this rating.</p>
            <button 
              onClick={() => setActiveFilter('all')}
              className="mt-2 text-sm text-brand-700 font-medium hover:underline"
            >
              Show all reviews
            </button>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white border border-brand-100 hover:border-brand-200 rounded-2xl p-6 md:p-8 transition-all duration-200 shadow-2xs"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-brand-50 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-800 font-bold font-display">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm">{review.author}</h5>
                    {review.isVerified && (
                      <span className="flex items-center gap-1 text-[11px] text-[#00b67a] font-semibold tracking-wide">
                        <Check className="w-3 h-3 stroke-[3]" /> Verified Customer
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-2">
                    {renderTrustpilotStars(review.rating, "w-3.5 h-3.5")}
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      title="Delete Review"
                      className="p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">{review.date}</span>
                </div>
              </div>

              {/* Body */}
              <h4 className="font-display font-bold text-gray-900 text-lg leading-tight mb-2">
                {review.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {review.content}
              </p>

              {/* Reply Section */}
              {review.reply && (
                <div className="bg-brand-50 rounded-xl p-4 md:p-5 border-l-2 border-brand-400 ml-2 md:ml-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-700" />
                      Reply from VOSE BUILD LTD
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{review.reply.date}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">
                    {review.reply.content}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-brand-950 text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-display font-bold text-lg">Leave a Trustpilot Review</h3>
                <p className="text-xs text-brand-300">Share your experience with Vose Build Ltd</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-brand-900 text-brand-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = star <= (hoverRating ?? newRating);
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className={`p-2 rounded-lg transition-all ${
                          isActive ? 'bg-[#00b67a]' : 'bg-gray-100'
                        }`}
                      >
                        <Star className={`w-6 h-6 ${isActive ? 'fill-white text-transparent' : 'text-gray-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Review Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Excellent service, highly recommended"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Review Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the home extension, refurbishment, plumbing, tidy work..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-brand-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00b67a] hover:bg-[#009b68] text-white rounded-xl text-sm font-semibold transition"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
