import { Schema, model } from "mongoose";

const medicineSchema = new Schema(
  {
    medicineName: {
      type: String,
      required: true,
      unique: true,
    },
    prescriptionRequired: {
      type: Boolean,
      required: true,
    },
    storageCondition: {
      type: String,
      required: true,
    },  

    
    expiryDate: {
      type: Date,
      required: true,
    },
    usageInstruction: {
      type: String,
      required: true,
    },
    sideEffects: {
      type: [String],
      default: [],
    },
    medicineType: {
      type: String,
      required: true,
    },
    categoryId: {
       type: Schema.Types.ObjectId,
       ref: 'MedicineCategory',
       required: true
    },
    activeIngredient: {
      type: String,
      required: true,
    },
    manufacture: {
      type: String,
      required: true,
    },
    concentration: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const medicineModel = model("Medicine", medicineSchema);









// import { Schema, model } from 'mongoose'

// const brandSchema = new Schema(
//   {
//     name: {
//       type: String,
//       lowercase: true,
//       required: true,
//     },
//     slug: {
//       type: String,
//       unique: true,
//       lowercase: true,
//       required: true,
//     },
    // logo: {
    //   secure_url: {
    //     type: String,
    //     required: true,
    //   },
    //   public_id: {
    //     type: String,
    //     required: true,
    //   },
    // },
//     createdBy: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     subCategoryId: {
//       type: Schema.Types.ObjectId,
//       ref: 'subCategory',
//       required: true,
//     },
//     categoryId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Category',
//       required: true,
//     },
//     customId: String,
//   },
//   {
//     timestamps: true,
//   },
// )

// export const brandModel = model('Brand', brandSchema)
