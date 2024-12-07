import React from "react";

interface IVerticalLineProps {
  height?: string;
  width?: string;
  color?: string;
}

const VerticalLine = ({
  height = "h-full",
  width = "w-[1px]",
  color = "bg-gray-400",
}: IVerticalLineProps) => {
  return <div className={`${height} ${width} ${color}`}></div>;
};

export default VerticalLine;
