import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const Buttons = ({ idx, setIdx, content }) => {
    return (
        <div className="relative grid h-[57px] grid-cols-2 border-t border-neutral-700">
            <ShiftButton
                onClick={() => {
                    setIdx((pv) => {
                        if (pv === 0) {
                            return content.length - 1;
                        } else {
                            return pv - 1;
                        }
                    });
                }}
                topDivClasses="bg-neutral-900"
                bottomDivClasses="bg-neutral-950"
            >
                <FiArrowLeft className="mx-auto text-xl" />
            </ShiftButton>
            <ShiftButton
                topDivClasses="bg-neutral-900"
                btnClasses="border-neutral-700 border-l"
                bottomDivClasses="bg-neutral-950"
                onClick={() => {
                    setIdx((pv) => {
                        if (pv === content.length - 1) {
                            return 0;
                        } else {
                            return pv + 1;
                        }
                    });
                }}
            >
                <FiArrowRight className="mx-auto text-xl" />
            </ShiftButton>

            <motion.span
                key={idx}
                initial={{
                    width: "0%",
                }}
                animate={{
                    width: "100%",
                }}
                transition={{
                    duration: 70,
                    ease: "linear",
                }}
                onAnimationComplete={() => {
                    setIdx((pv) => {
                        if (pv === content.length - 1) {
                            return 0;
                        } else {
                            return pv + 1;
                        }
                    });
                }}
                className="pointer-events-none absolute -top-[1px] bottom-0 z-20 bg-neutral-600/10"
            />
        </div>
    );
};

export default Buttons

const ShiftButton = ({
    onClick,
    children,
    btnClasses,
    topDivClasses,
    bottomDivClasses,
}) => {
    return (
        <MotionConfig
            transition={{
                ease: "circOut",
                duration: 0.25,
            }}
        >
            <motion.button
                initial="initial"
                whileHover="hovered"
                className={twMerge(
                    "relative overflow-hidden transition-colors",
                    btnClasses
                )}
                onClick={onClick}
            >
                <motion.div
                    variants={{
                        initial: {
                            y: "0%",
                        },
                        hovered: {
                            y: "-100%",
                        },
                    }}
                    className={twMerge(
                        "grid h-full place-content-center bg-neutral-950",
                        topDivClasses
                    )}
                >
                    {children}
                </motion.div>
                <motion.div
                    variants={{
                        initial: {
                            y: "100%",
                        },
                        hovered: {
                            y: "0%",
                        },
                    }}
                    className={twMerge(
                        "absolute inset-0 grid h-full place-content-center",
                        bottomDivClasses
                    )}
                >
                    {children}
                </motion.div>
            </motion.button>
        </MotionConfig>
    );
};