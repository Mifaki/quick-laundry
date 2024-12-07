import VerticalLine from "@/shared/container/line/VerticalLine";
import { count } from "console";

interface ICounterItemsProps {
  count: string;
  name: string;
  showLine?: boolean;
}

const CounterItem = (props: ICounterItemsProps) => {
  return (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <h2 className="text-heading-4 font-semibold">{props.count}</h2>
        <p className="text-gray-700">{props.name}</p>
      </div>
      {props.showLine && <VerticalLine height="h-8" />}
    </div>
  );
};

export default CounterItem;
