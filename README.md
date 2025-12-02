# AI-Based Health News Curator

A React-based health news aggregator prototype that demonstrates AI-powered summaries and simplified content for busy readers. The application showcases the architecture and user experience for integrating AI summarization services.

## 1. Project Setup & Demo

### Prerequisites
- Node.js (v18 or higher, v20 LTS recommended)
- npm (v9 or higher)

### Installation & Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm test` | Launches the test runner |
| `npm run build` | Builds the app for production |

### Demo

To view the application demo, launch the app locally using `npm install && npm start` and access [http://localhost:3000](http://localhost:3000).

---

## 2. Problem Understanding

### Problem Statement
Users are overwhelmed by the volume of health news available online. Reading full articles is time-consuming, and complex medical terminology can be difficult to understand.

### Solution
An AI-powered health news curator that:
- Aggregates health news from various sources
- Provides AI-generated TL;DR summaries and key takeaways
- Simplifies complex medical content for easy understanding
- Allows users to regenerate summaries for different perspectives

### Assumptions
- Users prefer quick summaries over reading full articles
- AI-generated content should be accurate and easy to understand
- The application should work well on both desktop and mobile devices
- Users may want to access the original content when needed

---

## 3. AI Prompts & Iterations

### Initial Prompts
- "Summarize this health article in 2 sentences"
- "Extract 3 key takeaways from this article"

### Issues Faced
- Initial summaries were too technical for general audiences
- Key takeaways sometimes missed important actionable advice
- Regenerated summaries lacked variation

### Refined Prompts
- "Summarize this health article in simple, everyday language. Focus on what the reader can do with this information."
- "Extract 3 practical takeaways that a non-medical professional can act on"
- "Simplify this medical content as if explaining to someone with no medical background, using emojis and friendly language"

---

## 4. Architecture & Code Structure

```
src/
├── App.js                 # Main application component and entry point
├── components/
│   ├── NewsFeed.js        # Main feed component with pagination and pull-to-refresh
│   ├── NewsCard.js        # Individual article card with AI summary
│   ├── ArticleDetail.js   # Full article view with simplified/original toggle
│   └── LoadingSpinner.js  # Reusable loading indicator
├── services/
│   └── aiSummaryService.js # AI service for generating summaries and simplified content
├── data/
│   └── mockNewsData.js    # Mock health news data
└── styles/
    ├── App.css
    ├── NewsFeed.css
    ├── NewsCard.css
    ├── ArticleDetail.css
    └── LoadingSpinner.css
```

### Key Components

| Component | Purpose |
|-----------|---------|
| `App.js` | Root component that manages the main application layout |
| `NewsFeed.js` | Displays article list with pagination and pull-to-refresh functionality |
| `NewsCard.js` | Shows article preview with AI-generated TL;DR and key takeaways |
| `ArticleDetail.js` | Modal view for full article with simplified/original content toggle |
| `aiSummaryService.js` | Handles all AI-related operations (summarization, simplification) |

### State Management
- Uses React's built-in `useState` and `useEffect` hooks for local state management
- Component-level state for loading states, summaries, and view modes
- Optimized rendering with `useMemo` and `useCallback` hooks

---

## 5. Screenshots / Screen Recording

### Main Features to Capture:
1. **News Feed View** - Grid of health news articles with AI summaries
2. **Article Card** - TL;DR summary and key takeaways
3. **Regenerate Summary** - AI regeneration functionality
4. **Article Detail Modal** - Full article view with simplified/original toggle
5. **Pull-to-Refresh** - Mobile-friendly refresh gesture
6. **Load More** - Pagination for additional articles

*Note: Run `npm start` and capture screenshots of the application screens listed above.*

---

## 6. Known Issues / Improvements

### Known Issues
- AI summaries currently use mock data for demonstration purposes (ready for integration with a real AI service)
- Pull-to-refresh gesture may not work on all desktop browsers
- Images may fail to load if external URLs are unavailable

### Potential Improvements
- Integrate with a real AI service (OpenAI, Claude, etc.) for dynamic summaries
- Add user preferences for summary length and complexity
- Implement article bookmarking and sharing functionality
- Add dark mode support
- Implement offline caching for previously viewed articles
- Add search and filter functionality by category
- Include accessibility improvements (ARIA labels, keyboard navigation)

---

## 7. Bonus Work

### Implemented Features
- **Pull-to-Refresh** - Mobile-friendly gesture for refreshing content
- **Lazy Loading** - Images load on-demand for better performance
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Error Handling** - Graceful error states with retry functionality
- **Loading States** - Informative loading indicators throughout the app
- **View Mode Toggle** - Switch between AI-simplified and original content

### Future Enhancements
- Dark mode toggle
- Animated transitions between views
- Progressive Web App (PWA) support
- Social sharing integration

---

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
