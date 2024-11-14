import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({ title, image, setGetId, getId, type, screenSize }) => {

    return (

        <div className={`flex flex-col rounded-xl gap-3 cursor-pointer ${screenSize.width < 700 ? 'h-[10rem] w-[7rem]' : 'h-[20rem] w-[15rem]'}`}>
            <Link to={`/movies/${getId}`} className='w-full h-full' state={type}>
                <div className='h-full w-full'>
                    <img src={image} alt='backdoor' className='h-full w-full rounded-xl' />
                </div>
                <div className='flex flex-col w-full h-full gap-1'>
                    <p className='font-bold text-white w-[70%]'>{title}</p>
                </div>
            </Link>
        </div>

    )
}

export default Card