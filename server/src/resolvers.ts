// import cars from "../cars.json"  with { type: "json" };
import { Car } from "./db/models.js";
// type Query = {
//   cars: (typeof Car)[];
//   car: typeof Car;
// };

const resolvers = {
  Query: {
    cars: async () => await Car.find({}),

    carbyreg: async (_, { reg_number }) =>
      await Car.findOne({ reg_number: { $regex: reg_number, $options: "i" } }),
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
