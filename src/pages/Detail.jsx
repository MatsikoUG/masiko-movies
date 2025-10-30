import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import { tmdbApi, IMAGE_BASE_URL, BACKDROP_BASE_URL } from '../utils/tmdb';
import { PlayIcon, StarIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/solid';

const Detail = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [videos, setVideos] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);

        const [detailsRes, videosRes, providersRes, similarRes] = await Promise.all([
          type === 'movie' ? tmdbApi.getMovieDetails(id) : tmdbApi.getTVDetails(id),
          type === 'movie' ? tmdbApi.getMovieVideos(id) : tmdbApi.getTVVideos(id),
          type === 'movie' ? tmdbApi.getMovieWatchProviders(id) : tmdbApi.getTVWatchProviders(id),
          type === 'movie' ? tmdbApi.getSimilarMovies(id) : tmdbApi.getSimilarTV(id)
        ]);

        setItem(detailsRes.data);
        setVideos(videosRes.data.results);
        setWatchProviders(providersRes.data.results?.US || null);
        setSimilar(similarRes.data.results);
      } catch (err) {
        setError('Failed to load details');
        console.error('Error loading details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [type, id]);

  const getTrailer = () => {
    return videos.find(video =>
      video.type === 'Trailer' &&
      video.site === 'YouTube' &&
      video.official
    ) || videos.find(video =>
      video.type === 'Trailer' && video.site === 'YouTube'
    );
  };

  const trailer = getTrailer();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-800"></div>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="h-8 bg-gray-800 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-400 text-center py-8">{error || 'Item not found'}</p>
        </div>
      </div>
    );
  }

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const runtime = item.runtime ? `${item.runtime} min` : item.episode_run_time?.[0] ? `${item.episode_run_time[0]} min` : null;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Backdrop */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.backdrop_path ? `${BACKDROP_BASE_URL}${item.backdrop_path}` : ''})`
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '/placeholder-poster.jpg'}
              alt={title}
              className="w-64 rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">{title}</h1>

            {item.tagline && (
              <p className="text-xl text-gray-300 italic mb-4">"{item.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center space-x-1">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">{item.vote_average?.toFixed(1)}</span>
              </div>

              {releaseDate && (
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span>{new Date(releaseDate).getFullYear()}</span>
                </div>
              )}

              {runtime && (
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span>{runtime}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {item.genres?.map(genre => (
                <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-lg text-gray-200 mb-6 leading-relaxed">{item.overview}</p>

            <div className="flex gap-4 mb-8">
              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                >
                  <PlayIcon className="h-5 w-5" />
                  <span>Watch Trailer</span>
                </button>
              )}

              <Link
                to={`/${type === 'movie' ? 'movies' : 'series'}`}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Back to {type === 'movie' ? 'Movies' : 'TV Series'}
              </Link>
            </div>

            {/* Watch Providers */}
            {watchProviders && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Where to Watch</h3>
                <div className="flex flex-wrap gap-4">
                  {watchProviders.flatrate?.map(provider => (
                    <div key={provider.provider_id} className="text-center">
                      <img
                        src={`${IMAGE_BASE_URL}${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <p className="text-sm text-gray-300 mt-1">{provider.provider_name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Items */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Similar {type === 'movie' ? 'Movies' : 'TV Shows'}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {similar.slice(0, 12).map(similarItem => (
                <MovieCard key={similarItem.id} item={similarItem} type={type} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerKey={trailer?.key}
        title={title}
      />
    </div>
  );
};

export default Detail;