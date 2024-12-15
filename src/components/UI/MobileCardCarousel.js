import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import MovieByList from '../Movies/MovieByList';

const MobileCardCarousel = ({ type }) => {
    const [isActive, setIsActive] = useState('popular')

    return (
        <div className='flex flex-col w-full h-full px-[3%]
        pb-[3%] pt-[5%] justify-start items-start gap-3'>
            <Menu>
                <div className='flex w-full justify-between items-center'>
                    <p className="font-bold text-white text-xl">Movies</p>
                    <MenuButton
                        as={'button'}
                        className='bg-neutral-200 rounded-lg p-[3%]'
                    >
                        <div className='w-full h-full flex justify-center items-center gap-2'>
                            <p className='capitalize font-semibold text-neutral-800 text-sm'>{isActive.replaceAll('_',' ')}</p>
                            <ChevronDownIcon className='h-5 w-5' />
                        </div>
                    </MenuButton>
                </div>
                <MenuList
                    zIndex={'50'}
                >
                    <MenuItem
                        onClick={() => setIsActive('popular')}
                    >
                        Popular
                    </MenuItem>
                    <MenuItem
                        onClick={() => setIsActive('upcoming')}>
                        Upcoming
                    </MenuItem>
                    <MenuItem
                        onClick={() => setIsActive('top_rated')}>
                        Top Rated
                    </MenuItem>
                </MenuList>
            </Menu>

            {
                <MovieByList
                    list={isActive}
                    type={type}
                />
            }
        </div>
    )
}

export default MobileCardCarousel