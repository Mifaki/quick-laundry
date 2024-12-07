import RightSection from "./RightSection";
import LeftSection from "./LeftSection";

const HeroSection = () => {
  return (
    <div className="flex rounded-3xl bg-white h-[85vh] w-[90%] overflow-hidden">
      <div className="flex-[4.5]">
        <LeftSection />
      </div>
      <div className="flex-[5.5]">
        <RightSection />
      </div>
    </div>
  );
};

export default HeroSection;
