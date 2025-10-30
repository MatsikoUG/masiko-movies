import Hero from '../components/Hero';
import Row from '../components/Row';
import Footer from '../components/Footer';
import { tmdbApi } from '../utils/tmdb';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-32 relative z-20">
        <Row
          title="Trending Now"
          fetchData={tmdbApi.getTrending}
          type="movie"
        />

        <Row
          title="Popular on Matsiko Movies"
          fetchData={tmdbApi.getPopularMovies}
          type="movie"
        />

        <Row
          title="Top Rated Movies"
          fetchData={tmdbApi.getTopRatedMovies}
          type="movie"
        />

        <Row
          title="Popular TV Shows"
          fetchData={tmdbApi.getPopularTV}
          type="tv"
        />

        <Row
          title="Top Rated TV Shows"
          fetchData={tmdbApi.getTopRatedTV}
          type="tv"
        />

        <Row
          title="Now Playing"
          fetchData={tmdbApi.getNowPlayingMovies}
          type="movie"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;