import React from 'react'

const MovieDetailsList = ({ movieDetails, type }) => {
    return (
        <div className='w-full h-full flex justify-start gap-10 small-phone:justify-between'>

            <div className=''>
                <p className='text-white font-bold text-lg my-[2%]'>Information</p>
                <div className='flex flex-col my-2'>
                    {type === 'movie' &&
                        <>
                            <p className='text-gray-400'>Runtime</p>
                            <p className='text-white'>{movieDetails.runtime}min</p>
                        </>
                    }
                    {type === 'tv' &&
                        <>
                            <p className='text-gray-400'>Seasons</p>
                            <p className='text-white'>{movieDetails.seasons.length}</p>
                        </>
                    }

                </div>
                <div className='flex flex-col my-2'>
                    <p className='text-gray-400'>Release date</p>
                    <p className='text-white'>{movieDetails.release_date || movieDetails.first_air_date}</p>
                </div>
            </div>
            <div>
                <p className='text-white font-bold text-lg my-[2%]'>Languges</p>
                <div className='flex flex-col my-2 flex-wrap'>
                    <p className='text-gray-400'>Country</p>
                    <p className='text-white'>{movieDetails.origin_country.join('/')}</p>
                </div>
                <div className='flex flex-col my-2'>
                    <p className='text-gray-400'>Original Audio</p>
                    <p className='text-white '>{movieDetails.original_language}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsList