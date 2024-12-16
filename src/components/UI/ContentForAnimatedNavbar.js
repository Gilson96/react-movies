import { useState } from "react";
import {
    useMotionValueEvent,
    useScroll,
} from "framer-motion";
import { FilmIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Account from "../Account/Account";

const ContentForAnimatedNavbar = ({ setIsActive, isActive, setShowSearch, onOpen, setType, type, screenSize }) => {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 250 ? true : false);
    });

    return (
        <nav
            className={`fixed -top-1 z-50 w-full px-6 text-white 
        transition-all duration-300 ease-out
        ${scrolled
                    ? "bg-neutral-950 py-5 shadow-xl"
                    : "bg-neutral-950/0 py-6 shadow-none"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <div className='flex w-full h-[2rem] justify-between items-center '>
                    <div className={`flex w-auto h-auto justify-center items-center gap-2 `}>
                        <p className={`${screenSize.width < 700 && 'hidden'} text-white font-bold text-3xl `}>React-Movies</p>
                        <FilmIcon className={`h-12 w-12 text-white`} />
                    </div>

                    <div className={`${screenSize.width < 700 ? 'p-[2%] mx-3' : 'pl-[2%] pr-[5px]'} flex justify-between items-center border rounded-full  bg-slate-950 h-[3.2rem]`}>

                        <div
                            className={`flex justify-center items-center text-slate-400 cursor-pointer ${screenSize.width < 700 ? 'w-[4rem]' : 'w-[5rem]'} `}
                            onClick={() => { setIsActive('movie'); setType('movie') }}
                        >
                            <p className={`${type === 'movie' ? 'text-white' : ''} ${screenSize.width < 700 && 'text-sm'}`}>Movies</p>
                        </div>
                        <div
                            className={`flex justify-center items-center text-slate-400 cursor-pointer ${screenSize.width < 700 ? 'w-[4rem]' : 'w-[5rem]'}`}
                            onClick={() => { setIsActive('tv'); setType('tv') }}
                        >
                            <p className={`${type === 'tv' ? 'text-white' : ''} ${screenSize.width < 700 && 'text-sm'}`}>Series</p>
                        </div>
                        <i
                            className={`bg-slate-700 flex justify-center items-center w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer`}
                            onClick={() => { setShowSearch(true); onOpen(); }}
                        >
                            <MagnifyingGlassIcon className='w-4 h-4 text-white' />
                        </i>
                    </div>

                    <Account type={isActive} />
                </div >
            </div>
        </nav>
    );
};

export default ContentForAnimatedNavbar