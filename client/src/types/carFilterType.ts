export type ICarFilterType = {
  make?: string;
  model?: string;

  milage_min?: number;
  milage_max?: number;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  color?: string[];
  fueltype?: string[];
  transmission?: string[];
  milage?: number;
  ulez_compatible?: boolean;
  featurelist?: string[];
  price?: number;
  doors?: number[];
};
export const initialParams: ICarFilterType = {};
