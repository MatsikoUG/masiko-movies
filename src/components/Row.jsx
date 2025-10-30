import { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import LoadingSkeleton from './LoadingSkeleton';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Row = ({ title, fetchData, type = 'movie' }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rowRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchData();
        setItems(response.data.results || []);
      } catch (err) {
        setError('Failed to load content');
        console.error('Error loading row data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData]);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>

      {loading ? (
        <div className="flex space-x-2 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <LoadingSkeleton key={i} className="flex-shrink-0 w-40" />
          ))}
        </div>
      ) : (
        <div className="relative group">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <div
            ref={rowRef}
            className="flex space-x-2 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-40">
                <MovieCard item={item} type={type} />
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Row;