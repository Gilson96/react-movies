import React from 'react'
import { useGetSerieActorsQuery } from '../../features/Series/allSeriesApi'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Avatar } from '@chakra-ui/react'
import { CircularProgress } from '@chakra-ui/react'

const SerieActors = ({ serieId, slidesPerView, spaceBetween }) => {
    const { data: serieActors = [], isLoading } = useGetSerieActorsQuery(parseInt(serieId))

    return (
        <>
            {isLoading ?
                <CircularProgress
                    isIndeterminate
                    color='green.300'
                />
                :
                serieActors.length !== 0 ?
                    <Swiper
                        pagination={{
                            clickable: true,
                        }}
                        className="h-auto mt-[2%] w-full"
                        slidesPerView={slidesPerView}
                        spaceBetween={spaceBetween}
                    >
                        {serieActors.cast.map(actors => (
                            <SwiperSlide>
                                <div className='flex flex-col justify-center items-center w-full'>
                                    <Avatar size='xl' name={actors.name} src={`https://image.tmdb.org/t/p/w342/${actors.profile_path}`} />
                                    <p className='text-xs text-white italic'>{actors.name}</p>
                                    <p className='text-xs text-white italic text-center'>{actors.character}</p>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                    :
                    <p className='font-bold'>Not Available</p>
            }
        </>
    )
}

export default SerieActors