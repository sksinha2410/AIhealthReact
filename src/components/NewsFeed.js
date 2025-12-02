import React, { useState, useEffect, useCallback } from 'react';
import { fetchHealthNews } from '../services/newsService';
import NewsCard from './NewsCard';
import ArticleDetail from './ArticleDetail';
import LoadingSpinner from './LoadingSpinner';
import './NewsFeed.css';

const ITEMS_PER_PAGE = 4;

// Helper function to format time ago
const formatTimeAgo = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffSeconds < 60) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
};

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
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

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
    try {
      // Fetch health news from the internet (with fallback to mock data)
      const result = await fetchHealthNews({ pageSize: 20 });
      setArticles(result.articles);
      setIsUsingMockData(result.isUsingMockData);
      setLastUpdated(new Date());
      setCurrentPage(1);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      // Fetch fresh health news from the internet
      const result = await fetchHealthNews({ pageSize: 20 });
      setArticles(result.articles);
      setIsUsingMockData(result.isUsingMockData);
      setLastUpdated(new Date());
      setCurrentPage(1);
    } catch (error) {
      console.error('Error refreshing articles:', error);
    } finally {
      setRefreshing(false);
      setPullDistance(0);
    }
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
          <p className="header-subtitle">
            {isUsingMockData 
              ? 'AI-powered summaries (Demo Mode)' 
              : 'Live health news with AI-powered summaries'}
          </p>
        </div>
        <button 
          className={`refresh-button ${refreshing ? 'spinning' : ''}`}
          onClick={handleRefresh}
          disabled={refreshing}
          title="Refresh news from internet"
        >
          ↻
        </button>
      </header>

      {/* Data source indicator */}
      {isUsingMockData && (
        <div className="data-source-notice">
          <span className="notice-icon">ℹ️</span>
          <span>Using sample data. Add REACT_APP_NEWS_API_KEY to fetch live news.</span>
        </div>
      )}

      {/* Articles count */}
      <div className="articles-info">
        <span className="article-count">
          Showing {displayedArticles.length} of {articles.length} articles
        </span>
        <span className="last-updated">
          {lastUpdated 
            ? `Updated ${formatTimeAgo(lastUpdated)}` 
            : 'Updated just now'}
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
