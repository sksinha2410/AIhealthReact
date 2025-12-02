// News Service - Fetches health news from internet using News API
// Falls back to mock data when API key is not configured

import mockNewsArticles from '../data/mockNewsData';

// News API configuration
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Health categories with associated keywords for classification
const HEALTH_CATEGORIES = {
  'Nutrition': ['diet', 'food', 'nutrition', 'eating', 'meal', 'vitamin', 'protein', 'carb', 'fat', 'calorie', 'mediterranean', 'vegetable', 'fruit'],
  'Research': ['study', 'research', 'scientist', 'breakthrough', 'discovery', 'trial', 'clinical', 'laboratory', 'experiment'],
  'Sleep': ['sleep', 'insomnia', 'rest', 'fatigue', 'tired', 'circadian', 'melatonin', 'nap'],
  'Mental Health': ['mental', 'anxiety', 'depression', 'stress', 'therapy', 'psychological', 'mindfulness', 'meditation', 'brain', 'cognitive'],
  'Fitness': ['exercise', 'workout', 'fitness', 'gym', 'training', 'muscle', 'cardio', 'running', 'strength', 'athletic'],
  'Chronic Conditions': ['diabetes', 'heart', 'cancer', 'chronic', 'disease', 'condition', 'arthritis', 'hypertension', 'cholesterol'],
  'Digestive Health': ['gut', 'digestive', 'stomach', 'intestine', 'microbiome', 'probiotic', 'fiber'],
  'Preventive Care': ['vaccine', 'prevention', 'screening', 'checkup', 'immunization', 'preventive', 'health check']
};

// Determine category based on article content keywords
const determineCategory = (article) => {
  const textToAnalyze = `${article.title || ''} ${article.description || ''} ${article.content || ''}`.toLowerCase();
  
  let bestCategory = 'Research'; // Default category
  let maxMatches = 0;
  
  for (const [category, keywords] of Object.entries(HEALTH_CATEGORIES)) {
    const matches = keywords.filter(keyword => textToAnalyze.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
    }
  }
  
  return bestCategory;
};

// Generate a unique ID for an article based on its URL or title
const generateArticleId = (article, index) => {
  // Use a hash of the URL or title for a more stable ID
  const baseString = article.url || article.title || `article-${index}`;
  let hash = 0;
  for (let i = 0; i < baseString.length; i++) {
    const char = baseString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Transform News API response to our article format
const transformNewsApiArticle = (article, index) => {
  return {
    id: generateArticleId(article, index),
    title: article.title || 'Health News',
    source: article.source?.name || 'Health News',
    publishedAt: article.publishedAt || new Date().toISOString(),
    imageUrl: article.urlToImage || `https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400`,
    originalContent: article.content || article.description || 'Read the full article for more details.',
    category: determineCategory(article),
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
