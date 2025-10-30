import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { tmdbApi } from '../utils/tmdb';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: 'popularity.desc',
    genre: '',
    page: 1
  });

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await tmdbApi.getMovieGenres();
        setGenres(response.data.genres);
      } catch (err) {
        console.error('Error loading genres:', err);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const params = {
          sort_by: filters.sortBy,
          page: filters.page,
          with_genres: filters.genre || undefined
        };
        const response = await tmdbApi.discoverMovies(params);
        setMovies(response.data.results);
      } catch (err) {
        setError('Failed to load movies');
        console.error('Error loading movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [filters]);

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy, page: 1 }));
  };

  const handleGenreChange = (genreId) => {
    setFilters(prev => ({ ...prev, genre: genreId, page: 1 }));
  };

  const sortOptions = [
    { value: 'popularity.desc', label: 'Popularity' },
    { value: 'vote_average.desc', label: 'Rating' },
    { value: 'release_date.desc', label: 'Release Date' }
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-400 text-center py-8">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Movies</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Sort By */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 pr-8 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Genre Filter */}
          <div className="relative">
            <select
              value={filters.genre}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 pr-8 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg animate-pulse aspect-[2/3]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map(movie => (
              <MovieCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>
        )}

        {movies.length === 0 && !loading && (
          <p className="text-gray-400 text-center py-8">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;