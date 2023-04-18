import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const connectDB = () => mongoose.connect(process.env.MONGODB_URL);

export default connectDB;
