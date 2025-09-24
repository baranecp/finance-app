import React from "react";
import { Overview } from "@/types/finance";

export default function OverviewCard({
  color,
  background,
  textColor,
  sumColor,
  text,
  icon,
  iconColor,
  sum,
}: Overview) {
  return (
    <div
      className={`flex gap-5 flex-1 body-m ${color} ${background} md:p-400  p-250 rounded-[12px]`}>
      {icon &&
        React.createElement(icon, {
          className: `self-center w-[40px] h-auto ${iconColor}`,
        })}
      <div>
        <p className={`${textColor}`}>{text}</p>
        <p className={`${sumColor} heading-xl mt-3`}>{sum}</p>
      </div>
    </div>
  );
}
