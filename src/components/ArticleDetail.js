import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { simplifyArticle, regenerateSimplifiedContent } from '../services/aiSummaryService';
import LoadingSpinner from './LoadingSpinner';
import './ArticleDetail.css';

const ArticleDetail = ({ article, onClose }) => {
  const [simplifiedContent, setSimplifiedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [viewMode, setViewMode] = useState('simplified'); // 'simplified' or 'original'
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSimplifiedContent();
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSimplifiedContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await simplifyArticle(article);
      setSimplifiedContent(result.simplifiedContent);
    } catch (err) {
      setError('Failed to simplify article');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    setError(null);
    try {
      const result = await regenerateSimplifiedContent(article);
      setSimplifiedContent(result.simplifiedContent);
    } catch (err) {
      setError('Failed to regenerate content');
    } finally {
      setRegenerating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Parse markdown-like content to React elements - memoized to avoid recalculation
  const renderedContent = useMemo(() => {
    if (!simplifiedContent) return null;

    const lines = simplifiedContent.split('\n');
    const elements = [];
    let currentList = [];
    let inList = false;

    lines.forEach((line, index) => {
      // Headers
      if (line.startsWith('**') && line.endsWith('**')) {
        if (inList && currentList.length > 0) {
          elements.push(<ul key={`list-${index}`} className="content-list">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        const headerText = line.replace(/\*\*/g, '');
        elements.push(<h3 key={index} className="content-header">{headerText}</h3>);
      }
      // List items
      else if (line.startsWith('•') || line.startsWith('-')) {
        inList = true;
        const listText = line.replace(/^[•-]\s*/, '');
        currentList.push(<li key={index}>{listText}</li>);
      }
      // Regular paragraphs
      else if (line.trim()) {
        if (inList && currentList.length > 0) {
          elements.push(<ul key={`list-${index}`} className="content-list">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        // Handle inline bold
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const formattedLine = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.replace(/\*\*/g, '')}</strong>;
          }
          return part;
        });
        elements.push(<p key={index} className="content-paragraph">{formattedLine}</p>);
      }
      // Empty lines
      else if (inList && currentList.length > 0) {
        elements.push(<ul key={`list-${index}`} className="content-list">{currentList}</ul>);
        currentList = [];
        inList = false;
      }
    });

    // Handle any remaining list items
    if (currentList.length > 0) {
      elements.push(<ul key="final-list" className="content-list">{currentList}</ul>);
    }

    return elements;
  }, [simplifiedContent]);

  return (
    <div className="article-detail-backdrop" onClick={handleBackdropClick}>
      <div className="article-detail-modal">
        <button className="close-button" onClick={onClose}>
          <span>×</span>
        </button>
        
        <div className="article-detail-header">
          <div className="article-detail-image">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=Health+News';
              }}
            />
            <span className="article-category">{article.category}</span>
          </div>
          
          <div className="article-meta">
            <span className="article-source">{article.source}</span>
            <span className="article-date">{formatDate(article.publishedAt)}</span>
          </div>
          
          <h1 className="article-title">{article.title}</h1>
        </div>
        
        <div className="view-mode-toggle">
          <button 
            className={`toggle-button ${viewMode === 'simplified' ? 'active' : ''}`}
            onClick={() => setViewMode('simplified')}
          >
            <span className="toggle-icon">✨</span>
            AI Simplified
          </button>
          <button 
            className={`toggle-button ${viewMode === 'original' ? 'active' : ''}`}
            onClick={() => setViewMode('original')}
          >
            <span className="toggle-icon">📄</span>
            Original Article
          </button>
        </div>
        
        <div className="article-content">
          {viewMode === 'simplified' ? (
            loading ? (
              <LoadingSpinner message="AI is simplifying the article..." size="large" />
            ) : error ? (
              <div className="content-error">
                <p>{error}</p>
                <button onClick={loadSimplifiedContent} className="retry-button">
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="simplified-badge">
                  <span className="badge-icon">🤖</span>
                  AI-Simplified for Easy Reading
                </div>
                <div className="simplified-content">
                  {renderedContent}
                </div>
                <button 
                  className={`regenerate-content-button ${regenerating ? 'regenerating' : ''}`}
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
                      Regenerate Simplified Version
                    </>
                  )}
                </button>
              </>
            )
          ) : (
            <div className="original-content">
              <div className="original-badge">
                <span className="badge-icon">📰</span>
                Original Article
              </div>
              {article.originalContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="original-paragraph">{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
