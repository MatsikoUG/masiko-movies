# Matsiko Movies - Netflix-Style Streaming Website

A fully functional movie and TV series streaming website built with React, featuring a Netflix-like interface and powered by The Movie Database (TMDB) API.

## 🚀 Features

- **Cinematic Hero Section** - Dynamic movie backdrop with play buttons
- **Horizontal Content Rows** - Scrollable movie/TV show collections
- **Advanced Filtering** - Sort by popularity, rating, release date; filter by genre
- **Real-time Search** - Debounced search with instant results
- **Detailed Pages** - Full movie/TV details with cast, trailers, and similar content
- **Trailer Modal** - YouTube trailer playback in modal
- **Watch Providers** - Shows where to stream content
- **Responsive Design** - Works perfectly on all devices
- **Dark Netflix Theme** - Authentic streaming platform aesthetics

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **API**: TMDB API with Axios
- **Icons**: Heroicons
- **Deployment**: GitHub Pages

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/matsiko-movies.git
   cd matsiko-movies
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 🚀 Deployment

### GitHub Pages Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

The project is configured with the correct base path for GitHub Pages deployment.

## 📁 Project Structure

```
matsiko-movies/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Hero.jsx            # Hero section with movie backdrop
│   │   ├── MovieCard.jsx       # Movie/TV card component
│   │   ├── Row.jsx             # Horizontal scrolling content row
│   │   ├── LoadingSkeleton.jsx # Loading placeholder
│   │   ├── TrailerModal.jsx    # YouTube trailer modal
│   │   └── Footer.jsx          # Site footer
│   ├── pages/
│   │   ├── Home.jsx            # Homepage with hero and rows
│   │   ├── Movies.jsx          # Movies grid with filters
│   │   ├── Series.jsx          # TV series grid with filters
│   │   ├── Search.jsx          # Search page
│   │   └── Detail.jsx          # Movie/TV detail page
│   ├── utils/
│   │   └── tmdb.js             # TMDB API utilities
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Key Features Explained

### Hero Section
- Randomly selects a popular movie
- Displays movie title, rating, release year, and overview
- Netflix-style "Play" and "More Info" buttons
- Cinematic backdrop with gradient overlays

### Content Rows
- Horizontal scrolling movie/TV collections
- Smooth scroll buttons that appear on hover
- Loading skeletons during data fetch
- Responsive card sizing

### Filtering & Search
- **Movies/TV Pages**: Sort by popularity, rating, release date
- **Genre Filtering**: Filter by specific genres
- **Search**: 300ms debounced search across movies and TV shows

### Detail Pages
- Full movie/TV information display
- Cast and crew information
- Official trailer playback
- Watch provider information
- Similar content recommendations

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔑 TMDB API Configuration

The project uses TMDB API v3 with the following configuration:
- **Base URL**: `https://api.themoviedb.org/3`
- **Image URLs**: `https://image.tmdb.org/t/p/w500` (posters), `https://image.tmdb.org/t/p/original` (backdrops)
- **Authentication**: Bearer token in headers

## 🎨 Design System

- **Primary Colors**: Netflix dark theme (#141414 background)
- **Accent Color**: Red (#e50914) for buttons and highlights
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle shadows for depth
- **Transitions**: Smooth 300ms transitions

## 📱 Mobile Optimization

- Responsive navigation
- Touch-optimized scroll interactions
- Mobile-friendly modal dialogs
- Optimized image loading
- Adaptive text sizes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

### Code Quality

- ESLint configuration for code linting
- Clean component architecture
- Proper error boundaries
- Loading state management

## 📄 License

This project is built for educational purposes and follows TMDB API terms of service.

## 🙏 Acknowledgments

- **TMDB API** for movie and TV data
- **Netflix** for design inspiration
- **React & Vite** communities for excellent tools

---

**Built by AINEBYOONA CALVIN MATSIKO**
