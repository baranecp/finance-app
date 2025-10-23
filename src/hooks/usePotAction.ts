"use client";
import type { Pot } from "@/store/modalStore";
import { useState } from "react";

export default function usePotAction(
  pot: Pot,
  type: string,
  availableBalance = 4835
) {
  const [amount, setAmount] = useState("");
  const numericAmount = Number(amount) || 0;

  const percentage = (pot.total / pot.target) * 100;
  const addPercentage = (numericAmount / pot.target) * 100;
  const withdrawStart = Math.max(percentage - addPercentage, 0);

  const newTotal =
    type === "add" ? pot.total + numericAmount : pot.total - numericAmount;

  const withdrawInvalid = type === "withdraw" && numericAmount > pot.total;
  const addExceedsTarget =
    type === "add" && numericAmount + pot.total > pot.target;
  const addExceedsBalance = type === "add" && numericAmount > availableBalance;

  const maxAmount =
    type === "withdraw"
      ? pot.total
      : type === "add"
      ? Math.min(pot.target - pot.total, availableBalance)
      : undefined;

  const isDisabled =
    !amount || withdrawInvalid || addExceedsTarget || addExceedsBalance;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (val < 0) val = 0;
    if (maxAmount !== undefined && val > maxAmount) val = maxAmount;
    setAmount(val.toString());
  };

  return {
    amount,
    numericAmount,
    percentage,
    addPercentage,
    withdrawStart,
    newTotal,
    maxAmount,
    isDisabled,
    handleChange,
  };
}
