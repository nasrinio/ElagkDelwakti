import { Schema, model } from "mongoose";

const governateSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const governateModel = model("Governate",governateSchema);
