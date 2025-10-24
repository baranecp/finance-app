"use client";

import Select, { SingleValue } from "react-select";
import { useState } from "react";
import { usePots } from "@/hooks/usePots";

interface ThemeSelectProps {
  value: string | null;
  onChange: (value: string) => void;
}

interface ThemeOption {
  value: string;
  label: string;
}

export default function ThemeSelect({ value, onChange }: ThemeSelectProps) {
  const { pots } = usePots();

  const usedThemes = pots.map((pot) => pot.theme);

  const themes = [
    { name: "Green", value: "#277C78" },
    { name: "Yellow", value: "#F2CDAC" },
    { name: "Blue", value: "#626FDB" },
    { name: "Red", value: "#F29999" },
    { name: "Purple", value: "#A27CF2" },
    { name: "Orange", value: "#F5A623" },
    { name: "Teal", value: "#1ABC9C" },
    { name: "Pink", value: "#FF6B81" },
    { name: "Cyan", value: "#00BFFF" },
    { name: "Brown", value: "#A0522D" },
  ];

  const options = themes.map((t) => ({ value: t.value, label: t.name }));

  const [selected, setSelected] = useState(
    options.find((o) => o.value === value) || null
  );

  const handleChange = (option: SingleValue<ThemeOption | null>) => {
    setSelected(option);
    if (option) onChange(option.value);
  };

  return (
    <Select
      value={selected}
      onChange={handleChange}
      options={options}
      isOptionDisabled={(option) => usedThemes.includes(option.value)}
      placeholder='Select theme'
      isSearchable={false}
      className='text-grey-900'
      formatOptionLabel={(option) => {
        const isUsed = usedThemes.includes(option.value);
        return (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span
                className='w-4 h-4 rounded-full shrink-0'
                style={{
                  backgroundColor: option.value,
                  opacity: isUsed ? 0.4 : 1,
                }}
              />
              <span>{option.label}</span>
            </div>
            {isUsed && <span className='text-sm'>Already used</span>}
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
