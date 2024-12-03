import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { useGetMovieByListQuery, useGetMovieGenreListQuery } from '../../features/Movies/moviesByGenreApi'
import { StarIcon } from "@heroicons/react/24/solid";
import useScreenSize from "../../features/useScreenSize";
import { Link } from "react-router-dom";
import { SkeletonText, Box } from '@chakra-ui/react'

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
    sm: 640,
    lg: 1024,
};

const CardCarousel = ({ list, type }) => {
    const [ref, { width }] = useMeasure();
    const [offset, setOffset] = useState(0);
    const screenSize = useScreenSize()
    const { data: movieByList = [], isLoading } = useGetMovieByListQuery({ list: list, type: type })

    if (isLoading) return <p>loading</p>
    const CARD_BUFFER =
        width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

    const CAN_SHIFT_LEFT = offset < 0;

    const CAN_SHIFT_RIGHT =
        Math.abs(offset) < CARD_SIZE * (movieByList.results.length - CARD_BUFFER);

    const shiftLeft = () => {
        if (!CAN_SHIFT_LEFT) {
            return;
        }
        setOffset((pv) => (pv += CARD_SIZE));
    };

    const shiftRight = () => {
        if (!CAN_SHIFT_RIGHT) {
            return;
        }
        setOffset((pv) => (pv -= CARD_SIZE));
    };

    if (isLoading) return <p>Loading</p>

    return (
        <section className="w-full h-full" ref={ref}>
            <div className="relative overflow-hidden">
                <div className="px-[3%]">
                    <p className={`pb-[1%] text-white text-2xl capitalize ${screenSize.width < 700 ? 'text-base' : 'text-2xl'} `}>{list.replaceAll('_', ' ')} {type}</p>
                    <p className={` text-slate-400 ${screenSize.width < 700 ? 'text-sm' : 'text-xl'}`}>Explore diverse movie categories, from action to drama and everything in between</p>
                    <div className="flex items-center justify-between pb-[1%]">
                        <p></p>
                        <div className="flex items-center gap-2">
                            <button
                                className={`rounded-lg border-[1px] border-neutral-400 bg-white p-1.5 text-2xl transition-opacity ${CAN_SHIFT_LEFT ? "" : "opacity-30"
                                    }`}
                                disabled={!CAN_SHIFT_LEFT}
                                onClick={shiftLeft}
                            >
                                <FiArrowLeft />
                            </button>
                            <button
                                className={`rounded-lg border-[1px] border-neutral-400 bg-white p-1.5 text-2xl transition-opacity ${CAN_SHIFT_RIGHT ? "" : "opacity-30"
                                    }`}
                                disabled={!CAN_SHIFT_RIGHT}
                                onClick={shiftRight}
                            >
                                <FiArrowRight />
                            </button>
                        </div>
                    </div>
                    <motion.div
                        animate={{
                            x: offset,
                        }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="flex"
                    >
                        {isLoading ?
                            <div className="flex gap-2">
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
                            </div>
                :
                            movieByList.results.map((movie) => (
                <Link to={`/movies/${movie.id}`} state={type}>
                    <Post
                        key={movie.id}
                        imgUrl={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                        title={movie.title || movie.name}
                        author={movie.vote_average.toFixed(1)}
                        // year={movie.release_date.slice(0, 4) || movie.first_air_date.slice(0, 4)}
                        movie={movie}
                    />
                </Link>
                ))
                        }
            </motion.div>
        </div>
            </div >
        </section >
    );
};

const Post = ({ imgUrl, author, title, description, list, year, movie }) => {
    const { data: genreList = [], isLoading } = useGetMovieGenreListQuery('movie')

    if (isLoading) return <p>Loading</p>

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
        <DrawOutlineButton>
            <div
                className="relative shrink-0 cursor-pointer transition-transform hover:-translate-y-1 h-full p-[2%]"
                style={{
                    width: CARD_WIDTH,
                    marginRight: MARGIN,
                }}
            >
                <img
                    src={imgUrl}
                    className="mb-3 h-[200px] w-full rounded-lg object-cover"
                    alt='#'
                />
                <span className="rounded-md border-[1px] border-neutral-500 px-1.5 py-1 text-xs uppercase text-white flex items-center justify-center w-[3rem] gap-1">
                    <StarIcon className='text-yellow-400 h-4 w-4' />
                    {author}
                </span>
                <p className="mt-1.5 text-2xl py-2 font-medium text-white">{title} </p>
                <hr className="bg-white h-[px] w-full mb-[3%]" />
                <div className={`flex gap-2 w-[90%] flex-wrap`}>
                    {handleGenre(movie).map(genre =>
                        <div className={`border border-[#F6F7EB] rounded-full p-2`}>
                            <p className={`text-[#F6F7EB] font-bold`}> {genre}</p>
                        </div>
                    )}
                </div>
            </div>
        </DrawOutlineButton>
    );
};

const DrawOutlineButton = ({ children, ...rest }) => {
    return (
        <div
            {...rest}
            className="group relative p-[2%] font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300"
        >
            <span>{children}</span>

            {/* TOP */}
            <span className="absolute left-0 top-0 h-[2px] w-0 bg-white transition-all duration-100 group-hover:w-full" />

            {/* RIGHT */}
            <span className="absolute right-0 top-0 h-0 w-[2px] bg-white transition-all delay-100 duration-100 group-hover:h-full" />

            {/* BOTTOM */}
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all delay-200 duration-100 group-hover:w-full" />

            {/* LEFT */}
            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-white transition-all delay-300 duration-100 group-hover:h-full" />
        </div>
    );
};

export default CardCarousel;

