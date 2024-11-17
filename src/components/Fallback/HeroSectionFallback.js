import React from 'react'
import { Link } from 'react-router-dom'
import { ListBulletIcon, StarIcon } from '@heroicons/react/24/solid';
import useScreenSize from '../../features/useScreenSize'
import { SkeletonText, Spinner } from '@chakra-ui/react'

const HeroSectionFallback = () => {
    const screenSize = useScreenSize()

    return (
        <div className='flex h-screen w-full'>
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <div className='flex flex-col h-full w-full items-start justify-end p-[3%] gap-5 bg-center bg-cover bg-no-repeat bg-slate-800'>
                    <div className={`w-full h-full flex justify-center items-center ${screenSize.width < 700 && 'mt-[30%]'}`}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </div>
                    <div className='w-[10%]'>
                        <SkeletonText noOfLines={2} spacing='2' skeletonHeight='2' />
                    </div>

                    <div className='flex w-full gap-1 items-center'>
                        <i>
                            <StarIcon className='w-5 h-5 text-yellow-400' />
                        </i>
                        <p className='text-white text-lg w-[2%]'>
                            <SkeletonText noOfLines={1} spacing='2' skeletonHeight='3' />
                        </p>
                        <p className='text-white'>/10</p>
                    </div>

                    <div className={`border border-[#F6F7EB] rounded-full  ${screenSize.width < 700 ? 'py-3 px-3 w-[35%]' : 'py-3 px-5 w-[10%]'}`}>
                        <p className='w-full'>
                            <SkeletonText noOfLines={2} spacing='2' skeletonHeight='2' />
                        </p>
                    </div>

                    <div className={` ${screenSize.width < 700 ? 'w-full text-justify' : 'w-[40%]'}`}>
                        <p className='text-white line-clamp-3'>
                            <SkeletonText noOfLines={screenSize.width < 700 ? 2 : 4} spacing='4' skeletonHeight='2' />
                        </p>
                    </div>

                    <div className='w-full'>
                        <Link
                            className={`h-auto w-[9rem] bg-white p-2 border rounded flex justify-center items-center gap-1 shadow-md hover:bg-white/70 ${screenSize.width < 700 ? 'w-[8rem]' : 'w-[9rem]'}`}
                        >
                            <button className={`text-black ${screenSize.width < 700 && 'text-sm'}`}>More details</button>
                            <i><ListBulletIcon className={`text-black ${screenSize.width < 700 ? 'h-4 w-4' : 'h-5 w-5'}`} /></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSectionFallback