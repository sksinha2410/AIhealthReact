import React, { useState, useEffect } from 'react';
import { summarizeArticle, regenerateSummary } from '../services/aiSummaryService';
import LoadingSpinner from './LoadingSpinner';
import './NewsCard.css';

const NewsCard = ({ article, onExpand }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.id]);

  const loadSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await summarizeArticle(article);
      setSummary(result);
    } catch (err) {
      setError('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (e) => {
    e.stopPropagation();
    setRegenerating(true);
    setError(null);
    try {
      const result = await regenerateSummary(article);
      setSummary(result);
    } catch (err) {
      setError('Failed to regenerate summary');
    } finally {
      setRegenerating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <article className="news-card" onClick={() => onExpand(article)}>
      <div className="news-card-image">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=Health+News';
          }}
        />
        <span className="news-card-category">{article.category}</span>
      </div>
      
      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-card-source">{article.source}</span>
          <span className="news-card-date">{formatDate(article.publishedAt)}</span>
        </div>
        
        <h2 className="news-card-title">{article.title}</h2>
        
        <div className="news-card-summary">
          {loading ? (
            <LoadingSpinner message="AI summarizing..." size="small" />
          ) : error ? (
            <div className="summary-error">
              <p>{error}</p>
              <button onClick={handleRegenerate} className="retry-button">
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="tldr-section">
                <span className="tldr-label">TL;DR</span>
                <p className="tldr-text">{summary?.tldr}</p>
              </div>
              
              <div className="key-takeaways">
                <span className="takeaways-label">Key Takeaways</span>
                <ul className="takeaways-list">
                  {summary?.keyTakeaways.map((takeaway, index) => (
                    <li key={index}>
                      <span className="takeaway-icon">✓</span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className={`regenerate-button ${regenerating ? 'regenerating' : ''}`}
                onClick={handleRegenerate}
                disabled={regenerating}
              >
                {regenerating ? (
                  <>
                    <span className="regenerate-spinner"></span>
                    Regenerating...
                  </>
                ) : (
                  <>
                    <span className="regenerate-icon">↻</span>
                    Regenerate Summary
                  </>
                )}
              </button>
            </>
          )}
        </div>
        
        <div className="news-card-footer">
          <button className="read-more-button">
            Read Full Article
            <span className="arrow-icon">→</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
