import ICarCard from "@/types/carCardType";
import { ICarFilterType } from "@/types/carFilterType";
import { rangedCreator } from "@/util/rangecreator";
import React, { SyntheticEvent, useEffect, useState } from "react";

interface RangedFilterProps {
  allCars: ICarCard[];
  params: ICarFilterType;
  setParams: (set: ICarFilterType) => void;
  RangedFilterType: string;
  handleOnChange: (
    e: SyntheticEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

export const RangedFilter: React.FC<RangedFilterProps> = ({
  allCars,
  RangedFilterType,
  handleOnChange,
  params,
  setParams,
}) => {
  const [minrangedvalues, setMinRangedValues] = useState<
    { value: number; label: string }[]
  >([]);
  const [maxrangedvalues, setMaxRangedValues] = useState<
    { value: number; label: string }[]
  >([]);
  useEffect(() => {
    const rangedValues = rangedCreator(
      RangedFilterType as keyof ICarCard,

      allCars
    );
    console.log("rangedValues: ", rangedValues);

    setMinRangedValues(rangedValues.minrangedvalues);
    setMaxRangedValues(rangedValues.maxrangedvalues);
  }, [allCars]);

  const [minSelected, setMinSelected] = useState<number>(0);
  const [maxSelected, setMaxSelected] = useState<number>(9999999999);

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
          console.log(allCars);
          console.log(
            "rangedvalues",
            rangedCreator(RangedFilterType as keyof ICarCard, allCars)
          );
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
        <h5>Max</h5>
        <select
          title={`${RangedFilterType}_max`}
          onChange={handleMaxChange}
          value={
            params[
              `${RangedFilterType}_max` as keyof ICarFilterType
            ]?.toString() || 0
          }
        >
          <option value={0}>No Max</option>

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
