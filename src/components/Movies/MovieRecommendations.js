import React from 'react'
import { useGetMovieRecommendationsQuery } from '../../features/Movies/allMoviesApi'
import { Link } from "react-router-dom";
import Card from '../Card'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const MovieRecommendations = ({ movieId, slidesPerView, modules, spaceBetween, id }) => {

    const { data: movieRecommendations = [], isLoading } = useGetMovieRecommendationsQuery(parseInt(movieId))

    if (isLoading) return <p>Loading</p>

    return (
        <div className='mt-[1%]'>
            {movieRecommendations.results.length !== 0 ?
                <Swiper
                    className="h-[32rem] w-full"
                    slidesPerView={slidesPerView}
                    spaceBetween={spaceBetween}
                >
                    {movieRecommendations.results.filter(movie => movie.poster_path !== null).map(movie => (
                        <>
                            <SwiperSlide>
                                <Link to={`/movies/${movie.id}`}>
                                    <Card
                                        image={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                                        rating={movie.vote_average}
                                        title={movie.title}
                                        setGetId={() => { }}
                                        setNavigate={() => { }}
                                        year={movie.release_date.slice(0, 4)}
                                    />
                                </Link>
                            </SwiperSlide>
                        </>
                    ))}
                </Swiper >
                :
                <p className='font-bold'>Not Available</p>
            }
        </div>
    )
}

export default MovieRecommendations