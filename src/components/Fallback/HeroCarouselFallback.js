import BarLoader from '../UI/BarLoader'

const HeroCarouselFallback = () => {
  return (
    <div className="grid place-content-center bg-[#090E17]  px-4 py-24 h-[35rem]">
      <BarLoader />
    </div>
  );
};

export default HeroCarouselFallback;
