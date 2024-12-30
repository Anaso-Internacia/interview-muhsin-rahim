import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

/**
 * MovieDetails component displays detailed information about a specific movie
  * Features:
 * - Fetches and displays comprehensive movie details
 * - Handles loading states
 * - Error handling
 * - Responsive layout
 */
const MovieDetails = ({ movieId }) => {
// State for movie details, loading state, and errors
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   /**
   * Effect hook to fetch movie details when component mounts
   * or when movieId changes
   */
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=a0d44b84&plot=full`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return (
    <div className="flex justify-center min-h-screen bg-gray-900 p-4">
      <Loader className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 p-4 text-red-400">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/445'}
              alt={movie.Title}
              className="w-full md:w-96 h-auto object-contain rounded-xl"
            />
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
              <div className="space-y-4">
                <p className="text-gray-400">{movie.Year} • {movie.Runtime} • {movie.Rated}</p>
                <p className="text-gray-300">{movie.Plot}</p>
                <div className="grid gap-4">
                  <p><span className="text-gray-400">Director:</span> {movie.Director}</p>
                  <p><span className="text-gray-400">Writers:</span> {movie.Writer}</p>
                  <p><span className="text-gray-400">Actors:</span> {movie.Actors}</p>
                  <p><span className="text-gray-400">Genre:</span> {movie.Genre}</p>
                  <p><span className="text-gray-400">Awards:</span> {movie.Awards}</p>
                  <p><span className="text-gray-400">IMDb Rating:</span> {movie.imdbRating}/10</p>
                </div>
                <a 
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  View on IMDb
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;