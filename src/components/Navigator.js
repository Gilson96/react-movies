import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { FilmIcon } from '@heroicons/react/24/outline'
import { useSearchMoviesQuery } from '../features/Movies/allMoviesApi'
import Card from '../components/Card'
import SearchedMovie from './Movies/SearchedMovie'
import { useDisclosure } from '@chakra-ui/react'
import Account from './Account/Account'
import { SkeletonText, Box } from '@chakra-ui/react'
import useScreenSize from '../features/useScreenSize'
import { motion, useScroll, useSpring, useTransform } from "framer-motion"


const Navigator = ({ setIsActive, isActive, scrollY }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isFocus, setIsFocus] = useState('movie')
    const [showSearch, setShowSearch] = useState(false)
    const [inputValue, setInputValue] = useState()
    const screenSize = useScreenSize()

    const { data: searchMovies = [], isLoading } = useSearchMoviesQuery({ title: inputValue, type: isFocus })

    const handleInputValue = (e) => {
        setInputValue(e.target.value)
    }


    return (
        <motion.div
            className={`${scrollY > 0 ? 'sticky bg-white' : 'h-auto w-full absolute top-0 z-30 py-[1%] px-[3%] backdrop-blur-sm'}`}>
            <div className='flex w-full h-[4rem] justify-between items-center'>

                <div className='flex w-auto h-auto justify-center items-center gap-2 '>
                    <p className={`text-white font-bold text-3xl ${screenSize.width < 700 && 'hidden'}`}>React-Movies</p>
                    <FilmIcon className={`h-12 w-12 text-white ${screenSize.width < 700 && 'w-7 h-7'}`} />
                </div>

                <div className={`flex justify-between items-center border rounded-full pl-[2%] pr-[5px] bg-slate-950 h-[3.2rem]
                     ${screenSize.width < 700 && 'w-[50%]'}`}>
                    <div
                        className={`flex justify-center items-center text-slate-400 cursor-pointer w-[5rem]`}
                        onClick={() => { setIsActive('movie'); setIsFocus('movie') }}
                    >
                        <p className={` ${isFocus === 'movie' ? 'text-white' : ''} ${screenSize.width < 700 && 'text-xs'}`}>Movies</p>
                    </div>
                    <p
                        className={`flex justify-center items-center text-slate-400 cursor-pointer w-[5rem]`}
                        onClick={() => { setIsActive('tv'); setIsFocus('tv') }}
                    >
                        <p className={` ${isFocus === 'tv' ? 'text-white' : ''} ${screenSize.width < 700 && 'text-xs'}`}>Series</p>
                    </p>
                    <i
                        className={`bg-slate-700 flex justify-center items-center w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer ${screenSize.width < 700 && 'h-[2rem] w-[2.3rem] p-1'}`}
                        onClick={() => { setShowSearch(true); onOpen(); }}
                    >
                        <MagnifyingGlassIcon className='w-4 h-4 text-white' />
                    </i>
                </div>
                <Account />
            </div >

        </motion.div>
    )
}

export default Navigator

{/* {showSearch &&
                <SearchedMovie
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <div className='flex flex-col w-full h-full gap-2'>
                        <div className='w-full flex justify-center items-center'>
                            <input
                                className={`flex h-[2rem] rounded-full p-3 bg-slate-200 border ${screenSize.width < 700 ? 'w-[90%]' : 'w-full'}`}
                                type='text'
                                value={inputValue}
                                onChange={handleInputValue}
                                placeholder='search'
                            />
                        </div>

                        <div className='flex flex-wrap h-full w-full justify-center items-center gap-2'>

                            {isLoading ?
                                <>
                                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                                    </Box>
                                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                                    </Box>
                                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                                    </Box>
                                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                                    </Box>
                                    <Box padding='6' boxShadow='lg' className='w-[15rem] h-[20rem] rounded-3xl border'>
                                        <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='2' />
                                    </Box>
                                </>
                                :
                                searchMovies.results.filter(movie => movie.backdrop_path !== null).map(movie =>
                                    <Card
                                        image={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                                        getId={movie.id}
                                        type={isFocus}
                                        screenSize={screenSize}
                                    />
                                )
                            }
                        </div>
                    </div>
                </SearchedMovie>
            } */}