import { Box, useDisclosure, SkeletonText } from "@chakra-ui/react";
import { useState } from "react";
import useScreenSize from "../../features/useScreenSize";
import { useSearchMoviesQuery } from "../../features/Movies/allMoviesApi";
import ContentForAnimatedNavbar from "../UI/ContentForAnimatedNavbar";
import ModalForSearchedMovie from '../UI/ModalForSearchedMovie'
import AnimatedButton from './AnimatedButton'
import { Link } from "react-router-dom";

const AnimatedNavbar = ({ setIsActive, isActive }) => {
    const [mouseHover, setMouseHover] = useState()
    // state to show the search movie modal
    const [showSearch, setShowSearch] = useState(false)
    // value from the search movie modal
    const [inputValue, setInputValue] = useState('hello')
    // Movie or Tv
    const [type, setType] = useState('movie')
    // Modal option
    const { isOpen, onOpen, onClose } = useDisclosure()
    const screenSize = useScreenSize()
    // Get searchef movie from API
    const { data: searchMovies = [], isLoading } = useSearchMoviesQuery({ title: inputValue, type: type })

    const handleInputValue = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <>
            <ContentForAnimatedNavbar
                setIsActive={setIsActive}
                isActive={isActive}
                setShowSearch={setShowSearch}
                type={type}
                setType={setType}
                onOpen={onOpen}
                screenSize={screenSize}
            />

            <div className="relative">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0" />
            </div>

            {/* If showSearch is true open Modal */}
            {showSearch &&
                <ModalForSearchedMovie
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
                                // Fallback
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
                                    <div
                                        onMouseOver={() => setMouseHover(movie.id)}
                                        onMouseLeave={() => setMouseHover(false)}
                                        className={`flex flex-col ${screenSize.width > 700 ? 'h-[20rem] w-[12rem]' : 'h-[12rem] w-[9rem]'}  items-start justify-end gap-1 rounded-lg bg-[url(https://image.tmdb.org/t/p/w1280/${movie.poster_path})] bg-center bg-no-repeat bg-cover`}
                                    >
                                        {mouseHover === movie.id &&
                                            <div
                                                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))` }}
                                                className='h-full w-full flex flex-col justify-center items-center gap-2'
                                            >
                                                <p className={`text-white w-full text-center ${screenSize.width < 700 ? 'text-xs' : 'text-xl'} font-bold`}>{movie.title || movie.name}</p>
                                                <div className='flex flex-col gap-1'>
                                                    <Link
                                                        to={`/movies/${movie.id}`}
                                                        state={type}
                                                    >
                                                        <AnimatedButton genreName={'More Details'} specialStyle={{
                                                            backgroundColor: '#e5e5e5',
                                                            color: '#262626',
                                                            fontSize: 0.7 + 'rem',
                                                            paddingTop: 0.8 + 'rem',
                                                            paddingBottom: 0.8 + 'rem',
                                                            width: 8 + 'rem'

                                                        }} />
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </ModalForSearchedMovie>
            }
        </>
    );
};

export default AnimatedNavbar