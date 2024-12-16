import { Link } from 'react-router-dom';

const MobileCatgories = ({ type, slidesPerView, spaceBetween }) => {

    const categories = [
        { title: 'action', genre: type === 'movie' ? 28 : 10759 },
        { title: 'animation', genre: 16 },
        { title: 'comedy', genre: 35 },
        { title: 'crime', genre: 80 },
        { title: 'documentary', genre: 99 },
        { title: 'drama', genre: 18 }
    ]

    return (
        <div className={`w-full h-full`}>
            <p className="font-bold text-white text-xl pt-[2%] px-[3%]">Categories</p>
            <div className='w-full h-[10rem] flex flex-wrap gap-3 p-[3%] mt-[2%] justify-between items-center'>
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={`/allMovies`}
                        state={[{ genreName: category.title, type: type, genre: category.genre }]}
                    >
                        <div className='h-auto w-auto bg-neutral-200 rounded-lg py-3 px-4 flex justify-center items-center hover:bg-neutral-400'>
                            <p className='capitalize font-semibold text-neutral-800 text-sm'>{category.title}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div >
    )
}

export default MobileCatgories