import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';

const MovieDetailsWrapper = () => {
  const { id } = useParams();
  return <MovieDetails movieId={id} />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 py-4 mb-6">
          <h1 className="text-2xl text-gray-100 text-center font-bold">ANA.SO Movie Search</h1>
        </header>
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<MovieDetailsWrapper />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;