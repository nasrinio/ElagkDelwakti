// import mongoose from "mongoose";

// export const connectionDB = async () => {
//   return await mongoose
//     .connect(process.env.CONNECTION_DB_CLOUD)
//     .then((res) => console.log("DB connection success"))
//     .catch((err) => console.log("DB connection Fail", err));
// };
import mongoose from "mongoose";

export const connectionDB = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.CONNECTION_DB_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DB connection success");
        resolve(); // Resolve the promise if the connection is successful
      })
      .catch((err) => {
        console.log("DB connection Fail", err);
        reject(err); // Reject the promise if there's an error in connecting
      });
  });
};
