import { Schema, model } from "mongoose";
import pkg from "bcrypt";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin", "SuperAdmin"],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    buildingNum: String,
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    profilePicture: {
      secure_url: String,
      public_id: String,
    },
    status: {
      type: String,
      default: "Offline",
      enum: ["Online", "Offline"],
    },
    gender: {
      type: String,
      default: "Not specified",
      enum: ["male", "female", "Not specified"],
    },
    age: Number,
    token: String,
    forgetCode: String,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next, hash) {
  // console.log(this.password)
  this.password = pkg.hashSync(this.password, +process.env.SALT_ROUNDS);
  // console.log(this.password)
  next();
});

export const userModel = model("User", userSchema);
