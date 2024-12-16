import { motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import AnimatedMovieDetailsPoster from "../AnimatedUI/AnimatedMovieDetailsPoster";
import MovieDetailsList from "./MovieDetailsList";
import MovieActors from './MovieActors'
import MovieRecommendations from './MovieRecommendations'
import { Link } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const MovieDetailsHero = ({ movieDetails, type }) => {
    return (
        <section className="w-screen h-screen flex justify-between  bg-neutral-950 text-neutral-50">
            <Left movieDetails={movieDetails} />
            <Right movieDetails={movieDetails} type={type} />
        </section>
    );
};

export default MovieDetailsHero

export const Left = ({ movieDetails }) => {
    return (
        <div className="w-[60%] h-full flex flex-col justify-between border-r border-neutral-700 ">
            <AnimatedMovieDetailsPoster movieDetails={movieDetails} />
        </div>
    )
};

const Right = ({ movieDetails, type }) => {
    const [idx, setIdx] = useState(0);

    const CONTENT = [
        {
            content: (
                <>
                    <MovieDetailsList type={type} movieDetails={movieDetails} />
                </>
            ),
        },

        {
            content: (
                <>
                    <MovieActors type={type} movieId={movieDetails.id} />
                </>
            ),
        },

        {
            content: (
                <>
                    <MovieRecommendations
                        type={type}
                        movieId={movieDetails.id}
                        slidesPerView={2.5}
                        spaceBetween={30}
                    />
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
            <span className="pointer-events-none z-0 text-7xl text-neutral-800 h-auto  w-full text-end">
                {idx + 1}/{CONTENT.length}
            </span>

            <div className="h-auto bw-full">
                <Buttons idx={idx} setIdx={setIdx} content={CONTENT} />
            </div>
        </div>
    );
};

const Buttons = ({ idx, setIdx, content }) => {


    return (
        <div className="relative grid h-[57px] grid-cols-2 border-t border-neutral-700">
            <ShiftButton
                onClick={() => {
                    setIdx((pv) => {
                        if (pv === 0) {
                            return content.length - 1;
                        } else {
                            return pv - 1;
                        }
                    });
                }}
                topDivClasses="bg-neutral-900"
                bottomDivClasses="bg-neutral-950"
            >
                <FiArrowLeft className="mx-auto text-xl" />
            </ShiftButton>
            <ShiftButton
                topDivClasses="bg-neutral-900"
                btnClasses="border-neutral-700 border-l"
                bottomDivClasses="bg-neutral-950"
                onClick={() => {
                    setIdx((pv) => {
                        if (pv === content.length - 1) {
                            return 0;
                        } else {
                            return pv + 1;
                        }
                    });
                }}
            >
                <FiArrowRight className="mx-auto text-xl" />
            </ShiftButton>

            <motion.span
                key={idx}
                initial={{
                    width: "0%",
                }}
                animate={{
                    width: "100%",
                }}
                transition={{
                    duration: 70,
                    ease: "linear",
                }}
                onAnimationComplete={() => {
                    setIdx((pv) => {
                        if (pv === content.length - 1) {
                            return 0;
                        } else {
                            return pv + 1;
                        }
                    });
                }}
                className="pointer-events-none absolute -top-[1px] bottom-0 z-20 bg-neutral-600/10"
            />
        </div>
    );
};

const ShiftButton = ({
    onClick,
    children,
    btnClasses,
    topDivClasses,
    bottomDivClasses,
}) => {
    return (
        <MotionConfig
            transition={{
                ease: "circOut",
                duration: 0.25,
            }}
        >
            <motion.button
                initial="initial"
                whileHover="hovered"
                className={twMerge(
                    "relative overflow-hidden transition-colors",
                    btnClasses
                )}
                onClick={onClick}
            >
                <motion.div
                    variants={{
                        initial: {
                            y: "0%",
                        },
                        hovered: {
                            y: "-100%",
                        },
                    }}
                    className={twMerge(
                        "grid h-full place-content-center bg-neutral-950",
                        topDivClasses
                    )}
                >
                    {children}
                </motion.div>
                <motion.div
                    variants={{
                        initial: {
                            y: "100%",
                        },
                        hovered: {
                            y: "0%",
                        },
                    }}
                    className={twMerge(
                        "absolute inset-0 grid h-full place-content-center",
                        bottomDivClasses
                    )}
                >
                    {children}
                </motion.div>
            </motion.button>
        </MotionConfig>
    );
};






