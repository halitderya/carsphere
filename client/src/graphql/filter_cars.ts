import gql from "graphql-tag";
export const FilteredCars = gql`
  query FilteredCars(
    $make: String
    $model: String
    $fueltype: [String]
    $transmission: [Transmission]
    $milageMax: Int
    $milageMin: Int
    $color: [String]
    $doors: [Int]
  ) {
    filteredCars(
      make: $make
      model: $model
      fueltype: $fueltype
      color: $color
      transmission: $transmission
      milage_max: $milageMax
      milage_min: $milageMin
      doors: $doors
    ) {
      reg_number
      make
      model
      fueltype
      color
      doors
      milage
      transmission
    }
  }
`;
