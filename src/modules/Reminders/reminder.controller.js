import { prescribedMedicineModel } from "../../../DB/Models/prescribedMedicine.model.js";
import { reminderModel } from "../../../DB/Models/reminder.model.js";
import FCM from 'fcm-node/lib/fcm.js';

//================================== add reminder ==========================
export const createReminder = async (req, res, next) => {
  const { reminderMsg, startDate, isTaken, frequency, dosage, duration } =
    req.body;

  const { pmId } = req.query;

  // check pmId
  const pmExists = await prescribedMedicineModel.findById(pmId);

  if (!pmExists) {
    return next(new Error("invalid Prescribed Medicine", { cause: 400 }));
  }

  // //slug
  //   const slug = slugify(name, {
  //     replacement: "_",
  //     lower: true,
  //   });

  //db
  const reminderObject = {
    reminderMsg,
    startDate,
    isTaken,
    frequency,
    dosage,
    duration,
    pmId,
  };
  const reminder = await reminderModel.create(reminderObject);
  if (!reminder) {
    return next(
      new Error("try again later , fail to add your reminder", {
        cause: 400,
      })
    );
  }

  res.status(200).json({ message: "Added Done", reminder });
};



//================================== notification ==========================
export const fcmNotification = async (req, res, next) => {
  try {
      let fcm = new FCM(process.env.SERVERKEY)
      let message = {
          to: '/topics/' + req.body.topic,
          notification: {
              title: req.body.title,
              body: req.body.body,
              sound: "default",
              click_action: "FCM_PLUGIN_ACTIVITY",
              icon: "fcm_push_icon"
          },
          // data: {
          //     title: req.body.title,
          //     body: req.body.body
          // }
      }
  fcm.send(message ,(err, response) => {
      if (err) {
          next(err)
      }else{
          res.send(response)
      }
  })

  } catch (error) {
      next(error)
  }
}

























//   const isCouponCodeDuplicated = await couponModel.findOne({ couponCode })
//   if (isCouponCodeDuplicated) {
//     return next(new Error('duplicate coupon code', { cause: 400 }))
//   }

//   if ((!isFixedAmount && !isPercentage) || (isFixedAmount && isPercentage)) {
//     return next(
//       new Error('please select if teh coupon is percentage or fixedAmount', {
//         cause: 400,
//       }),
//     )
//   }

//   // [ { userId: '' , maxUsage:3 }, {userId:'', maxUage:7}]
//   let userIdsArr = []
//   for (const user of couponAssginedToUsers) {
//     userIdsArr.push(user.userId)
//   }
//   // console.log(userIdsArr) // [ '64e3b0f61f37b9ceee383c23', '64e3af481f37b9ceee383c1f' ]
//   const usersCheck = await userModel.find({
//     _id: { $in: userIdsArr },
//   })
//   if (userIdsArr.length !== usersCheck.length) {
//     return next(new Error('invalid userIds', { cause: 400 }))
//   }
//   const couponObject = {
//     couponCode,
//     couponAmount,
//     isPercentage,
//     isFixedAmount,
//     fromDate,
//     toDate,
//     couponAssginedToUsers,
//     // couponAssginedToProduct,
//     createdBy: req.authUser._id,
//   }
//   const couponDb = await couponModel.create(couponObject)
//   if (!couponDb) {
//     return next(new Error('fail to add coupon', { cause: 400 }))
//   }
//   res.status(201).json({ message: 'done', couponDb })
// }

// // ================================== delete coupon ==========================
// export const deleteCoupon = async (req, res, next) => {
//   const { _id } = req.query

//   const userId = req.authUser._id
//   const isCouponCodeDuplicated = await couponModel.findOneAndDelete({
//     _id,
//     createdBy: userId,
//   })
//   if (!isCouponCodeDuplicated) {
//     return next(new Error('invalid couponId', { cause: 400 }))
//   }
//   res.status(201).json({ message: 'done' })
// }
