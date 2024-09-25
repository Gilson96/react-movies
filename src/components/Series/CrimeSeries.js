import { useState } from 'react'
import Card from '../Card'
import { useGetCrimeSeriesQuery } from '../../features/Series/seriesByGenreApi'
import { Navigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { CircularProgress } from '@chakra-ui/react'

const CrimeSeries = ({slidesPerView, spaceBetween}) => {
    const [getId, setGetId] = useState()
    const [navigate, setNavigate] = useState(false)
    const { data: crimeSeries = [], isLoading } = useGetCrimeSeriesQuery()
    
    return (
        <>
            {isLoading ?
                <CircularProgress
                    isIndeterminate
                    color='green.300'
                />
                :
                <>
                    {navigate && <Navigate to={`/series/${getId}`} />}
                    <Swiper
                        className="h-[32rem] w-full"
                        slidesPerView={slidesPerView}
                        spaceBetween={spaceBetween}
                    >
                        {crimeSeries.results.filter(serie => serie.backdrop_path !== null).map(serie => (
                            <>
                                <SwiperSlide>
                                    <Card
                                        image={`https://image.tmdb.org/t/p/w342/${serie.poster_path}`}
                                        rating={serie.vote_average}
                                        title={serie.name}
                                        getId={serie.id}
                                        setGetId={setGetId}
                                        navigate={true}
                                        setNavigate={setNavigate}
                                        year={serie.first_air_date.slice(0, 4)}
                                    />
                                </SwiperSlide>
                            </>
                        ))}
                    </Swiper >
                </>
            }
        </>
    )
}

export default CrimeSeries