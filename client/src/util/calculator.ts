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
      if (Array.isArray(params[paramkey as keyof ICarFilterType])) {
        tempArray = tempArray.filter((car) =>
          (params[paramkey as keyof ICarFilterType] as any[]).includes(
            car[paramkey as keyof ICarCard]
          )
        );
      } else {
        tempArray = tempArray.filter(
          (car) =>
            car[paramkey as keyof ICarCard] ===
            params[paramkey as keyof ICarFilterType]
        );
      }
    }
  });

  return tempArray;
};
