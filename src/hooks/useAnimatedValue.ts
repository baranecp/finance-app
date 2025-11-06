// hooks/useAnimatedValue.ts
import { useEffect, useState } from "react";

type AnimatedValueOptions = {
  isCurrency?: boolean; // if true → "$4,532.00"
  decimals?: number; // number of decimals if not currency
};

export function useAnimatedValue(
  targetInput: number | string,
  baseDuration = 700,
  options: AnimatedValueOptions = {}
) {
  const { isCurrency = false, decimals = 0 } = options;
  const [display, setDisplay] = useState(isCurrency ? "$0.00" : "0");

  useEffect(() => {
    const numericTarget =
      typeof targetInput === "string"
        ? parseFloat(targetInput.replace(/[^0-9.-]+/g, ""))
        : targetInput;

    if (isNaN(numericTarget)) return;

    let start: number | null = null;
    const duration = Math.max(200, Math.min(baseDuration, numericTarget * 0.5));

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericTarget;

      let formatted: string;
      if (isCurrency) {
        formatted = `$${current.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      } else {
        formatted = current.toFixed(decimals);
      }

      setDisplay(formatted);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [targetInput, baseDuration, isCurrency, decimals]);

  return display;
}
