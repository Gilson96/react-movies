import AnimatedMovieDetailsPoster from "../AnimatedUI/AnimatedMovieDetailsPoster";
import AnimatedMovieDetailsRightSide from '../AnimatedUI/AnimatedMovieDetailsRightSide'

const MovieDetailsHero = ({ movieDetails, type }) => {
    return (
        <section className="w-screen h-screen flex justify-between  bg-neutral-950 text-neutral-50">
            <div className="w-[60%] h-full flex flex-col justify-between border-r border-neutral-700 ">
                <AnimatedMovieDetailsPoster movieDetails={movieDetails} />
            </div>
            <AnimatedMovieDetailsRightSide movieDetails={movieDetails} type={type} />
        </section>
    );
};

export default MovieDetailsHero








