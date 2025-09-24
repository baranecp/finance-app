import { Overview } from "@/types/finance";

export default function OverviewCard({
  color,
  background,
  textColor,
  sumColor,
  text,
  sum,
}: Overview) {
  return (
    <div
      className={`flex-1 body-m ${color} ${background} md:p-400  p-250 rounded-[12px]`}>
      <p className={`${textColor}`}>{text}</p>
      <p className={`${sumColor} heading-xl mt-3`}>{sum}</p>
    </div>
  );
}
