import mongoose from "mongoose";

export const createConnection = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};
