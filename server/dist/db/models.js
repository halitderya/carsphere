import mongoose from "mongoose";
const carSchema = new mongoose.Schema({
    reg_number: String,
    make: String,
    model: String,
    year: Number,
    color: String,
    milage: Number,
    price: Number,
    fueltype: String,
    transmission: String,
    engine_capacity: String,
    engine_type: String,
    horsepower: Number,
    torque: String,
    insurance_group: String,
    previous_owners: Number,
    features: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feature",
        },
    ],
    pictures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Picture",
        },
    ],
    ulez_compatible: Boolean,
    zero_to_sixty: String,
    top_speed: Number,
    doors: Number,
    euro_emission: String,
    mpg_city: Number,
    mpg_highway: Number,
    mpg_combined: Number,
    seats: Number,
    weight: Number,
    listed_at: Date,
});
export const Car = mongoose.model("Car", carSchema);
