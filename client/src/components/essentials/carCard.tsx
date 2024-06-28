import { SyntheticEvent } from "react";
import ICarCard from "@/types/carCardType";

export default function CarCard({
  onClick,
  carData,
}: {
  onClick?: (e: SyntheticEvent) => void;
  carData: ICarCard;
}) {
  return (
    <div className="carcard" onClick={onClick}>
      <div className="cardgallerymain">
        <div>Left</div>
        <div className="imageview">Center</div>
        <div>Right</div>
      </div>
      <h2>{carData.make}</h2>
      <h4>{carData.model}</h4>
      <div>{carData.milage}</div>
      <div>{carData.fueltype}</div>
      <div>{carData.transmission}</div>
      <div>{carData.color}</div>
      <div>
        {carData.ulez_compatible ? "ULEZ Compliant" : "Not ULEZ Compliant"}
      </div>
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
