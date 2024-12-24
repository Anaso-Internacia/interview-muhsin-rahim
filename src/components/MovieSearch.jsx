import React, { useState } from 'react';
import { Loader } from 'lucide-react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const searchMovies = async (searchQuery) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=a0d44b84`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'No results found');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMovies(query);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {movies && movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex flex-col md:flex-row gap-4 hover:bg-gray-100 p-4 rounded-lg transition-colors"
            >
              <div className="w-full md:w-64 flex-shrink-0">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/445'}
                  alt={movie.Title}
                  className="w-full aspect-video object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{movie.Title}</h2>
                <p className="text-gray-600 mb-2">{movie.Year}</p>
                <p className="text-gray-500">Type: {movie.Type}</p>
                <p className="text-blue-600 text-sm mt-2">IMDB ID: {movie.imdbID}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
