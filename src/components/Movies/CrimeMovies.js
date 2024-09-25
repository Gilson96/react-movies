import { useState } from 'react'
import Card from '../Card'
import { useGetCrimeMoviesQuery } from '../../features/Movies/moviesByGenreApi'
import { Navigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const CrimeMovies = ({slidesPerView, spaceBetween}) => {
    const [getId, setGetId] = useState()
    const [navigate, setNavigate] = useState(false)
    const { data: crimeMovies = [], isLoading } = useGetCrimeMoviesQuery()

    if (isLoading) return <p>Loading...</p>

    return (
        <>
            {navigate && <Navigate to={`/movies/${getId}`} />}
            <Swiper
                className="h-[32rem] w-full"
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
            >
                {crimeMovies.results.filter(movie => movie.backdrop_path !== null).map(movie => (

                    <>
                        <SwiperSlide>
                            <Card
                                image={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                                rating={movie.vote_average}
                                title={movie.title}
                                getId={movie.id}
                                setGetId={setGetId}
                                navigate={true}
                                setNavigate={setNavigate}
                                year={movie.release_date.slice(0, 4)}
                            />
                        </SwiperSlide>
                    </>
                ))}
            </Swiper >
        </>
    )
}

export default CrimeMovies