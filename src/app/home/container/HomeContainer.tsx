import { Button } from "@/shared/container/ui/button";
import RightSection from "./section/RightSection";
import LeftSection from "./section/LeftSection";

const HomeContainer = () => {
  return (
    <div className="flex h-screen w-full border">
      <div className="flex-[4] border-r">
        <LeftSection />
      </div>
      <div className="flex-[6]">
        <RightSection />
      </div>
    </div>
  );
};

export default HomeContainer;
