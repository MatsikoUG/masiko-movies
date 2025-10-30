import { useState, useEffect, useCallback } from 'react';
import MovieCard from '../components/MovieCard';
import { tmdbApi } from '../utils/tmdb';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await tmdbApi.searchMulti(debouncedQuery);
        setResults(response.data.results);
      } catch (err) {
        setError('Failed to search. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Search</h1>

        {/* Search Input */}
        <div className="relative mb-8 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for movies, TV shows..."
            value={query}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <p className="text-red-400 text-center py-8">{error}</p>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {results.length > 0 ? (
              <>
                <p className="text-gray-400 mb-4">
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for "{debouncedQuery}"
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {results.map(item => (
                    <MovieCard
                      key={item.id}
                      item={item}
                      type={item.media_type === 'tv' ? 'tv' : 'movie'}
                    />
                  ))}
                </div>
              </>
            ) : debouncedQuery && !loading ? (
              <p className="text-gray-400 text-center py-8">
                No results found for "{debouncedQuery}"
              </p>
            ) : (
              <p className="text-gray-400 text-center py-8">
                Start typing to search for movies and TV shows
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;