import { XMarkIcon } from '@heroicons/react/24/outline';

const TrailerModal = ({ isOpen, onClose, trailerKey, title }) => {
  if (!isOpen || !trailerKey) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <h3 className="text-white text-lg font-semibold">{title} - Trailer</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title={`${title} Trailer`}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;