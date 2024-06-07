import { useState, useCallback } from "react";

interface QueryParams {
  ulez_compatible?: boolean;
  zero_to_sixty?: string;
  top_speed?: number;
  doors?: number;
  euro_emission?: string;
  mpg_city?: number;
  mpg_highway?: number;
  mpg_combined?: number;
  seats?: number;
  weight?: number;
  reg_number?: string;
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  milage?: number;
  price?: number;
  fueltype?: string;
  transmission?: string;
  engine_capacity?: string;
  engine_type?: string;
  horsepower?: number;
  torque?: string;
  insurance_group?: string;
  previous_owners?: number;
}

export const useQueryBuilder = (params: QueryParams) => {
  const [query, setQuery] = useState<Record<string, any>>({});

  const buildQuery = useCallback(() => {
    let queryObject: Record<string, any> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryObject[key] = value;
      }
    });

    setQuery(queryObject);
  }, [params]);

  return { query, buildQuery };
};
