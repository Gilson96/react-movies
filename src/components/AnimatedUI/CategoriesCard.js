import React from "react";
import { Link } from 'react-router-dom'

const HoverDevCards = ({ type }) => {
    return (
        <div className="flex flex-col px-[3%] py-[2%] gap-4">
            <div>
                <p className="font-bold text-white text-2xl">Categories</p>
            </div>
            <div className="flex justify-evenly items-center gap-2">
                <Card
                    title="Action"
                    href="AllMovies"
                    genreName={'action'}
                    type={type}
                    genre={type === 'movie' ? 28 : 10759}
                />
                <Card
                    title="Animation"
                    href="AllMovies"
                    genreName={'animation'}
                    type={type}
                    genre={16}
                />
                <Card
                    title="Comedy"
                    href="AllMovies"
                    genreName={'comedy'}
                    type={type}
                    genre={35}
                />
                <Card
                    title="Crime"
                    href="AllMovies"
                    genreName={'crime'}
                    type={type}
                    genre={80}
                />
                <Card
                    title="Documentary"
                    href="AllMovies"
                    genreName={'documentary'}
                    type={type}
                    genre={99}
                />
                <Card
                    title="Drama"
                    href="AllMovies"
                    genreName={'drama'}
                    type={type}
                    genre={18}
                />
            </div>
        </div>
    );
};

const Card = ({ title, subtitle, icon, genreName, type, genre, href }) => {
    return (
        <Link
            to={href}
            state={[{ genreName: genreName, type: type, genre: genre }]}
            className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-neutral-950 flex justify-center items-center"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-600 to-neutral-800 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

            <h3 className="font-medium text-lg text-white relative z-10 duration-300">
                {title}
            </h3>
            <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
                {subtitle}
            </p>
        </Link>
    );
};

export default HoverDevCards;
