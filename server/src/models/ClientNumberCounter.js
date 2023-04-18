import mongoose from "mongoose";
const NumeratorSchema = new mongoose.Schema({
  lastClientNumber: Number,
});

const Numerator = mongoose.model("Numerator", NumeratorSchema);

export default Numerator;
