import {
    motion,
    MotionConfig,
} from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import AnimatedMovieDetailsPoster from "../AnimatedUI/AnimatedMovieDetailsPoster";
import { Link } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import BarLoader from '../UI/BarLoader'
import { SkeletonText } from "@chakra-ui/react";

const MovieDetailsHero = () => {
    return (
        <section className="w-screen h-screen flex justify-between bg-neutral-950 text-neutral-50">
            <Left />
            <Right />
        </section>
    );
};

export default MovieDetailsHero

export const Left = () => {
    return (
        <div className="w-[60%] h-full flex flex-col justify-between border-r border-neutral-700 ">
            <div className="w-full h-full rounded-lg transition-all duration-500 flex justify-between items-start">

                {/* movie poster */}
                <div className="flex items-center justify-center overflow-hidden rounded-[7px] p-[4rem] transition-colors duration-500 h-full w-[60%] animate__animated animate__fadeIn border-r">
                    <BarLoader height={'h-5'} />
                </div>

                {/* movie details left */}
                <div className="flex flex-col justify-between gap-[2rem] h-full w-[40%] border-neutral-700">
                    {/* movie title */}
                    <h1
                        className="text-4xl font-bold capitalize animate__animated animate__fadeInDown px-[2%] pt-[5%]"
                        id="movieDetailsTitleAnimation"
                    >
                        <SkeletonText noOfLines={2} className="w-[20%]" />
                    </h1>
                    {/* movie genres */}
                    <div
                        className="p-[2%] animate__animated animate__fadeInDown"
                        id="movieDetailsGenresAnimation"
                    >
                        <p className="text-xl text-neutral-500">Genres:</p>
                        <hr className="border-neutral-700 w-full h-[px] mb-[3%] " />
                        <div className="flex flex-wrap w-full gap-2">
                            <button
                                className={`
                                        relative z-0 flex items-center justify-center overflow-hidden rounded-lg gap-3 border-[1px] 
                                        border-neutral-700 px-3 py-2 font-semibold text-xs uppercase  transition-all duration-500
        
                                        before:absolute before:inset-0
                                        before:-z-10 before:translate-x-[150%]
                                        before:translate-y-[150%] before:scale-[2.5]
                                        before:rounded-[100%] before:bg-neutral-300
                                        before:transition-transform before:duration-1000
                                        before:content-[""]

                                        hover:scale-105 hover:text-neutral-900
                                        hover:before:translate-x-[0%]
                                        hover:before:translate-y-[0%]
                                        active:scale-95`
                                }
                            >
                                <BarLoader height={'h-5'} />
                            </button>
                        </div>
                    </div>

                    {/* Movie Overview */}
                    <div
                        className="w-full mt-[10%] px-[2%] animate__animated animate__fadeInDown"
                        id="movieDetailsOverviewAnimation"
                    >
                        <p className="text-xl text-neutral-500">Overview:</p>
                        <hr className="border-neutral-700 w-full h-[px] mb-[3%]" />
                        <p className="text-justify overflow-hidden text-base font-light animate__animated"><SkeletonText /></p>
                    </div>

                    {/* Add to Account buttons */}
                    <div className="relative grid h-[57px] grid-cols-2 border-t border-neutral-700">
                        <button
                            className={`
                                        relative z-0 flex items-center justify-center overflow-hidden rounded-lg gap-3 border-[1px] 
                                        border-neutral-700 px-3 py-2 font-semibold text-xs uppercase  transition-all duration-500
        
                                        before:absolute before:inset-0
                                        before:-z-10 before:translate-x-[150%]
                                        before:translate-y-[150%] before:scale-[2.5]
                                        before:rounded-[100%] before:bg-neutral-300
                                        before:transition-transform before:duration-1000
                                        before:content-[""]

                                        hover:scale-105 hover:text-neutral-900
                                        hover:before:translate-x-[0%]
                                        hover:before:translate-y-[0%]
                                        active:scale-95`
                            }
                        >
                            <BarLoader height={'h-5'} />
                        </button>
                        <button
                            className={`
                                        relative z-0 flex items-center justify-center overflow-hidden rounded-lg gap-3 border-[1px] 
                                        border-neutral-700 px-3 py-2 font-semibold text-xs uppercase  transition-all duration-500
        
                                        before:absolute before:inset-0
                                        before:-z-10 before:translate-x-[150%]
                                        before:translate-y-[150%] before:scale-[2.5]
                                        before:rounded-[100%] before:bg-neutral-300
                                        before:transition-transform before:duration-1000
                                        before:content-[""]

                                        hover:scale-105 hover:text-neutral-900
                                        hover:before:translate-x-[0%]
                                        hover:before:translate-y-[0%]
                                        active:scale-95`
                            }
                        >
                            <BarLoader height={'h-5'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

const Right = () => {
    const [idx, setIdx] = useState(0);

    const CONTENT = [
        {
            content: (
                <>
                    <div className="h-full flex flex-col justify-center items-center">
                        <BarLoader height={'h-20'} />
                    </div>
                </>
            ),
        },

    ];
    return (
        <div className="w-[40%] flex flex-col overflow-hidden h-full">
            <Link to={'/'} className="relative left-[31rem] top-[0.5rem]">
                <ArrowLeftCircleIcon className='h-10 w-10 text-white hover:text-neutral-500 ' />
            </Link>
            <div className='w-full h-full flex flex-col overflow-hidden'>
                {CONTENT.map((c, itemIdx) => {
                    return (
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: idx === itemIdx ? 1 : 0,
                                y: idx === itemIdx ? 0 : 24,
                                filter: idx === itemIdx ? "blur(0px)" : "blur(2px)",
                            }}
                            transition={{
                                ease: "easeInOut",
                                duration: 0.3,
                            }}
                            style={{
                                pointerEvents: idx === itemIdx ? "all" : "none",
                            }}
                            className="w-full p-[2%] text-neutral-400 h-full"
                            key={itemIdx}
                        >
                            {c.content}
                        </motion.div>
                    );
                })}
            </div>

        </div>
    );
};


