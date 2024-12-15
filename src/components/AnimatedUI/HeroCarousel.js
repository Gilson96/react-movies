import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useGetMovieGenreListQuery } from '../../features/Movies/moviesByGenreApi'
import useScreenSize from "../../features/useScreenSize";
import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { SkeletonText, Box } from '@chakra-ui/react'
import AnimatedButton from './AnimatedButton'

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};


export const SwipeCarousel = ({ data, type }) => {
    console.log(type)
    console.log(data)

    const [imgIndex, setImgIndex] = useState(0);

    const dragX = useMotionValue(0);

    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIndex((pv) => {
                    if (pv === data.results.length - 1) {
                        return 0;
                    }
                    return pv + 1;
                });
            }
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, []);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imgIndex < data.results.length - 1) {
            setImgIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
            setImgIndex((pv) => pv - 1);
        }
    };

    return (
        <div className="overflow-hidden w-full h-full">
            
            <motion.div
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                style={{
                    x: dragX,
                }}
                animate={{
                    translateX: `-${imgIndex * 100}%`,
                }}
                transition={SPRING_OPTIONS}
                onDragEnd={onDragEnd}
                className="flex cursor-grab items-center active:cursor-grabbing h-screen w-full "
            >
                <Images imgIndex={imgIndex} imgs={data} type={type} />
            </motion.div>

            <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} imgs={data} />

        </div>
    );
};

const Images = ({ imgs, type }) => {
    const { data: genreList = [], isLoading } = useGetMovieGenreListQuery('movie')
    const screenSize = useScreenSize()

    if (isLoading) return <p>...</p>
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

const Dots = ({ imgIndex, setImgIndex, imgs }) => {
    return (
        <div className="relative bottom-[2rem] flex w-full justify-center gap-2">
            {imgs.results.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-colors ${idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"}`}
                    />
                );
            })}
        </div>
    );
};
