"use client";

import Select, { SingleValue } from "react-select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "@/server/actions";

interface CategorySelectProps {
  value: string | null;
  onChange: (value: string) => void;
}

interface CategoryOption {
  value: string;
  label: string;
}

const categories: CategoryOption[] = [
  { value: "General", label: "General" },
  { value: "Dining Out", label: "Dining Out" },
  { value: "Groceries", label: "Groceries" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Transportation", label: "Transportation" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Personal Care", label: "Personal Care" },
  { value: "Education", label: "Education" },
  { value: "Bills", label: "Bills" },
  { value: "Shopping", label: "Shopping" },
];

export default function CategorySelect({
  value,
  onChange,
}: CategorySelectProps) {
  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const usedCategories = budgets?.data?.map((b) => b.category) || [];

  const [selected, setSelected] = useState(
    categories.find((o) => o.value === value) || null
  );

  const handleChange = (option: SingleValue<CategoryOption | null>) => {
    setSelected(option);
    if (option) onChange(option.value);
  };

  return (
    <Select
      value={selected}
      onChange={handleChange}
      options={categories}
      isOptionDisabled={(option) => usedCategories.includes(option.value)}
      placeholder='Select category'
      isSearchable={false}
      className='text-grey-900'
      formatOptionLabel={(option) => {
        const isUsed = usedCategories.includes(option.value);
        return (
          <div className='flex items-center justify-between'>
            <span>{option.label}</span>
            {isUsed && (
              <span className='text-sm text-grey-400'>Already used</span>
            )}
          </div>
        );
      }}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#d1d5db",
          borderRadius: "0.5rem",
          paddingLeft: "0.5rem",
        }),
        menu: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
    />
  );
}
