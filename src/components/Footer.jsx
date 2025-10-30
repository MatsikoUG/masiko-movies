const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Built by AINEBYOONA CALVIN MATSIKO
          </p>

          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="mailto:calvinkellerman443@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              PayPal
            </a>
            <a
              href="mailto:calvinkellerman443@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Email
            </a>
          </div>

          <p className="text-sm text-gray-500">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;