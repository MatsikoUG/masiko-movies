import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../utils/tmdb';
import { PlayIcon } from '@heroicons/react/24/solid';

const MovieCard = ({ item, type = 'movie' }) => {
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';

  return (
    <div className="group relative">
      <Link to={`/${type}/${item.id}`} className="block">
        <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105">
          <img
            src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '/placeholder-poster.jpg'}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 rounded-full p-3">
              <PlayIcon className="h-6 w-6 text-black" />
            </div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
            {item.vote_average?.toFixed(1) || 'N/A'}
          </div>
        </div>
      </Link>

      <div className="mt-2 px-1">
        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 group-hover:text-gray-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-xs">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;