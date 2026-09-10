import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Sparkles, Filter } from 'lucide-react';
import { REVIEWS_DATA, STORE_INFO } from '../data/furnitureData';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [activeTag, setActiveTag] = useState<'all' | 'quality' | 'customization' | 'value' | 'delivery'>('all');
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  // New review form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('Delhi');
  const [newProduct, setNewProduct] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const filteredReviews = reviewsList.filter((rev) => {
    if (activeTag === 'all') return true;
    return rev.tags.includes(activeTag);
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const addedReview: ReviewItem = {
      id: `user-rev-${Date.now()}`,
      author: newAuthor,
      location: newLocation,
      rating: newRating,
      date: 'Just now',
      product: newProduct || 'Custom Furniture Order',
      comment: newComment,
      verified: true,
      tags: ['quality', 'value'],
    };

    setReviewsList([addedReview, ...reviewsList]);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setShowAddReviewModal(false);
      setSubmittedFeedback(false);
      setNewAuthor('');
      setNewComment('');
      setNewProduct('');
    }, 1800);
  };

  return (
    <section id="reviews" className="py-16 bg-stone-50 border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
            What People Say
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-3 tracking-tight">
            Customer Feedback & Reviews
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base font-light">
            Loved by generations of North Delhi homeowners for superior timber quality, bespoke customization, and honest pricing.
          </p>
        </div>

        {/* Rating Summary Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Overall score */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-stone-200 pb-6 md:pb-0 md:pr-8">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-5xl sm:text-6xl font-display font-extrabold text-stone-900">
                  {STORE_INFO.rating}
                </span>
                <div className="space-y-1 text-left">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < 4
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-amber-300/40 text-amber-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 font-medium">
                    Strong scores around {STORE_INFO.platformRatingRange}
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-600 mt-3 font-medium">
                Over three decades of satisfied furniture buyers in Jahangirpuri, Adarsh Nagar, Model Town & Delhi NCR.
              </p>
            </div>

            {/* Praise Highlights Themes */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Customized Product Quality</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 font-light">
                  Customers consistently praise the durability and finish of customized beds, sofas, dining tables, and wardrobes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                  <ThumbsUp className="w-4 h-4 text-emerald-700" />
                  <span>Value for Money & Festive Discounts</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 font-light">
                  Direct showroom pricing, honest timber grades, and attractive festive offers give customers exceptional value.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Add Review Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'customization', label: 'Custom Made-to-Order' },
              { id: 'quality', label: 'Furniture Quality' },
              { id: 'value', label: 'Value & Pricing' },
              { id: 'delivery', label: 'Same-Day Delivery' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`review-filter-${tab.id}`}
                onClick={() => setActiveTag(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTag === tab.id
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            id="write-review-trigger-btn"
            onClick={() => setShowAddReviewModal(true)}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-800" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-left space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400' : 'text-stone-300 fill-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-medium">{rev.date}</span>
                </div>

                {/* Purchased Product Tag */}
                <div className="inline-block bg-stone-100 text-stone-800 text-[11px] font-semibold px-2.5 py-0.5 rounded border border-stone-200">
                  {rev.product}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Locality */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{rev.author}</h4>
                  <p className="text-[11px] text-stone-500">{rev.location}</p>
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-left">
            <h3 className="font-display text-xl font-bold text-stone-900 mb-1">
              Share Your Showroom Experience
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Help fellow homeowners in Delhi know about your experience with Seth Furniture Gallery.
            </p>

            {submittedFeedback ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-stone-900">Thank You!</h4>
                <p className="text-xs text-stone-600">Your review has been added to our gallery.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 text-amber-400 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating ? 'fill-amber-400' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Locality</label>
                    <input
                      type="text"
                      placeholder="e.g. Jahangirpuri, Delhi"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Furniture Purchased / Custom Ordered
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6-Seater Sheesham Dining Table"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the build quality, wood finish, delivery experience, or staff hospitality..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReviewModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-amber-900 hover:bg-amber-800 text-white rounded-xl shadow-xs"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
