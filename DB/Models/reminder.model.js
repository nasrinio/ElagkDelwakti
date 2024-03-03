import { Schema, model } from "mongoose";

const reminderSchema = new Schema(
  {
    reminderMsg: {
      type: String,
      required: false,
      lowercase: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    pmId: {        //PrescribedMedicine Id
      type: Schema.Types.ObjectId,
      ref: 'PrescribedMedicine',
      required: true
    },
    isTaken: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: Number,
      required: true,
    },
    dosage: {
      type: String,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const reminderModel = model("Reminder", reminderSchema);






































// import { Schema, model } from 'mongoose'

// const couponSchema = new Schema(
//   {
//     couponCode: {
//       type: String,
//       required: true,
//       lowercase: true,
//     },
//     couponAmount: {
//       type: Number,
//       required: true,
//     },
//     isPercentage: {
//       type: Boolean,
//       default: false,
//       required: true,
//     },
//     isFixedAmount: {
//       type: Boolean,
//       default: false,
//       required: true,
//     },
//     createdBy: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     updatedBy: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     deletedBy: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     fromDate: {
//       type: String,
//       required: true,
//     },
//     toDate: {
//       type: String,
//       required: true,
//     },
//     couponStatus: {
//       type: String,
//       default: 'Valid',
//       enum: ['Valid', 'Expired'],
//     },

//     couponAssginedToUsers: [
//       {
//         userId: {
//           type: Schema.Types.ObjectId,
//           ref: 'User',
//           required: true,
//         },
//         maxUsage: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     couponAssginedToProduct: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Product',
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   },
// )

// export const couponModel = model('coupon', couponSchema)
