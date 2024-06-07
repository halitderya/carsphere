import { Car } from "./db/models.js";
// type Query = {
//   cars: (typeof Car)[];
//   car: typeof Car;
// };
var Transmission;
(function (Transmission) {
    Transmission["Automatic"] = "Automatic";
    Transmission["Semi_Automatic"] = "Semi Automatic";
    Transmission["Manual"] = "Manual";
})(Transmission || (Transmission = {}));
const resolvers = {
    Query: {
        cars: async () => await Car.find({}),
        carbyreg: async (_, { reg_number }) => await Car.findOne({
            reg_number: {
                $regex: new RegExp("^" + reg_number + "$", "i"),
            },
        }),
        totalcars: async () => await Car.countDocuments({}),
        filteredCars: async (_, { make, model, year, fueltype, color, milage_min, milage_max, transmission, engine_capacity_min, engine_capacity_max, engine_type, horsepower_min, horsepower_max, insurance_group, previous_owner_min, previous_owner_max, ulez_compatible, doors, seats, }) => {
            let query = {};
            if (make)
                query.make = make;
            if (model)
                query.model = model;
            if (year)
                query.year = year;
            if (fueltype)
                query.fueltype = fueltype;
            if (color)
                query.color = color;
            if (milage_min)
                query.milage = { $gte: milage_min };
            if (milage_max)
                query.milage = { $lte: milage_max };
            if (transmission)
                query.transmission = transmission;
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
            if (engine_type)
                query.engine_type = engine_type;
            if (horsepower_min)
                query.horsepower = { ...query.horsepower, $gte: horsepower_min };
            if (horsepower_max)
                query.horsepower = { ...query.horsepower, $lte: horsepower_max };
            if (insurance_group)
                query.insurance_group = insurance_group;
            if (previous_owner_min)
                query.previous_owner = { $gte: previous_owner_min };
            if (previous_owner_max)
                query.previous_owner = { $lte: previous_owner_max };
            if (ulez_compatible)
                query.ulez_compatible = ulez_compatible;
            if (doors)
                query.doors = doors;
            if (seats)
                query.seats = seats;
            return await Car.find(query);
        },
    },
    Mutation: {
        createCar: async (_, args) => {
            const newCar = new Car(args);
            await newCar.save();
            return newCar;
        },
    },
};
export default resolvers;
