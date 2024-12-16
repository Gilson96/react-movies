import React from 'react'

const MovieDetailsList = ({ movieDetails, type }) => {

    return (
        <div className='w-full h-full flex flex-col justify-between itmes-center px-[2%] py-[6%] gap-6'>

            {/* Information */}
            <div
                className='w-full flex flex-col gap-1 mt-[2%] animate__animated animate__fadeInDown'
            >
                <div className='w-full flex flex-col'>
                    <h1 className='text-xl text-neutral-500 '>Information:</h1>
                    <hr className='border-neutral-700 w-full h-[px] ' />
                </div>

                {/* Columns */}
                <div
                    className='flex w-full justify-between animate__animated animate__fadeInDown'
                    id="movieDetailsInformationAnimation"
                >
                    {/* First Column */}
                    <div className='flex flex-col gap-1'>
                        {/* Runtime */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500'>{type === 'movie' ? 'Runtime:' : 'Seasons:'}</h1>
                            <p className='text-neutral-300 text-base font-light'>{type === 'movie' ? movieDetails.runtime > 0 ? movieDetails.runtime + 'min' : 'Not Available' : movieDetails.seasons.length}</p>
                        </div>
                        {/* Year */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500'>Year:</h1>
                            <p className='text-neutral-300 text-base font-light'>
                                {type === 'movie' ? movieDetails.release_date.slice(0, 4) : movieDetails.first_air_date.slice(0, 4)}
                            </p>
                        </div>
                        {/* Status */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500'>Status:</h1>
                            <p className='text-neutral-300 text-base font-light'>{movieDetails.status}</p>
                        </div>
                    </div>

                    {/*Second Column */}
                    <div
                        className='flex flex-col gap-1 animate__animated animate__fadeInDown'
                        id='movieDetailsCompaniesAnimation'
                    >
                        {/* Country */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500 '>Country:</h1>
                            {movieDetails.origin_country.map(flag => (
                                <img src={`https://flagsapi.com/${flag}/flat/24.png`} alt='#' />
                            ))}
                        </div>
                        {/* Langugage */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500'>Language:</h1>
                            <p className='text-neutral-300 text-base font-light'>{movieDetails.spoken_languages <= 0 ? 'Not Available' : movieDetails.spoken_languages.slice(0, 2).map(language => language.english_name).join('/')}</p>
                        </div>
                        {/* Homepage */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500 '>Homepage:</h1>
                            <div className='rounded-lg border-[1px] border-neutral-500 bg-neutral-700 px-2 py-1  text-neutral-300 transition-all ease-in-out duration-700 hover:text-neutral-500 hover:bg-neutral-800 hover:underline'>
                                <p className='text-sm font-light'>{movieDetails.homepage ? <a href={movieDetails.homepage}>Official Website</a> : 'Not Available'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Third Column */}
                    <div className='flex flex-col gap-1'>
                        {/* Votes */}
                        <div className='flex items-center gap-1'>
                            <h1 className='text-base text-neutral-500 '>Votes:</h1>
                            <p className='text-neutral-300 text-base font-light'>{movieDetails.vote_average.toFixed(1)}<span className='italic text-sm'>{'(' + movieDetails.vote_count + ' votes)'}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Companies */}
            <div
                className='w-full flex flex-col gap-1 pb-[19%] animate__animated animate__fadeInDown'
                id="movieDetailsCompaniesAnimation"
            >
                <div className='flex flex-col gap-1 pb-[1%]'>
                    <h1 className='text-xl text-neutral-500'>Companies</h1>
                    <hr className='border-neutral-700 w-full h-[px]' />
                </div>
                <div className='flex flex-wrap w-full gap-2 pb-[7%]'>
                    {movieDetails.production_companies <= 0 ? 'Not Available' : movieDetails.production_companies.map(company => (
                        <div className='rounded-lg border-[1px] border-neutral-500 bg-neutral-700 px-2 py-1 uppercase text-neutral-300 text-sm font-light"
    '>
                            <span>{company.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsList