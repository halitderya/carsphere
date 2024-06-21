export type ICarFilterType = {
  make?: string;
  model?: string;

  color?: string[];
  fueltype?: string;
  transmission?: string[];
  milage?: number;
  ulez_compatible?: boolean;
  featurelist?: string[];
  price?: number;
};
export const initialParams: ICarFilterType = {};
