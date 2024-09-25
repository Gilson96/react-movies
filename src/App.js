import './App.css';
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import MovieDetails from './components/Movies/MovieDetails';
import SerieDetails from './components/Series/SerieDetails'
import MyMovies from './components/Account/MyMovies';
import MySeries from './components/Account/MySeries'

function App() {
  return (
    <div className={`flex flex-col w-full h-full bg-background bg-no-repeat bg-cover bg-center`}>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
          <Route path='/movies/:movieId' element={<MovieDetails />} />
          <Route path='/movies/myMovies' element={<MyMovies />} />
          <Route path='/series/mySeries' element={<MySeries />} />
          <Route path='/series/:serieId' element={<SerieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
