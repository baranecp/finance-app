"use client";
import React from "react";
import { tv } from "tailwind-variants";
import { Overview } from "@/types/finance";

interface OverviewCardProps
  extends Omit<
    Overview,
    "color" | "background" | "textColor" | "sumColor" | "iconColor"
  > {
  className?: string;
  color?: "white" | "gray" | "black";
  background?: "white" | "beige" | "gray";
  textColor?: "white" | "gray" | "black";
  sumColor?: "white" | "gray" | "black";
  iconColor?: "white" | "gray" | "green";
}

const overviewCard = tv({
  slots: {
    wrapper: "flex gap-5 md:flex-1 body-m md:p-400 p-250 rounded-[12px]",
    text: "",
    sum: "heading-xl mt-3",
    icon: "self-center w-[40px] h-auto",
  },
  variants: {
    color: {
      white: { wrapper: "text-white" },
      black: { wrapper: "text-black" },
      gray: { wrapper: "text-gray-500" },
    },
    background: {
      white: { wrapper: "bg-white" },
      beige: { wrapper: "bg-beige-100" },
      gray: { wrapper: "bg-gray-900" },
    },
    textColor: {
      white: { text: "text-white" },
      gray: { text: "text-gray-500" },
      black: { text: "text-black" },
    },
    sumColor: {
      white: { sum: "text-white" },
      gray: { sum: "text-gray-900" },
      black: { sum: "text-black" },
    },
    iconColor: {
      white: { icon: "fill-white" },
      gray: { icon: "fill-gray-400" },
      green: { icon: "fill-green-900" },
    },
  },
  extend: {
    className: {
      wrapper: true,
    },
  },
});

export default function OverviewCard({
  color,
  background,
  textColor,
  sumColor,
  iconColor,
  text,
  icon,
  sum,
  className,
}: OverviewCardProps) {
  const {
    wrapper,
    text: textCls,
    sum: sumCls,
    icon: iconCls,
  } = overviewCard({
    color,
    background,
    textColor,
    sumColor,
    iconColor,
    className,
  });

  return (
    <div className={wrapper({ className })}>
      {icon && React.createElement(icon, { className: iconCls() })}
      <div>
        <p className={textCls()}>{text}</p>
        <p className={sumCls()}>{sum}</p>
      </div>
    </div>
  );
}
