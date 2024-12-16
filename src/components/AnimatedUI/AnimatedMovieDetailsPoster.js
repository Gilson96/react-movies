import AnimatedButton from "../AnimatedUI/AnimatedButton";
import AddMoviesToAccount from "../Movies/AddMoviesToAccount";
import {
    usePostToFavouriteMoviesMutation,
    usePostToWatchlistMoviesMutation,
} from '../../features/Account/accountApi'

const AnimatedPoster = ({ movieDetails }) => {
    const [addToFavourite] = usePostToFavouriteMoviesMutation()
    const [addToWatchlist] = usePostToWatchlistMoviesMutation()

    return (
        <div className="w-full h-full rounded-lg transition-all duration-500 flex justify-between items-start">
            {/* movie poster */}
            <div
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
                className="flex items-center justify-center overflow-hidden rounded-[7px] p-[4rem] transition-colors duration-500 h-full w-[60%] animate__animated animate__fadeIn"
            >
                <img src={`https://image.tmdb.org/t/p/w1280/${movieDetails.poster_path}`} alt='poster' className="rounded-[7px]" />
            </div>

            {/* movie details left */}
            <div className="flex flex-col justify-between gap-[2rem] h-full w-[40%] border-neutral-700">
                {/* movie title */}
                <h1
                    className="text-4xl font-bold capitalize animate__animated animate__fadeInDown p-[2%]"
                    id="movieDetailsTitleAnimation"
                >
                    {movieDetails.title || movieDetails.name}
                </h1>
                {/* movie genres */}
                <div
                    className="p-[2%] animate__animated animate__fadeInDown"
                    id="movieDetailsGenresAnimation"
                >
                    <p className="text-xl text-neutral-500">Genres:</p>
                    <hr className="border-neutral-700 w-full h-[px] mb-[3%] " />
                    <div className="flex flex-wrap w-full gap-2">
                        {movieDetails.genres.length > 0 ?
                            movieDetails.genres.map(genre =>
                                <AnimatedButton genreName={genre.name} />
                            )
                            :
                            'Not Available'
                        }
                    </div>
                </div>

                {/* Movie Overview */}
                <div
                    className="w-full  px-[2%] animate__animated animate__fadeInDown"
                    id="movieDetailsOverviewAnimation"
                >
                    <p className="text-xl text-neutral-500">Overview:</p>
                    <hr className="border-neutral-700 w-full h-[px] mb-[3%]" />
                    <p className="text-justify overflow-hidden text-base font-light animate__animated line-clamp-6">{movieDetails.overview === '' ? 'Not Available' : movieDetails.overview}</p>
                </div>

                {/* Add to Account buttons */}
                <div className="w-full h-full animate__animated animate__fadeIn">
                    <AddMoviesToAccount
                        movieDetails={movieDetails}
                        addToWatchlist={addToWatchlist}
                        addToFavourite={addToFavourite}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnimatedPoster;