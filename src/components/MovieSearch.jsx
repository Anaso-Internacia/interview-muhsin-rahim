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
       className="flex-1 p-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
     />
     <button
       type="submit"
       className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
     >
       Search
     </button>
   </div>
 </form>

 {movies.map((movie) => (
   <div
     key={movie.imdbID}
     className="flex flex-col md:flex-row gap-4 bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-colors mb-4"
   >
     <div className="w-full md:w-64 flex-shrink-0">
       <img
         src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/445'}
         alt={movie.Title}
         className="w-full h-auto object-contain rounded-xl"
       />
     </div>
     <div className="flex-grow">
       <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
       <p className="text-gray-400 mb-2">{movie.Year}</p>
       <p className="text-gray-500">Type: {movie.Type}</p>
       <a 
         href={`https://www.imdb.com/title/${movie.imdbID}`}
         target="_blank"
         rel="noopener noreferrer"
         className="text-blue-400 hover:text-blue-300 text-sm mt-4 inline-block transition-colors"
       >
         View on IMDB →
       </a>
     </div>
   </div>
 ))}
</div>
  );
};

export default MovieSearch;
