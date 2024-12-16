import { Box, useDisclosure, SkeletonText } from "@chakra-ui/react";
import { useState } from "react";
import useScreenSize from "../../features/useScreenSize";
import { useSearchMoviesQuery } from "../../features/Movies/allMoviesApi";
import ContentForAnimatedNavbar from "../UI/ContentForAnimatedNavbar";
import ModalForSearchedMovie from '../UI/ModalForSearchedMovie'
import Card from '../UI/Card'

const AnimatedNavbar = ({ setIsActive, isActive }) => {
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
            <ContentForAnimatedNavbar setIsActive={setIsActive} isActive={isActive} setShowSearch={setShowSearch} type={type} setType={setType} onOpen={onOpen} screenSize={screenSize} />

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
                                    <Card
                                        imgUrl={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                                        movie={movie}
                                        type={type}
                                    />
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