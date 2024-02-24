import { Schema, model } from "mongoose";

const medicineCategorySchema = new Schema(
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

export const medicineCategoryModel = model("MedicineCategory",medicineCategorySchema);
