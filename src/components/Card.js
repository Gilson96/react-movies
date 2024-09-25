import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'

const Card = ({ tags, title, rating, image, setGetId, getId, setNavigate, navigate, year }) => {

    return (

        <div className='flex flex-col h-[20rem] w-[15rem] rounded-xl gap-3 cursor-pointer shadow-2xl' onClick={() => { setGetId(getId); setNavigate(navigate) }}>
            <div className='h-full w-full'>
                <img src={image} alt='backdoor' className='h-full w-full rounded-xl' />
            </div>
            <div className='flex flex-col w-full h-full gap-1'>
                <p className='font-bold'>{title}</p>
                <div className='flex w-full h-full items-center  gap-2'>
                    <div className='flex items-center gap-1'>
                        {rating !== undefined ?
                            <>
                                <i>< StarIcon className='h-5 w-5 text-yellow-400' /></i>
                                <p>{rating !== undefined ? rating.toFixed(1) : ''}</p>
                            </>
                            : ''
                        }
                    </div>
                    {rating !== undefined ? <p className='w-1'>|</p> : ''}
                    <div>
                        <p>{year}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card