import mongoose from "mongoose";

export const connectionDB = async () => {
  return await mongoose
    .connect(process.env.CONNECTION_DB_CLOUD)
    .then((res) => console.log("DB connection success"))
    .catch((err) => console.log("DB connection Fail", err));
};
