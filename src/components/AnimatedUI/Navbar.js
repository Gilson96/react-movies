import React, { useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { FilmIcon } from '@heroicons/react/24/outline'
import { useDisclosure } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Account from '../Account/Account'
import { useSearchMoviesQuery } from '../../features/Movies/allMoviesApi'
import Card from '../Card'
import SearchedMovie from '../Movies/SearchedMovie'
import { SkeletonText, Box } from '@chakra-ui/react'
import useScreenSize from '../../features/useScreenSize'


const Example = ({ setIsActive, isActive }) => {
  const [showSearch, setShowSearch] = useState(false)
  const [inputValue, setInputValue] = useState('hello')
  const [type, setType] = useState('movie')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const screenSize = useScreenSize()
  const { data: searchMovies = [], isLoading } = useSearchMoviesQuery({ title: inputValue, type: type })

  const handleInputValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <FlyoutNav setIsActive={setIsActive} isActive={isActive} setShowSearch={setShowSearch} type={type} setType={setType} onOpen={onOpen} screenSize={screenSize}/>
    
      <div className="relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0" />
      </div>

      {showSearch &&
        <SearchedMovie
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
        >
          <div className='flex flex-col w-full h-full gap-2'>
            <div className='w-full flex justify-center items-center'>
              <input
                className={`flex h-[2rem] rounded-full p-3 bg-slate-200 border ${screenSize.width < 700 ? 'w-[90%]' : 'w-[70%]'}`}
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
                    type={type}
                    screenSize={screenSize}
                  />
                )
              }
            </div>
          </div>
        </SearchedMovie>
      }
    </>
  );
};

const FlyoutNav = ({ setIsActive, isActive, setShowSearch, onOpen, setType, type, screenSize }) => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 250 ? true : false);
  });

  return (
    <nav
      className={`fixed -top-1 z-50 w-full px-6 text-white 
      transition-all duration-300 ease-out
      ${scrolled
          ? "bg-neutral-950 py-5 shadow-xl"
          : "bg-neutral-950/0 py-6 shadow-none"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className='flex w-full h-[2rem] justify-between items-center '>
          <div className={`flex w-auto h-auto justify-center items-center gap-2 `}>
            <p className={`${screenSize.width < 700 && 'hidden' } text-white font-bold text-3xl `}>React-Movies</p>
            <FilmIcon className={`h-12 w-12 text-white`} />
          </div>

          <div className={`${screenSize.width < 700 ? 'p-[2%] mx-3' : 'pl-[2%] pr-[5px]'} flex justify-between items-center border rounded-full  bg-slate-950 h-[3.2rem]`}>

            <div
              className={`flex justify-center items-center text-slate-400 cursor-pointer ${screenSize.width < 700 ? 'w-[4rem]' : 'w-[5rem]'} `}
              onClick={() => { setIsActive('movie'); setType('movie') }}
            >
              <p className={`${type === 'movie' ? 'text-white' : ''} ${screenSize.width < 700 && 'text-sm'}`}>Movies</p>
            </div>
            <div
              className={`flex justify-center items-center text-slate-400 cursor-pointer ${screenSize.width < 700 ? 'w-[4rem]' : 'w-[5rem]'}`}
              onClick={() => { setIsActive('tv'); setType('tv') }}
            >
              <p className={`${type === 'tv' ? 'text-white' : ''} ${screenSize.width < 700 && 'text-sm'}`}>Series</p>
            </div>
            <i
              className={`bg-slate-700 flex justify-center items-center w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer`}
              onClick={() => { setShowSearch(true); onOpen(); }}
            >
              <MagnifyingGlassIcon className='w-4 h-4 text-white' />
            </i>
          </div>

          <Account type={isActive}/>
        </div >
      </div>
    </nav>
  );
};


export default Example;

