import { FiChevronDown, } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";

// Animated Drop down menu
const AnimatedDropDown = ({ setIsActive, isActive, type }) => {
    console.log(type)
    const [open, setOpen] = useState(false);

    return (
        <div className="z-30">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center gap-2 px-6 py-2 rounded-md text-neutral-800 bg-neutral-200 hover:bg-neutral-500 transition-colors"
                >
                    <span className="font-medium text-sm capitalize">{isActive.replaceAll('_', ' ')}</span>
                    <motion.span variants={iconVariants}>
                        <FiChevronDown />
                    </motion.span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-[100%] overflow-hidden"
                >
                    <Option setOpen={setOpen} setIsActive={setIsActive} text="popular" />
                    <Option setOpen={setOpen} setIsActive={setIsActive} text={type === 'movie' ? 'upcoming' : 'on_the_air'} />
                    <Option setOpen={setOpen} setIsActive={setIsActive} text="top_rated" />
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({ text, setOpen, setIsActive }) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => { setOpen(false); setIsActive(text); }}
            className="flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-neutral-300 text-neutral-700 hover:text-neutral-700 transition-colors cursor-pointer"
        >
            <span className="capitalize">{text.replaceAll('_', ' ')}</span>
        </motion.li>
    );
};

export default AnimatedDropDown;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};