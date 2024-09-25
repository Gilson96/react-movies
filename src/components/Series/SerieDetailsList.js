import React from 'react'
import { CalendarIcon, CurrencyPoundIcon, GlobeAltIcon, StarIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import useScreenSize from '../../features/useScreenSize'

const SerieDetailsList = ({serieDetails}) => {
    const screenSize = useScreenSize()
    console.log(serieDetails)
    return (
        <>
            <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                <p className='text-sm text-white italic font-bold'>Release Year</p>
                <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%]'>
                    <CalendarIcon className='h-10 w-10 text-white' />
                    <p className='font-bold text-4xl text-white '>{serieDetails.first_air_date.slice(0, 4)}</p>
                </div>
            </div>

            {serieDetails.number_of_seasons !== 0 ?
                <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                    <p className='text-sm text-white italic font-bold'>Seasons</p>
                    <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%]'>
                        <p className='font-bold text-4xl text-white'>{serieDetails.number_of_seasons}</p>
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
                    <p className='font-bold text-4xl text-white '>{serieDetails.origin_country.join('/')}</p>
                </div>
            </div>

            <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                <p className='text-sm text-white italic font-bold'>ep. Runtime</p>
                <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%] '>
                    <VideoCameraIcon className='h-10 w-10 text-white' />
                    <p className='font-bold text-4xl text-white'>{serieDetails.episode_run_time}min</p>
                </div>
            </div>

            <div className='border border-[#F6F7EB] bg-gray-400/70 w-[12rem] h-[7rem] rounded-xl p-2 flex flex-col justify-center items-center'>
                <p className='text-sm text-white italic font-bold'>Rating</p>
                <div className='flex justify-center items-center h-full w-full gap-3 pr-[5%] tablet:w-[9rem]'>
                    <StarIcon className='h-10 w-10 text-white' />
                    <p className='font-bold text-4xl text-white'>{serieDetails.vote_average.toFixed(1)}</p>
                </div>
            </div>
        </>
    )
}

export default SerieDetailsList