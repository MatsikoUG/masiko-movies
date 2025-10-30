import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { BACKDROP_BASE_URL, tmdbApi } from '../utils/tmdb';

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeroMovie = async () => {
      try {
        const response = await tmdbApi.getPopularMovies();
        const movies = response.data.results;
        // Select a random popular movie for the hero
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error('Error loading hero movie:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroMovie();
  }, []);

  if (loading || !movie) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-96 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-80"></div>
        </div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : '/placeholder-backdrop.jpg';

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
              {movie.title}
            </h1>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-semibold text-lg">
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>
              <span className="text-white/90 text-lg font-medium">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                HD
              </span>
            </div>

            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl line-clamp-4">
              {movie.overview}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/movie/${movie.id}`}
                className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-bold flex items-center justify-center space-x-3 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <PlayIcon className="h-6 w-6" />
                <span className="text-xl">Play</span>
              </Link>

              <Link
                to={`/movie/${movie.id}`}
                className="bg-gray-500/70 hover:bg-gray-500/50 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center space-x-3 transition-all duration-200 backdrop-blur-sm"
              >
                <InformationCircleIcon className="h-6 w-6" />
                <span className="text-xl">More Info</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Age Rating Badge */}
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-bold">
        13+
      </div>

      {/* Fade out effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </div>
  );
};

export default Hero;