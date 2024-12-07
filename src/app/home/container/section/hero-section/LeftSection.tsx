import { Button } from "@/shared/container/ui/button";
import { COUNTER_DATA } from "../../../models/CounterData";
import HorizontalLine from "@/shared/container/line/HorizontalLine";
import CounterItem from "../../item-counter/CounterItem";

const LeftSection = () => {
  return (
    <section className="flex flex-col p-8 gap-8">
      <img src="https://utfs.io/f/8uwNmLARV9ZHnW0Ki69ef0o7BzjkwUqPtgMdviHGEXp8C9Zb" alt="Quick Laundry Logo" className="w-32" />
      <div className="space-y-4">
        <h1 className="text-display-1 font-semibold">
          Reserve Your Machine Now
        </h1>
        <div className="flex items-center gap-4">
          <p className="font-semibold">WAKAKAKAKKAAKKAKA</p>
          <HorizontalLine classname="flex-1" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <p className="text-gray-600 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia a
          nesciunt accusantium animi eaque odio alias non necessitatibus veniam
          aperiam!
        </p>
        <Button>Wash Now</Button>
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
