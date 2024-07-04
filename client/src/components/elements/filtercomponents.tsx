import ICarCard from "@/types/carCardType";
import { ICarFilterType } from "@/types/carFilterType";
import React, { SyntheticEvent, useEffect, useState } from "react";

interface RangedFilterProps {
  params: ICarFilterType;
  setParams: (set: ICarFilterType) => void;
  RangedFilterType: string;
  handleOnChange: (
    e: SyntheticEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

let minrangedvalues: { value: number; label: string }[] = [];
let maxrangedvalues: { value: number; label: string }[] = [];

const RangedFilter: React.FC<RangedFilterProps> = ({
  RangedFilterType,
  handleOnChange,
  params,
  setParams,
}) => {
  const [minSelected, setMinSelected] = useState<number>(0);
  const [maxSelected, setMaxSelected] = useState<number>(9999999999);

  switch (RangedFilterType) {
    case "milage":
      minrangedvalues = [
        { value: 0, label: "No Min" },

        { value: 10000, label: "10000" },
        { value: 20000, label: "20000" },
        { value: 30000, label: "30000" },
        { value: 40000, label: "40000" },
        { value: 50000, label: "50000" },
        { value: 60000, label: "60000" },
        { value: 70000, label: "70000" },
        { value: 80000, label: "80000" },
        { value: 90000, label: "90000" },
        { value: 100000, label: "100000" },
      ];
      maxrangedvalues = [
        { value: 999999, label: "No Max" },
        { value: 5000, label: "5000" },
        { value: 15000, label: "15000" },
        { value: 25000, label: "25000" },
        { value: 35000, label: "35000" },
        { value: 45000, label: "45000" },
        { value: 55000, label: "55000" },
        { value: 65000, label: "65000" },
        { value: 75000, label: "75000" },
        { value: 85000, label: "85000" },
        { value: 95000, label: "95000" },
        { value: 105000, label: "105000" },
      ];
      break;
    case "price":
      minrangedvalues = [
        { value: 2000, label: "2000" },
        { value: 4000, label: "4000" },
        { value: 6000, label: "6000" },
        { value: 8000, label: "8000" },
        { value: 10000, label: "10000" },
        { value: 14000, label: "14000" },
        { value: 18000, label: "18000" },
        { value: 24000, label: "24000" },
        { value: 30000, label: "30000" },
      ];
      maxrangedvalues = [
        { value: 3000, label: "3000" },
        { value: 5000, label: "5000" },
        { value: 7000, label: "7000" },
        { value: 9000, label: "9000" },
        { value: 11000, label: "11000" },
        { value: 15000, label: "15000" },
        { value: 19000, label: "19000" },
        { value: 25000, label: "25000" },
        { value: 31000, label: "31000" },
        { value: 999999, label: "No Max" },
      ];
      break;
    case "year":
      let currentYear = new Date().getFullYear();
      let tempminrangedvalues: { value: number; label: string }[] = [];
      let tempmaxrangedvalues: { value: number; label: string }[] = [];
      for (let i = 2000; i <= currentYear; i++) {
        tempmaxrangedvalues.push({ value: i, label: i.toString() });
        tempminrangedvalues.push({ value: i, label: i.toString() });
      }
      minrangedvalues = tempminrangedvalues;
      maxrangedvalues = tempmaxrangedvalues;

      break;
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinValue = parseInt(e.target.value);
    setMinSelected(newMinValue);

    if (maxSelected <= newMinValue) {
      const nextMaxValue =
        maxrangedvalues.find((v) => v.value > newMinValue)?.value || 9999999999;
      setMaxSelected(nextMaxValue);
    }

    handleOnChange(e);
    handleParamChage(e);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxSelected(parseInt(e.target.value));
    handleOnChange(e);
    handleParamChage(e);
  };

  const handleParamChage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams({ ...params, [e.target.title]: Number(e.target.value) });
    console.log("params: ", params);
  };

  return (
    <>
      <button
        onClick={() => {
          console.log(params);
        }}
      >
        params
      </button>
      <div className="ranged-main">
        <h5>Min</h5>
        <select
          title={`${RangedFilterType}_min`}
          onChange={handleMinChange}
          value={
            params[
              `${RangedFilterType}_min` as keyof ICarFilterType
            ]?.toString() || 0
          }
        >
          <option value={0}>No Min</option>
          {minrangedvalues
            .filter((f) => f.value < maxSelected)
            .map((d, index) => (
              <option key={index} value={d.value}>
                {d.label}
              </option>
            ))}
        </select>
        <select
          title={`${RangedFilterType}_max`}
          onChange={handleMaxChange}
          value={
            params[
              `${RangedFilterType}_max` as keyof ICarFilterType
            ]?.toString() || 0
          }
        >
          {maxrangedvalues
            .filter((f) => f.value > minSelected)
            .map((d, index) => (
              <option key={index} value={d.value}>
                {d.label}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default RangedFilter;
