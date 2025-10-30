import axios from 'axios';

const API_KEY = 'eefcc515ed0980a6aa4717c8080f9ccc';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWZjYzUxNWVkMDk4MGE2YWE0NzE3YzgwODBmOWNjYyIsIm5iZiI6MTc1NjcxMDk5My41MjE5OTk4LCJzdWIiOiI2OGI1NDg1MTA2OTc1NjIyNzczY2QyMmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nSeTb8pAwbNd02QerJNEed3-zlOF5mMRdzN-JeukTdg'
  }
};

export const tmdbApi = {
  // Trending
  getTrending: () => axios.get(`${BASE_URL}/trending/all/week`, options),

  // Movies
  getPopularMovies: () => axios.get(`${BASE_URL}/movie/popular`, options),
  getTopRatedMovies: () => axios.get(`${BASE_URL}/movie/top_rated`, options),
  getNowPlayingMovies: () => axios.get(`${BASE_URL}/movie/now_playing`, options),
  getMovieDetails: (id) => axios.get(`${BASE_URL}/movie/${id}`, options),
  getMovieVideos: (id) => axios.get(`${BASE_URL}/movie/${id}/videos`, options),
  getMovieCredits: (id) => axios.get(`${BASE_URL}/movie/${id}/credits`, options),
  getMovieWatchProviders: (id) => axios.get(`${BASE_URL}/movie/${id}/watch/providers`, options),
  getSimilarMovies: (id) => axios.get(`${BASE_URL}/movie/${id}/similar`, options),

  // TV Shows
  getPopularTV: () => axios.get(`${BASE_URL}/tv/popular`, options),
  getTopRatedTV: () => axios.get(`${BASE_URL}/tv/top_rated`, options),
  getTVDetails: (id) => axios.get(`${BASE_URL}/tv/${id}`, options),
  getTVVideos: (id) => axios.get(`${BASE_URL}/tv/${id}/videos`, options),
  getTVCredits: (id) => axios.get(`${BASE_URL}/tv/${id}/credits`, options),
  getTVWatchProviders: (id) => axios.get(`${BASE_URL}/tv/${id}/watch/providers`, options),
  getSimilarTV: (id) => axios.get(`${BASE_URL}/tv/${id}/similar`, options),

  // Search
  searchMulti: (query) => axios.get(`${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`, options),

  // Genres
  getMovieGenres: () => axios.get(`${BASE_URL}/genre/movie/list`, options),
  getTVGenres: () => axios.get(`${BASE_URL}/genre/tv/list`, options),

  // Discover with filters
  discoverMovies: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return axios.get(`${BASE_URL}/discover/movie?${queryString}`, options);
  },

  discoverTV: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return axios.get(`${BASE_URL}/discover/tv?${queryString}`, options);
  }
};

export { IMAGE_BASE_URL, BACKDROP_BASE_URL };