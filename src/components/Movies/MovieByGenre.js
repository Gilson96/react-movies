import { useGetMovieByGenreQuery } from '../../features/Movies/moviesByGenreApi'
import { Link } from "react-router-dom";
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const MovieByGenre = ({ genre, title, type, genreName }) => {
    const { data: movieByGenre = [], isLoading } = useGetMovieByGenreQuery({ genre: genre, type: type })

    if (isLoading) return <p>is Loading</p>
    return (
        <>
            <Link to={`allMovies`} state={[genreName, type, genre]}>
                <div className='h-[27.5rem] w-[22rem] bg-gray-800 flex flex-col p-2 rounded-lg hover:bg-slate-700 max-small-phone:h-[20rem] max-small-phone:w-[17rem]'>
                    <div className='flex justify-between p-[1%]'>
                        {movieByGenre.results.slice(0, 2).map(movie =>
                            <img
                                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                                alt='backdrop'
                                className='h-[12rem] w-[10rem] rounded-lg max-small-phone:h-[9rem] max-small-phone:w-[6rem]' />
                        )}
                    </div>
                    <div className='flex justify-between p-[1%]'>
                        {movieByGenre.results.filter(movie => movie.backdrop_path !== null).slice(2, 4).map(movie =>
                            <img
                                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                                alt='backdrop'
                                className='h-[12rem] w-[10rem] rounded-lg max-small-phone:h-[9rem] max-small-phone:w-[6rem]'
                            />
                        )}
                    </div>
                    <div className='flex w-full justify-between px-2 items-center'>
                        <p className='text-white text-lg capitalize'>{genreName}</p>
                        <i><ArrowRightIcon className='h-7 w-7 text-white rounded-lg' /></i>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default MovieByGenre