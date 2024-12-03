import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import action from '../../assets/Categories/action.jpg'
import animation from '../../assets/Categories/animation.jpg'
import comedy from '../../assets/Categories/comedy.jpg'
import crime from '../../assets/Categories/crime.jpg'
import documentary from '../../assets/Categories/documentary.jpg'
import drama from '../../assets/Categories/drama.jpg'
import {Link} from 'react-router-dom'

const ColorChangeCards = ({ type }) => {
    return (
        <div className="h-full w-full ">
            <div className="flex flex-wrap justify-center items-center gap-3">
                <Link
                    to={`allMovies`}
                    state={[{ genreName: 'action', type: type, genre: type === 'movie' ? 28 : 10759 }]}
                >
                    <Card
                        heading="Action"
                        imgSrc={action}
                    />
                </Link>
                <Link
                    to={`allMovies`}
                    state={[{ genreName: 'animation', type: type, genre: 16 }]}
                >
                    <Card
                        heading="Animation"
                        imgSrc={animation}
                    />
                </Link>
                <Link
                    to={`allMovies`}
                    state={[{ genreName: 'comedy', type: type, genre: 35 }]}
                >
                    <Card
                        heading="Comedy"
                        imgSrc={comedy}
                    />
                </Link>
                <Link
                    to={`allMovies`}
                    state={[{ genreName: 'crime', type: type, genre: 80 }]}
                >
                    <Card
                        heading="Crime"
                        imgSrc={crime}
                    />
                </Link>
                <Link
                    to={`allMovies`}
                    state={[{ genreName: 'documentary', type: type, genre: 99 }]}
                >
                    <Card
                        heading="Documentary"
                        imgSrc={documentary}
                    />
                </Link>
                <Link
                    to={`allMovies`}
                    state={[{ genreName: 'drama', type: type, genre: 18 }]}
                >
                    <Card
                        heading="Drama"
                        imgSrc={drama}
                    />
                </Link>
            </div>
        </div>
    );
};

const Card = ({ heading, description, imgSrc }) => {
    return (
        <motion.div
            transition={{
                staggerChildren: 0.035,
            }}
            whileHover="hover"
            className="w-[12.5rem] h-[12.5rem] bg-slate-300 overflow-hidden cursor-pointer group relative rounded-xl"
        >
            <div
                className="absolute inset-0 saturate-0 md:saturate-0 md:group-hover:saturate-100 group-hover:scale-110 transition-all duration-500"
                style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="p-4 relative z-20 h-full text-slate-300 group-hover:text-white  transition-colors duration-500 flex flex-col justify-between">
                <FiArrowRight className="text-3xl group-hover:-rotate-45 transition-transform duration-500 ml-auto" />
                <div>
                    <h4>
                        {heading.split("").map((l, i) => (
                            <ShiftLetter letter={l} key={i} />
                        ))}
                    </h4>
                </div>
            </div>
        </motion.div>
    );
};

const ShiftLetter = ({ letter }) => {
    return (
        <div className="inline-block overflow-hidden h-[36px] font-semibold text-2xl">
            <motion.span
                className="flex flex-col min-w-[4px]"
                style={{
                    y: "0%",
                }}
                variants={{
                    hover: {
                        y: "-50%",
                    },
                }}
                transition={{
                    duration: 0.5,
                }}
            >
                <span>{letter}</span>
                <span>{letter}</span>
            </motion.span>
        </div>
    );
};

export default ColorChangeCards;