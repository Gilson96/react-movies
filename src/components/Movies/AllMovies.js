import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGetMovieByGenreQuery } from '../../features/Movies/moviesByGenreApi'
import { ArrowLeftCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import useScreenSize from '../../features/useScreenSize'
import { SkeletonText, Box } from '@chakra-ui/react'
import AnimatedButton from '../AnimatedUI/AnimatedButton'

const AllMovies = () => {
    let { state } = useLocation()
    const [mouseHover, setMouseHover] = useState()
    const screenSize = useScreenSize()
    let genreName = state[0].genreName
    let type = state[0].type
    let genre = state[0].genre
    const { data: movieByGenre = [], isLoading } = useGetMovieByGenreQuery({ genre: genre, type: type })

    return (
        <div>
            {isLoading ?
                <div className='h-screen w-full p-[3%]'>
                    <div className='w-full flex justify-between items-center'>
                        <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' width={'10%'} paddingBottom={'3%'} />
                        <Link to='/'>
                            <ArrowLeftCircleIcon className={`absolute text-white hover:text-white/50 ${screenSize.width < 700 ? 'right-[0.2rem] top-[0.5rem] w-[2rem] h-[2rem]' : 'right-[3rem] top-[2rem] w-10 h-10'}`} />
                        </Link>
                    </div>
                    <div className='w-full  flex flex-wrap gap-2'>
                        <Box padding='6' boxShadow='lg' className={`${screenSize.width < 700 ? ' w-[7rem] h-[10rem]' : ' w-[15rem] h-[20rem]'} rounded-3xl border`}>
                            <SkeletonText mt='4' noOfLines={screenSize.width < 700 ? 4 : 10} spacing='4' skeletonHeight='2' />
                        </Box>
                        <Box padding='6' boxShadow='lg' className={`${screenSize.width < 700 ? ' w-[7rem] h-[10rem]' : ' w-[15rem] h-[20rem]'} rounded-3xl border`}>
                            <SkeletonText mt='4' noOfLines={screenSize.width < 700 ? 4 : 10} spacing='4' skeletonHeight='2' />
                        </Box>
                        <Box padding='6' boxShadow='lg' className={`${screenSize.width < 700 ? ' w-[7rem] h-[10rem]' : ' w-[15rem] h-[20rem]'} rounded-3xl border`}>
                            <SkeletonText mt='4' noOfLines={screenSize.width < 700 ? 4 : 10} spacing='4' skeletonHeight='2' />
                        </Box>
                    </div>
                </div>
                :
                <div>
                    {/* Title */}
                    <p className='text-white uppercase p-[3%] text-3xl font-bold'>{genreName}</p>

                    {/* back to Home link */}
                    <Link to='/'>
                        <ArrowLeftCircleIcon className={`absolute text-white hover:text-white/50 ${screenSize.width < 700 ? 'right-[0.2rem] top-[0.5rem] w-[2rem] h-[2rem]' : 'right-[3rem] top-[2rem] w-10 h-10'}`} />
                    </Link>

                    {/* All movies */}
                    <div className={`w-full h-full flex flex-wrap items-center px-[3%] gap-3`}>
                        {movieByGenre.results.filter(movie => movie.backdrop_path !== null).map(movie =>
                            <div
                                onMouseOver={() => setMouseHover(movie.id)}
                                onMouseLeave={() => setMouseHover(false)}
                                className={`flex flex-col h-[25rem] w-[15rem] items-start justify-end gap-1 rounded-lg bg-[url(https://image.tmdb.org/t/p/w1280/${movie.poster_path})]  bg-center bg-no-repeat bg-cover`}
                            >
                                {mouseHover === movie.id &&
                                    <div
                                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))` }}
                                        className='h-full w-full transition-all animate__animated animate__fadeInUp animate__faster flex flex-col justify-center items-center gap-2'
                                    >
                                        <p className='text-white w-full text-center text-2xl font-bold'>{movie.title || movie.name}<span> &#8226; {type === 'movie' && '(' + movie.release_date.slice(0, 4) + ')'}{type === 'tv' && '(' + movie.first_air_date.slice(0, 4) + ')'}</span></p>

                                        <div className="w-full flex justify-center items-center p-[2%] ">
                                            <Link to={`/movies/${movie.id}`} state={type}>
                                                <AnimatedButton genreName={'More Details'} specialStyle={{
                                                    backgroundColor: '#e5e5e5',
                                                    color: '#262626',
                                                    fontSize: 0.7 + 'rem',
                                                    paddingTop: 0.8 + 'rem',
                                                    paddingBottom: 0.8 + 'rem',
                                                    width: 8 + 'rem'
                                                }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                }
                            </div>

                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default AllMovies