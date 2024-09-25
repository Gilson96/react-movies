import React from 'react'
import { CalendarIcon, CurrencyPoundIcon, GlobeAltIcon, StarIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import useScreenSize from '../../features/useScreenSize'

const MovieDetailsList = ({ movieDetails }) => {
    const screenSize = useScreenSize()
    return (
        <>
            <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                <p className='text-sm text-white italic font-bold'>Release Year</p>
                <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%]'>
                    <CalendarIcon className='h-10 w-10 text-white' />
                    <p className='font-bold text-4xl text-white '>{movieDetails.release_date.slice(0, 4)}</p>
                </div>
            </div>

            {movieDetails.revenue !== 0 ?
                <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                    <p className='text-sm text-white italic font-bold'>Revenue</p>
                    <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%]'>
                        <CurrencyPoundIcon className='h-10 w-10 text-white' />
                        <p className='font-bold text-4xl text-white'>{String(movieDetails.revenue).slice(0, 2)}M</p>
                    </div>
                </div>
                :
                <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                    <p className='text-sm text-white italic font-bold'>Revenue</p>
                    <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%]'>
                        {screenSize.width < 1000 ?
                            <p className='font-bold text-2xl text-white pl-[5%] w-[8rem] text-center'>N/A</p>
                            :
                            <p className='font-bold text-2xl text-white pl-[5%]'>Not Available</p>
                        }
                    </div>
                </div>
            }
            <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                <p className='text-sm text-white italic font-bold'>Origin Country</p>
                <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%] tablet:w-[9rem]'>
                    <GlobeAltIcon className='h-10 w-10 text-white ' />
                    <p className='font-bold text-4xl text-white '>{movieDetails.origin_country.join('/')}</p>
                </div>
            </div>

            <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                <p className='text-sm text-white italic font-bold'>Runtime</p>
                <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%] '>
                    <VideoCameraIcon className='h-10 w-10 text-white' />
                    <p className='font-bold text-4xl text-white'>{movieDetails.runtime}min</p>
                </div>
            </div>

            <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                <p className='text-sm text-white italic font-bold'>Rating</p>
                <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%] tablet:w-[9rem]'>
                    <StarIcon className='h-10 w-10 text-white' />
                    <p className='font-bold text-4xl text-white'>{movieDetails.vote_average.toFixed(1)}</p>
                </div>
            </div>
        </>
    )
}

export default MovieDetailsList