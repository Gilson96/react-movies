import React from 'react'

const DotsForHeroSwiper = ({ imgIndex, setImgIndex, imgs }) => {
    return (
        <div className="relative bottom-[2rem] flex w-full justify-center gap-2">
            {imgs.results.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-colors ${idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"}`}
                    />
                );
            })}
        </div>
    )
}

export default DotsForHeroSwiper