import MovieByGenre from './Movies/MovieByGenre'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import useScreenSize from '../features/useScreenSize'
import { Link } from 'react-router-dom';

const Categories = ({ type, slidesPerView, spaceBetween }) => {
    const screenSize = useScreenSize()
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    };

    const categories = [
        { title: 'action', genre: type === 'movie' ? 28 : 10759 },
        { title: 'animation', genre: 16 },
        { title: 'comedy', genre: 35 },
        { title: 'crime', genre: 80 },
        { title: 'documentary', genre: 99 },
        { title: 'drama', genre: 18 }
    ]

    

    return (
        <div className={`w-full ${screenSize.width < 700 ? 'h-full' : ''}`}>
            <p className={`pt-[3%] px-[3%] pb-[1%] text-white  mt-[2%] ${screenSize.width < 700 ? 'text-base' : 'text-2xl'}`}>Explore diverse categories</p>
            <p className={`px-[3%] text-slate-400  ${screenSize.width < 700 ? 'text-xs' : 'text-xl'}`}>Explore diverse movie categories, from action to drama and everything in between</p>

            <div className='w-full h-[10rem] flex flex-wrap gap-3 p-[3%] mt-[2%] justify-between items-center'>
                {categories.map((category, index) => (
                    <Link to={`/allMovies`} state={[{genderName: category.title, type: type, genre: category.genre}]}>
                        <div className='h-auto w-auto bg-gray-400 rounded-lg py-3 px-4 flex justify-center items-center hover:bg-gray-400/50'>
                            <p className='capitalize font-semibold text-sm'>{category.title}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div >
    )
}

export default Categories