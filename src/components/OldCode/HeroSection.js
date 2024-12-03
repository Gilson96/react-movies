import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ListBulletIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/solid';
import { useGetMovieGenreListQuery } from '../../features/Movies/moviesByGenreApi';
import useScreenSize from '../../features/useScreenSize'
import HeroSectionFallback from '../Fallback/HeroSectionFallback';

const HeroSection = ({ data, type, setIsActive, isActive, handleGenre }) => {
    const { data: genreList = [], isLoading } = useGetMovieGenreListQuery('movie')
    const screenSize = useScreenSize()

    handleGenre = (movie) => {
        let movieGenreName = []
        let movieGenreId = 0

        for (let i = 0; i < movie.genre_ids.length; i++) {

            movieGenreId = movie.genre_ids[i]

            for (let i = 0; i < genreList.genres.length; i++) {
                if (genreList.genres[i].id === movieGenreId)
                    movieGenreName.push(genreList.genres[i].name)
            }
        }
        return movieGenreName
    }

    return (
        <div className='w-full h-full'>

            {isLoading ?
                <HeroSectionFallback />
                :
                <Swiper
                    modules={[Pagination]}
                    className="flex h-[40rem] w-full"
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                >
                    {data.results.map((data, index) => (
                        <SwiperSlide key={index} className='flex justify-center items-center'>
                            <div className='flex w-full h-full justify-center items-center '>
                                <div
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('https://image.tmdb.org/t/p/w1280/${data.backdrop_path}')`,
                                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
                                    }}
                                    className='flex flex-col h-full w-full items-start justify-end p-[3%] gap-5'
                                >

                                    <p className={`text-white font-bold ${screenSize.width < 700 ? 'text-2xl' : 'text-3xl'} `}>{data.name || data.title}</p>
                                    <div className='flex gap-3'>
                                        <div className='flex gap-1 items-center'>
                                            <i><StarIcon className='w-5 h-5 text-yellow-400' /></i>
                                            <p className='text-white text-lg'>{data.vote_average.toFixed(1)}/10</p>
                                        </div>

                                    </div>
                                    <div className={`flex gap-2 w-full flex-warp`}>
                                        {handleGenre(data).map(genre =>
                                            <div className={`border border-[#F6F7EB] rounded-full  ${screenSize.width < 700 ? 'py-3 px-3' : 'py-3 px-5'}`}>
                                                <p className={`text-[#F6F7EB] font-bold ${screenSize.width < 700 && 'text-xs'} `}> {genre}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className={` ${screenSize.width < 700 ? 'w-full text-justify' : 'w-[40%]'}`}>
                                        <p className='text-white line-clamp-3'>{data.overview}</p>
                                    </div>
                                    <div className='w-full'>
                                        <Link
                                            to={`movies/${data.id}`}
                                            state={type}
                                        >
                                            <button className={`px-8 py-3 font-medium bg-cyan-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-xl text-sm`}>
                                                See more
                                            </button>
                                            <i><ListBulletIcon className={`text-black ${screenSize.width < 700 ? 'h-4 w-4' : 'h-5 w-5'}`} /></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </div>
    )
}



export default HeroSection