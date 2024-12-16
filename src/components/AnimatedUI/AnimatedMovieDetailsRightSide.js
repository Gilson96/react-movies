import {useState} from 'react'
import MovieDetailsList from '../Movies/MovieDetailsList';
import MovieActors from '../Movies/MovieActors';
import MovieRecommendations from '../Movies/MovieRecommendations';
import { Link } from 'react-router-dom';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import ButtonsForMovieDetails from '../UI/ButtonForMovieDetailsRightSide'

const AnimatedMovieDetailsRightSide = ({ movieDetails, type }) => {
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
                <ButtonsForMovieDetails idx={idx} setIdx={setIdx} content={CONTENT} />
            </div>
        </div>
    );
};

export default AnimatedMovieDetailsRightSide
