import { Button } from "@/shared/container/ui/button";
import { COUNTER_DATA } from "../../models/CounterData";
import HorizontalLine from "@/shared/container/line/HorizontalLine";
import CounterItem from "../item-counter/CounterItem";

const LeftSection = () => {
  return (
    <section>
      <div>
        <h1 className="text-heading-1 font-semibold">
          Reserve Your Ideal Holiday
        </h1>
        <div className="flex items-center gap-4">
          <p>Let's Compiled with Next TS</p>
          <HorizontalLine classname="flex-1" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia a
          nesciunt accusantium animi eaque odio alias non necessitatibus veniam
          aperiam!
        </p>
        <Button>Get Started</Button>
      </div>
      <div className="flex items-center justify-center gap-8">
        {COUNTER_DATA.map((data, index) => (
          <CounterItem
            key={data.id}
            count={data.count}
            name={data.name}
            showLine={index < COUNTER_DATA.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default LeftSection;
