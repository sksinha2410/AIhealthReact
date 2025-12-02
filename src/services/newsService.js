// News Service - Fetches health news from internet using News API
// Falls back to mock data when API key is not configured

import mockNewsArticles from '../data/mockNewsData';

// News API configuration
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Transform News API response to our article format
const transformNewsApiArticle = (article, index) => {
  const categories = ['Nutrition', 'Research', 'Sleep', 'Mental Health', 'Fitness', 'Chronic Conditions', 'Digestive Health', 'Preventive Care'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
  return {
    id: index + 1,
    title: article.title || 'Health News',
    source: article.source?.name || 'Health News',
    publishedAt: article.publishedAt || new Date().toISOString(),
    imageUrl: article.urlToImage || `https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400`,
    originalContent: article.content || article.description || 'Read the full article for more details.',
    category: randomCategory,
    url: article.url,
    description: article.description,
    author: article.author
  };
};

// Fetch health news from News API
export const fetchHealthNews = async (options = {}) => {
  const {
    pageSize = 10,
    page = 1,
    sortBy = 'publishedAt'
  } = options;

  // If no API key is configured, return mock data
  if (!NEWS_API_KEY) {
    console.log('No News API key configured, using mock data');
    return {
      articles: [...mockNewsArticles],
      totalResults: mockNewsArticles.length,
      isUsingMockData: true
    };
  }

  try {
    // Build the URL for health-related news
    const searchQuery = encodeURIComponent('health OR medicine OR wellness OR nutrition OR fitness');
    const url = `${NEWS_API_BASE_URL}/everything?q=${searchQuery}&language=en&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('News API error:', response.status, errorData);
      
      // Fall back to mock data on error
      return {
        articles: [...mockNewsArticles],
        totalResults: mockNewsArticles.length,
        isUsingMockData: true,
        error: errorData.message || `API error: ${response.status}`
      };
    }

    const data = await response.json();
    
    if (data.status !== 'ok' || !data.articles || data.articles.length === 0) {
      console.log('No articles found, using mock data');
      return {
        articles: [...mockNewsArticles],
        totalResults: mockNewsArticles.length,
        isUsingMockData: true
      };
    }

    // Transform and filter articles
    const transformedArticles = data.articles
      .filter(article => article.title && article.title !== '[Removed]')
      .map((article, index) => transformNewsApiArticle(article, index));

    return {
      articles: transformedArticles,
      totalResults: data.totalResults,
      isUsingMockData: false
    };

  } catch (error) {
    console.error('Failed to fetch health news:', error);
    
    // Fall back to mock data on network error
    return {
      articles: [...mockNewsArticles],
      totalResults: mockNewsArticles.length,
      isUsingMockData: true,
      error: error.message
    };
  }
};

// Fetch top health headlines
export const fetchHealthHeadlines = async (options = {}) => {
  const {
    country = 'us',
    pageSize = 10,
    page = 1
  } = options;

  // If no API key is configured, return mock data
  if (!NEWS_API_KEY) {
    console.log('No News API key configured, using mock data');
    return {
      articles: [...mockNewsArticles],
      totalResults: mockNewsArticles.length,
      isUsingMockData: true
    };
  }

  try {
    const url = `${NEWS_API_BASE_URL}/top-headlines?country=${country}&category=health&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('News API error:', response.status, errorData);
      
      return {
        articles: [...mockNewsArticles],
        totalResults: mockNewsArticles.length,
        isUsingMockData: true,
        error: errorData.message || `API error: ${response.status}`
      };
    }

    const data = await response.json();
    
    if (data.status !== 'ok' || !data.articles || data.articles.length === 0) {
      console.log('No headlines found, using mock data');
      return {
        articles: [...mockNewsArticles],
        totalResults: mockNewsArticles.length,
        isUsingMockData: true
      };
    }

    const transformedArticles = data.articles
      .filter(article => article.title && article.title !== '[Removed]')
      .map((article, index) => transformNewsApiArticle(article, index));

    return {
      articles: transformedArticles,
      totalResults: data.totalResults,
      isUsingMockData: false
    };

  } catch (error) {
    console.error('Failed to fetch health headlines:', error);
    
    return {
      articles: [...mockNewsArticles],
      totalResults: mockNewsArticles.length,
      isUsingMockData: true,
      error: error.message
    };
  }
};

// Check if the News API is configured
export const isNewsApiConfigured = () => {
  return Boolean(NEWS_API_KEY);
};

const newsService = {
  fetchHealthNews,
  fetchHealthHeadlines,
  isNewsApiConfigured
};

export default newsService;
