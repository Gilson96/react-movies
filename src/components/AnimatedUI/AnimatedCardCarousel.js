import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { useGetMovieByListQuery } from '../../features/Movies/moviesByGenreApi'
import useScreenSize from "../../features/useScreenSize";
import { Link } from "react-router-dom";
import { SkeletonText, Box } from '@chakra-ui/react'
import AnimatedDropDown from "./AnimatedDropdownMenu";
import Card from "../UI/Card";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
    sm: 640,
    lg: 1024,
};

const AnimatedCardCarousel = ({ type }) => {
    const [ref, { width }] = useMeasure();
    const [offset, setOffset] = useState(0);
    const [isActive, setIsActive] = useState('popular');
    const screenSize = useScreenSize()
    const { data: movieByList = [], isLoading } = useGetMovieByListQuery({ list: isActive, type: type })
    
    //this is something like Suspense 
    if (isLoading) return <p>loading</p>

    const CARD_BUFFER =
        width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

    const CAN_SHIFT_LEFT = offset < 0;

    const CAN_SHIFT_RIGHT =
        Math.abs(offset) < CARD_SIZE * (movieByList.results.length - CARD_BUFFER);

    // Left Arrow in the carousel
    const shiftLeft = () => {
        if (!CAN_SHIFT_LEFT) {
            return;
        }
        setOffset((pv) => (pv += CARD_SIZE));
    };

    // Right Arrow in the carousel
    const shiftRight = () => {
        if (!CAN_SHIFT_RIGHT) {
            return;
        }
        setOffset((pv) => (pv -= CARD_SIZE));
    };


    return (
        <section className="w-full pr-[3%]" ref={ref}>
            <div className="relative overflow-hidden">
                <div className="px-[3%]">
                    <div className="flex items-center justify-between pb-[1%]">
                        <div className="w-full h-full flex justify-between items-center gap-2">

                            {/* title */}
                            <p className={`w-full text-white text-2xl capitalize font-bold ${screenSize.width < 700 && 'hidden'} `}>{isActive.replaceAll('_', ' ')} {type}</p>

                            {/* top carousel wrapper */}
                            <div className={`${screenSize.width > 700 ? 'h-full w-full justify-end items-center flex gap-12' : 'w-full flex justify-between pl-[2%]'}`}>

                                {/* drop down menu (ex. popular, upcoming movies...)  */}
                                <AnimatedDropDown setIsActive={setIsActive} isActive={isActive} type={type} />

                                {/* carousel arrows */}
                                <div>
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
                        </div>
                    </div>

                    <motion.div
                        animate={{
                            x: offset,
                        }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="flex w-full"
                    >
                        {isLoading ?
                            // Fallback
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
                            </div>
                            :
                            // Movies
                            movieByList.results.map((movie) => (
                                <div className="">
                                    <Link to={`/movies/${movie.id}`} state={type}>
                                        <Card
                                            key={movie.id}
                                            imgUrl={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                                            title={movie.title || movie.name}
                                            author={movie.vote_average.toFixed(1)}
                                            movie={movie}
                                            type={type}
                                            CARD_WIDTH={CARD_WIDTH}
                                        />
                                    </Link>
                                </div>
                            ))
                        }

                    </motion.div>
                </div>
            </div >
        </section >
    );
};

export default AnimatedCardCarousel