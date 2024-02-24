import { Schema, model } from "mongoose";

const citySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    governateId: {
      type: Schema.Types.ObjectId,
      ref: 'Governate',
      required: true
    }
  },
  { timestamps: true }
);

export const cityModel = model("City",citySchema);
