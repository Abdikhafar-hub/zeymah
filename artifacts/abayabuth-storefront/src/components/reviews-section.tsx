import { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Plus } from 'lucide-react';
import type { ReviewItem } from '@/data/catalog';

interface ReviewsSectionProps {
  productName: string;
  rating: number;
  reviewCount: number;
  reviews?: ReviewItem[];
}

export function ReviewsSection({
  productName,
  rating,
  reviewCount,
  reviews = [],
}: ReviewsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | '5' | '4'>('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5') return r.rating === 5;
    if (activeFilter === '4') return r.rating === 4;
    return true;
  });

  const ratingBars = [
    { stars: 5, percentage: 88, count: Math.round(reviewCount * 0.88) },
    { stars: 4, percentage: 10, count: Math.round(reviewCount * 0.1) },
    { stars: 3, percentage: 2, count: Math.round(reviewCount * 0.02) },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ];

  return (
    <section className="pdp-reviews-container" data-testid="section-pdp-reviews">
      <div className="pdp-reviews-header">
        <div>
          <div className="eyebrow" style={{ color: '#71817e' }}>Community Voice</div>
          <h2>Customer Reviews & Stories</h2>
        </div>
        <button
          type="button"
          className="button-light"
          onClick={() => setShowReviewForm(!showReviewForm)}
          data-testid="button-write-review"
        >
          <Plus size={13} style={{ marginRight: 6 }} /> Write a Review
        </button>
      </div>

      {/* Review Submission Form Drawer */}
      {showReviewForm && (
        <div className="review-form-card animate-fade-in">
          {formSubmitted ? (
            <div className="status-message">
              <CheckCircle size={16} className="text-emerald" style={{ marginRight: 8 }} />
              Thank you! Your verified review has been submitted for moderation.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
            >
              <h4>Review {productName}</h4>
              <div className="review-form-grid">
                <label>
                  <span>Overall Rating</span>
                  <select required className="review-input">
                    <option value="5">5 Stars - Exceptional</option>
                    <option value="4">4 Stars - Very Good</option>
                    <option value="3">3 Stars - Average</option>
                  </select>
                </label>
                <label>
                  <span>Your Name</span>
                  <input required placeholder="e.g. Maryam K." className="review-input" />
                </label>
                <label>
                  <span>Your Email</span>
                  <input required type="email" placeholder="maryam@example.com" className="review-input" />
                </label>
                <label>
                  <span>Size & Height Styled</span>
                  <input placeholder="e.g. Size 54 (Height 5'4&quot;)" className="review-input" />
                </label>
              </div>
              <label style={{ display: 'block', marginTop: 12 }}>
                <span>Review Title</span>
                <input required placeholder="Summarize your experience" className="review-input" />
              </label>
              <label style={{ display: 'block', marginTop: 12 }}>
                <span>Your Review</span>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details about the fabric handfeel, length, drape and styling tips..."
                  className="review-input"
                />
              </label>
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button type="submit" className="button-dark">
                  Submit Review
                </button>
                <button
                  type="button"
                  className="button-light"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Summary Scorecard & Breakdown */}
      <div className="reviews-summary-grid">
        <div className="reviews-score-card">
          <div className="overall-score">{rating.toFixed(1)}</div>
          <div className="overall-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(rating) ? '#063d42' : 'none'}
                stroke="#063d42"
              />
            ))}
          </div>
          <p className="based-on">Based on {reviewCount} verified buyer reviews</p>
          <div className="recommend-stat">
            <span className="rec-number">98%</span>
            <span>of customers recommend this piece</span>
          </div>
        </div>

        <div className="reviews-bars">
          {ratingBars.map((b) => (
            <div key={b.stars} className="rating-bar-row">
              <span className="star-level">{b.stars} Stars</span>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${b.percentage}%` }}
                />
              </div>
              <span className="bar-count">({b.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="review-filter-tabs">
        <button
          type="button"
          className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Reviews ({reviews.length})
        </button>
        <button
          type="button"
          className={`filter-tab ${activeFilter === '5' ? 'active' : ''}`}
          onClick={() => setActiveFilter('5')}
        >
          5-Star Reviews
        </button>
        <button
          type="button"
          className={`filter-tab ${activeFilter === '4' ? 'active' : ''}`}
          onClick={() => setActiveFilter('4')}
        >
          4-Star Reviews
        </button>
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {filteredReviews.map((rev) => (
          <article key={rev.id} className="review-card" data-testid={`review-item-${rev.id}`}>
            <div className="review-card-top">
              <div className="review-stars-row">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={13}
                    fill={idx < rev.rating ? '#063d42' : 'none'}
                    stroke="#063d42"
                  />
                ))}
              </div>
              <span className="review-date">{rev.date}</span>
            </div>

            <h4 className="review-title">{rev.title}</h4>
            <p className="review-comment">{rev.comment}</p>

            <div className="review-meta">
              <span className="author-name">{rev.author}</span>
              {rev.verified && (
                <span className="verified-badge">
                  <CheckCircle size={12} className="text-emerald" /> Verified Buyer
                </span>
              )}
              {rev.lengthPurchased && (
                <span className="meta-tag">Size: {rev.lengthPurchased}"</span>
              )}
              {rev.colorPurchased && (
                <span className="meta-tag">Shade: {rev.colorPurchased}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
