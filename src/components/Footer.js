import React from 'react'
import { FilmIcon } from '@heroicons/react/24/outline'

const Footer = () => {
    return (
        <div className='flex flex-col w-full h-full justify-center items-center'>

            <div className='flex w-auto h-auto justify-center items-center gap-2 my-[3%]'>
                <p className='text-3xl text-white font-bold'>React-Movies</p>
                <FilmIcon className='h-12 w-12 text-white' />
            </div>

            <div className='flex justify-center items-center gap-2'>
                <div className='w-[17rem] h-[7rem] border flex flex-col justify-center items-center rounded-xl'>
                    <p className='text-white font-bold'>Contact and repository</p>
                    <div></div>
                </div>
            </div>

            <hr className='w-full h-[px] bg-white my-[2%]'/>
            <p className='text-white mb-[1%]'>React-movies 2024 by Gilson de Almeida</p>
        </div>
    )
}

export default Footer