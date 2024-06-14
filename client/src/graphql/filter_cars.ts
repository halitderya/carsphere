import gql from "graphql-tag";
export const FILTER_CARS = gql`
  query FilteredCars(
    $make: String
    $model: String
    $fueltype: String
    $transmission: Transmission
    $milageMax: Int
    $milageMin: Int
    $color: String
  ) {
    filteredCars(
      make: $make
      model: $model

      fueltype: $fueltype
      color: $color
      transmission: $transmission
      milage_max: $milageMax
      milage_min: $milageMin
    ) {
      reg_number
      make
      model
      fueltype
      color
      milage
      transmission
    }
  }
`;
