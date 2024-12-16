import React from "react";
import { useGetMovieGenreListQuery } from '../../features/Movies/moviesByGenreApi'
import useScreenSize from "../../features/useScreenSize";
import { motion } from "framer-motion";
import { SkeletonText, Box } from '@chakra-ui/react'
import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";
import AnimatedButton from "../AnimatedUI/AnimatedButton";

const ImagesForHeroSwiper = ({ imgs, type, SPRING_OPTIONS }) => {
    // get genre list from API
    const { data: genreList = [], isLoading } = useGetMovieGenreListQuery('movie')
    const screenSize = useScreenSize()
    
    // Get the right genre name for each movie
    const handleGenre = (movie) => {
        let movieGenreName = []
        let movieGenreId = 0

        for (let i = 0; i < movie.genre_ids.length; i++) {

            movieGenreId = movie.genre_ids[i]

            for (let i = 0; i < genreList.genres.length; i++) {
                if (genreList.genres[i].id === movieGenreId)
                    movieGenreName.push(genreList.genres[i].name)
            }
        }
        return movieGenreName
    }


    return (
        <>
            {imgs.results.map((data, idx) => {
                return (
                    <motion.div
                        key={idx}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/w1280/${data.backdrop_path}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}

                        transition={SPRING_OPTIONS}
                        className="w-full h-full shrink-0"
                    >
                        {isLoading ?
                        // Fallback
                            <div className="w-full h-full flex justify-center items-center pl-[15%] bg-neutral-950/80">
                                <Box padding='6' bg='neutral-600' width={'20rem'} height={'25rem'} >
                                    <SkeletonText mt='4' noOfLines={12} spacing='4' skeletonHeight='2' />
                                </Box>
                                <Box padding='6' boxShadow='lg' bg='neutral-600' width={'15rem'} height={'25rem'} rounded={'xl'} border={'1px solid white'} marginRight={'15rem'}>
                                    <SkeletonText mt='4' noOfLines={12} spacing='4' skeletonHeight='2' />
                                </Box>
                            </div>
                            :
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full flex justify-center items-center "

                            >
                                <div className='flex flex-col gap-[1rem] w-full pl-[20%]'>
                                    <p className={`text-white font-bold ${screenSize.width < 700 ? 'text-2xl' : 'text-[2rem]'} `}>{data.name || data.title}</p>
                                    <div className='flex gap-3'>
                                        <div className='flex gap-1 items-center'>
                                            <i><StarIcon className='w-5 h-5 text-yellow-400' /></i>
                                            <p className='text-white text-base'>{data.vote_average === 0 ? 'N/A' : data.vote_average.toFixed(1)}/10</p>
                                        </div>

                                    </div>
                                    <div className={`flex gap-2 w-full flex-warp`}>
                                        {handleGenre(data).slice(0, 4).map(genre =>
                                            <AnimatedButton
                                                genreName={genre}
                                                specialStyle={{
                                                    backgroundColor: '#d4d4d4'
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className={`${screenSize.width < 700 ? 'w-full text-justify' : 'w-[60%] text-justify'}`}>
                                        <p className={`text-white line-clamp-3 ${screenSize.width < 700 ? '' : 'text-base'}`}>{data.overview === ''? 'Not Available' : data.overview}</p>
                                    </div>
                                    <div className='w-full'>
                                        <Link
                                            to={`movies/${data.id}`}
                                            state={type}
                                        >
                                            <AnimatedButton
                                                genreName={'See more'}
                                                specialStyle={{
                                                    backgroundColor: '#e5e5e5',
                                                    width: 6 + 'rem',
                                                    height: 3 + 'rem'
                                                }}
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w1280/${data.poster_path}`}
                                        alt="poster"
                                        className="h-[25rem] w-[18rem] rounded-xl"
                                    />
                                </div>
                            </motion.div>
                        }
                    </motion.div>
                );
            })}
        </>
    );
};

export default ImagesForHeroSwiper