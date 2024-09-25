import React from 'react'
import { useGetSerieRecommendationsQuery } from '../../features/Series/allSeriesApi'
import Card from '../Card'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Link } from "react-router-dom";

const SerieRecommendations = ({ serieId, slidesPerView, modules, spaceBetween, id }) => {
    const { data: serieRecommendations = [], isLoading } = useGetSerieRecommendationsQuery(parseInt(serieId))

    console.log(serieRecommendations)

    if (isLoading) return <p>Loading</p>

    return (
        <div className='mt-[1%]'>
            {serieRecommendations.results.length !== 0 ?
                <Swiper
                    className="h-[32rem] w-full"
                    slidesPerView={slidesPerView}
                    spaceBetween={spaceBetween}
                >
                    {serieRecommendations.results.filter(serie => serie.poster_path !== null).map(serie => (
                        <>
                            <SwiperSlide>
                                <Link to={`/series/${serie.id}`}>
                                    <Card
                                        image={`https://image.tmdb.org/t/p/w342/${serie.poster_path}`}
                                        rating={serie.vote_average}
                                        title={serie.name}
                                        setGetId={() => { }}
                                        setNavigate={() => { }}
                                        year={serie.first_air_date.slice(0, 4)}
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

export default SerieRecommendations