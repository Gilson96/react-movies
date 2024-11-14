import React from 'react'
import { Link } from 'react-router-dom'
import { ListBulletIcon } from '@heroicons/react/24/solid';

const HeroSectionFallback = () => {
    return (
        <div className='h-screen w-full flex flex-col'>
            <div className='w-full h-full flex justify-center items-center'>
                <p className='text-white'>Is Loading</p>
            </div>
            <div className='w-full flex flex-col justify-end h-full p-[3%]'>
                <Link
                    className='h-auto w-[9rem] bg-blue-500 p-2 border border-blue-500 rounded flex justify-center items-center gap-1'
                >
                    <button className='text-white'>More details</button>
                    <i><ListBulletIcon className='h-5 w-5 text-white' /></i>
                </Link>
            </div>
        </div>
    )
}

export default HeroSectionFallback