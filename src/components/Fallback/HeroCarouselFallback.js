import BarLoader from '../UI/BarLoader'

const HeroCarouselFallback = () => {
  return (
    <div className="flex flex-col h-[35rem] w-full bg-[#090E17] px-4 py-24 justify-center items-center">
      <BarLoader height={'h-20'} />
    </div>
  );
};

export default HeroCarouselFallback;
