import ICarCard from "./carCardType";

export interface CarType extends ICarCard {
  engine_capacity: number;
  engine_type: string;
  previous_owners: number;
  top_speed: number;
  doors: number;
  euro_emission: string;
  seats: number;
  mpg_city: number;
  mpg_highway: number;
  mpg_combined: number;
  acceleration: number;
}
