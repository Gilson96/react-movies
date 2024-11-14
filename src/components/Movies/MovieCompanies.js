import React from 'react'

const MovieCompanies = ({ movieDetails, movieId }) => {

    return (
        <div className='mt-2 flex items-center gap-2'>
            {movieDetails.production_companies.length !== 0 ?
                movieDetails.production_companies.filter(company => company.logo_path !== null).map(companies => (
                    <div className='border border-slate-00 w-auto h-auto p-2 rounded-xl bg-slate-400/30 flex justify-center'>
                        <img src={`https://image.tmdb.org/t/p/w500/${companies.logo_path}`} className='max-h-[10rem]' alt='company logo' />
                    </div>
                ))
                :
                <p className='font-bold'>Not Available</p>
            }
        </div>
    )
}

export default MovieCompanies