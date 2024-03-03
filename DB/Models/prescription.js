import { Schema, model } from 'mongoose'

const prescriptionSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createDate: {
      type: Date,
      default: Date.now
    }
    
  },
  { timestamps: true },
)

export const prescriptionModel = model('Prescription', prescriptionSchema)






































// const { Schema, model } = ("mongoose");

// import { Schema, model } from 'mongoose'

// const cartSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     products: [
//       {
//         productId: {
//           type: Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     subTotal: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true },
// )

// export const cartModel = model('Cart', cartSchema)
