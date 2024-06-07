import { SyntheticEvent } from "react";

type IcarCardData = {
  make: string;
  model: string;
  fueltype: string;
  milage: string;
  ulez: boolean;
  featurelist: string[];
};

export default function CarCard({
  onClick,
  carData,
}: {
  onClick?: (e: SyntheticEvent) => void;
  carData: IcarCardData;
}) {
  return (
    <div onClick={onClick}>
      <div>{carData.make}</div>
      <div>{carData.model}</div>
      <div>{carData.milage}</div>
      <div>{carData.fueltype}</div>
      <div>{carData.ulez ? "ULEZ Compliant" : "Not ULEZ Compliant"}</div>
      <span>
        <h4>Features:</h4>
        {/* {carData ||
          (carData.featurelist.length > 0 &&
            carData.featurelist.map((fl, index) => (
              <div key={index}>{fl}</div>
            )))} */}
      </span>
    </div>
  );
}
