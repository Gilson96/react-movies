import React from 'react'

const MovieCompanies = ({ movieDetails, movieId }) => {

    return (
        <div className='flex flex-wrap h-auto w-full mt-[4%] gap-[3rem]'>
            {movieDetails.production_companies.length !== 0 ?
                movieDetails.production_companies.filter(company => company.logo_path !== null).map(companies => (
                    <img src={`https://image.tmdb.org/t/p/w500/${companies.logo_path}`} className='max-h-[4rem]  w-auto' alt='company logo' />
                ))
                :
                <p className='font-bold'>Not Available</p>
            }
        </div>
    )
}

export default MovieCompanies