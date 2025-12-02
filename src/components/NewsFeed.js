import React, { useState, useEffect, useCallback } from 'react';
import mockNewsArticles from '../data/mockNewsData';
import NewsCard from './NewsCard';
import ArticleDetail from './ArticleDetail';
import LoadingSpinner from './LoadingSpinner';
import './NewsFeed.css';

const ITEMS_PER_PAGE = 4;

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pullStartY, setPullStartY] = useState(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  // Load initial articles
  useEffect(() => {
    loadArticles();
  }, []);

  // Update displayed articles when page changes
  useEffect(() => {
    const endIndex = currentPage * ITEMS_PER_PAGE;
    setDisplayedArticles(articles.slice(0, endIndex));
  }, [currentPage, articles]);

  const loadArticles = async () => {
    setLoading(true);
    // Simulate API loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setArticles([...mockNewsArticles]);
    setCurrentPage(1);
    setLoading(false);
  };

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Shuffle articles to simulate new content
    const shuffled = [...mockNewsArticles].sort(() => Math.random() - 0.5);
    setArticles(shuffled);
    setCurrentPage(1);
    setRefreshing(false);
    setPullDistance(0);
  }, [refreshing]);

  const loadMoreArticles = async () => {
    if (loadingMore || displayedArticles.length >= articles.length) return;
    
    setLoadingMore(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setCurrentPage(prev => prev + 1);
    setLoadingMore(false);
  };

  const handleArticleExpand = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseDetail = () => {
    setSelectedArticle(null);
  };

  // Pull-to-refresh handlers
  const handleTouchStart = (e) => {
    if (window.scrollY === 0 && e.touches && e.touches.length > 0) {
      setPullStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isPulling || pullStartY === null || !e.touches || e.touches.length === 0) return;
    
    const currentY = e.touches[0].clientY;
    const distance = currentY - pullStartY;
    
    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance * 0.5, 100));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      handleRefresh();
    } else {
      setPullDistance(0);
    }
    setPullStartY(null);
    setIsPulling(false);
  };

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const hasMore = displayedArticles.length < articles.length;

  if (loading) {
    return (
      <div className="news-feed-loading">
        <LoadingSpinner message="Loading health news..." size="large" />
      </div>
    );
  }

  return (
    <div 
      className="news-feed-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      <div 
        className={`pull-to-refresh ${pullDistance > 60 ? 'ready' : ''} ${refreshing ? 'refreshing' : ''}`}
        style={{ height: refreshing ? 60 : pullDistance }}
      >
        {refreshing ? (
          <div className="refresh-spinner">
            <LoadingSpinner message="Refreshing..." size="small" />
          </div>
        ) : pullDistance > 0 ? (
          <div className="pull-indicator">
            <span className={`pull-arrow ${pullDistance > 60 ? 'rotated' : ''}`}>↓</span>
            <span className="pull-text">
              {pullDistance > 60 ? 'Release to refresh' : 'Pull down to refresh'}
            </span>
          </div>
        ) : null}
      </div>

      {/* Header */}
      <header className="news-feed-header">
        <div className="header-content">
          <h1 className="header-title">
            <span className="header-icon">🏥</span>
            Health News Daily
          </h1>
          <p className="header-subtitle">AI-powered summaries for busy lives</p>
        </div>
        <button 
          className={`refresh-button ${refreshing ? 'spinning' : ''}`}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          ↻
        </button>
      </header>

      {/* Articles count */}
      <div className="articles-info">
        <span className="article-count">
          Showing {displayedArticles.length} of {articles.length} articles
        </span>
        <span className="last-updated">
          Updated just now
        </span>
      </div>

      {/* News cards grid */}
      <div className="news-cards-grid">
        {displayedArticles.map(article => (
          <NewsCard 
            key={article.id} 
            article={article} 
            onExpand={handleArticleExpand}
          />
        ))}
      </div>

      {/* Load more / Pagination */}
      {hasMore && (
        <div className="load-more-container">
          <button 
            className={`load-more-button ${loadingMore ? 'loading' : ''}`}
            onClick={loadMoreArticles}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <span className="load-spinner"></span>
                Loading more...
              </>
            ) : (
              <>
                Load More Articles
                <span className="load-count">
                  ({articles.length - displayedArticles.length} remaining)
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Pagination info */}
      <div className="pagination-info">
        <div className="pagination-dots">
          {Array.from({ length: totalPages }, (_, i) => (
            <span 
              key={i} 
              className={`pagination-dot ${i < currentPage ? 'active' : ''}`}
            />
          ))}
        </div>
        <span className="page-text">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetail 
          article={selectedArticle} 
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default NewsFeed;
