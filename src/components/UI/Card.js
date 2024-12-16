import { useState } from 'react'
import AnimatedButton from '../AnimatedUI/AnimatedButton';

const Card = ({ imgUrl, movie, type, CARD_WIDTH }) => {
    const [mouseHover, setMouseHover] = useState()

    return (
        <div
            className="cursor-pointer transition-transform hover:-translate-y-1 h-full p-[2%] animate__animated animate__fadeInRight"
            style={{
                width: CARD_WIDTH,
            }}
        >
            <div
                onMouseOver={() => setMouseHover(movie.id)}
                onMouseLeave={() => setMouseHover(false)}
                className={`flex flex-col h-[25rem] w-[100%] items-start justify-end gap-1 rounded-lg bg-[url(https://image.tmdb.org/t/p/w1280/${movie.poster_path})]  bg-center bg-no-repeat bg-cover`}
            >
                {mouseHover === movie.id &&
                    <div
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))` }}
                        className='h-full w-full transition-all animate__animated animate__fadeInUp animate__faster flex flex-col justify-center items-center gap-2'
                    >
                        <p className='text-white w-full text-center text-2xl font-bold'>{movie.title || movie.name}<span> &#8226; {type === 'movie' && '(' + movie.release_date.slice(0, 4) + ')'}{type === 'tv' && '(' + movie.first_air_date.slice(0, 4) + ')'}</span></p>

                        <div className="w-full flex justify-center items-center p-[2%] ">
                            <AnimatedButton genreName={'More Details'} specialStyle={{
                                backgroundColor: '#e5e5e5',
                                color: '#262626',
                                fontSize: 0.7 + 'rem',
                                paddingTop: 0.8 + 'rem',
                                paddingBottom: 0.8 + 'rem',
                                width: 8 + 'rem'

                            }} />
                        </div>
                    </div>
                }
            </div>
        </div >
    );
};
export default Card