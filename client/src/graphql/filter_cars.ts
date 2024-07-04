import gql from "graphql-tag";
export const FilteredCars = gql`
  query FilteredCars(
    $make: String
    $model: String
    $fueltype: [String]
    $transmission: [Transmission]
    $milage_min: Int
    $milage_max: Int
    $year_min: Int
    $year_max: Int
    $price_min: Int
    $price_max: Int
    $color: [String]
    $doors: [Int]
  ) {
    filteredCars(
      make: $make
      model: $model
      fueltype: $fueltype
      color: $color
      transmission: $transmission
      milage_min: $milage_min
      milage_max: $milage_max
      year_min: $year_min
      year_max: $year_max
      price_min: $price_min
      price_max: $price_max
      doors: $doors
    ) {
      reg_number
      year
      make
      model
      fueltype
      color
      doors
      price
      milage
      transmission
    }
  }
`;
