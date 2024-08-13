import ICarCard from "@/types/carCardType";
import { ICarFilterType } from "@/types/carFilterType";

type CalculatorProps = {
  sender: string;
  params: ICarFilterType;
  allCars: ICarCard[];
};

export const calculator = ({
  sender,
  params,
  allCars,
}: CalculatorProps): ICarCard[] => {
  let tempArray = allCars;

  Object.keys(params as ICarFilterType).forEach((paramkey) => {
    if (sender !== paramkey.toString()) {
      //this means if the sender is the same as the paramkey, we don't want to filter by that key.
      //This is because we want to allow users to pick more than one criteria for filtering.
      //If we didn't have this, the user would only be able to filter by one criteria at a time.
      //Because we are filtering out mismatching keys, we are only left with the keys that the user wants to filter by.

      if (Array.isArray(params[paramkey as keyof ICarFilterType])) {
        //if the filter criteria is array which means, for example color can be red, blue, green, etc.
        // we are using includes to check if the car's color is in the array of colors that the user wants to filter by.
        // console.log("array");

        tempArray = tempArray.filter((car) =>
          (params[paramkey as keyof ICarFilterType] as any[]).includes(
            car[paramkey as keyof ICarCard]
          )
        );
      } else {
        //if the filter criteria is not array which means, for example year can be 2020, 2021, 2022, etc.
        // we are using === to check if the car's year is the same as the year that the user wants to filter by.
        // no matter if string or number. we don't care about the type of the value.

        let prefix: string;
        if (paramkey.includes("_min")) {
          prefix = paramkey.replace("_min", "");

          const minValue = params[paramkey as keyof ICarFilterType];

          if (minValue !== undefined) {
            tempArray = tempArray.filter(
              (car) => car[prefix as keyof ICarCard] >= minValue
            );
          }
        }
        if (paramkey.includes("_max")) {
          prefix = paramkey.replace("_max", "");
          const maxValue = params[paramkey as keyof ICarFilterType];

          if (maxValue !== undefined) {
            tempArray = tempArray.filter(
              (car) => car[prefix as keyof ICarCard] <= maxValue
            );
          }
        }
      }
    }
  });

  return tempArray;
};
