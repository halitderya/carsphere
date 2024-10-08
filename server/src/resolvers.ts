// import cars from "../cars.json"  with { type: "json" };
import { query } from "express";
import { Car } from "./db/models.js";
// type Query = {
//   cars: (typeof Car)[];
//   car: typeof Car;
// };
enum Transmission {
  Automatic = "Automatic",
  Semi_Automatic = "Semi Automatic",
  Manual = "Manual",
}

const stringregex = new RegExp("/^[a-zA-Z0-9]+$/");
const resolvers = {
  Query: {
    cars: async () => await Car.find({}),

    carbyreg: async (_, { reg_number }) =>
      await Car.findOne({
        reg_number: {
          $regex: new RegExp("^" + reg_number + "$", "i"),
        },
      }),
    totalcars: async () => await Car.countDocuments({}),
    filteredCars: async (
      _,
      {
        make,
        model,
        year_min,
        year_max,
        price_min,
        price_max,
        fueltype,
        color,
        milage_min,
        milage_max,
        transmission,
        engine_capacity_min,
        engine_capacity_max,
        engine_type,
        horsepower_min,
        horsepower_max,
        insurance_group,
        previous_owner_min,
        previous_owner_max,
        ulez_compatible,
        doors,
        seats,
      }: {
        make?: string;
        model?: string;
        year_min?: number;
        year_max?: number;
        price_min?: number;
        price_max?: number;
        fueltype?: string[];
        color: string[];
        milage_min?: number;
        milage_max?: number;
        transmission?: Transmission[];
        engine_capacity_min?: number;
        engine_capacity_max?: number;
        engine_type?: String;
        horsepower_min?: number;
        horsepower_max?: number;
        insurance_group: String;
        previous_owner_min: number;
        previous_owner_max: number;
        ulez_compatible: Boolean;
        doors: number[];
        seats: number[];
      }
    ) => {
      let query: any = {};

      if (make) query.make = { $regex: new RegExp(make, "i") };
      if (model) query.model = { $regex: new RegExp(model, "i") };
      if (milage_min) query.milage = { ...query.milage, $gte: milage_min };
      if (milage_max) query.milage = { ...query.milage, $lte: milage_max };
      if (year_min) query.year = { ...query.year, $gte: year_min };
      if (year_max) query.year = { ...query.year, $lte: year_max };
      if (price_min) query.price = { ...query.price, $gte: price_min };
      if (price_max) query.price = { ...query.price, $lte: price_max };
      if (fueltype) query.fueltype = { $in: fueltype };
      if (color) query.color = { $in: color };

      if (transmission) query.transmission = { $in: transmission };
      if (engine_capacity_min)
        query.engine_capacity = {
          ...query.engine_capacity,
          $gte: engine_capacity_min,
        };
      if (engine_capacity_max)
        query.engine_capacity = {
          ...query.engine_capacity,
          $lte: engine_capacity_max,
        };
      if (engine_type) query.engine_type = engine_type;
      if (horsepower_min)
        query.horsepower = { ...query.horsepower, $gte: horsepower_min };

      if (horsepower_max)
        query.horsepower = { ...query.horsepower, $lte: horsepower_max };
      if (insurance_group) query.insurance_group = insurance_group;
      if (previous_owner_min)
        query.previous_owner = { $gte: previous_owner_min };
      if (previous_owner_max)
        query.previous_owner = { $lte: previous_owner_max };
      if (ulez_compatible) query.ulez_compatible = ulez_compatible;
      if (doors) query.doors = { $in: doors };
      if (seats) query.seats = { $in: seats };

      console.log("query:", query);

      return await Car.find(query);
    },
  },

  Mutation: {
    createCar: async (_: any, args: any) => {
      const newCar = new Car(args);
      await newCar.save();
      return newCar;
    },
  },
};

export default resolvers;
