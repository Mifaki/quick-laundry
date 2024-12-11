import React from "react";

interface IHorizontalLineProps {
  height?: string;
  width?: string;
  color?: string;
  classname?: string;
}

const HorizontalLine = ({
  height = "h-[1px]",
  width = "w-full",
  color = "bg-gray-400",
  classname,
}: IHorizontalLineProps) => {
  return <div className={`${height} ${width} ${color} ${classname}`}></div>;
};

export default HorizontalLine;
