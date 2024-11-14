import './App.css';
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import MovieDetails from './components/Movies/MovieDetails';
import MyMovies from './components/Account/MyMovies';
import useScreenSize from './features/useScreenSize';
import AllMovies from './components/Movies/AllMovies';

function App() {
  const screenSize = useScreenSize()
  return (
    <div className={`flex flex-col w-full h-full bg-[#090E17] bg-no-repeat bg-cover bg-center`}>
   
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/allMovies' element={<AllMovies />} />
          <Route path='/movies/:movieId' element={<MovieDetails />} />
          <Route path='/movies/myMovies' element={<MyMovies />} />
        </Routes>
    
    </div>
  );
}

export default App;
