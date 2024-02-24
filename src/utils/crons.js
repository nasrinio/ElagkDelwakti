 import { scheduleJob } from 'node-schedule'
// import { couponModel } from '../../DB/Models/coupon.model.js'
// import moment from 'moment-timezone'

// export const changeCouponStatusCron = () => {
//   scheduleJob('* * * * * *', async function () {
//     // console.log(validCoupons)
//     for (const coupon of validCoupons) {
//       //   console.log({
//       //     momentToDate: moment(coupon.toDate),
//       //     now: moment(),
//       //     cond: moment(coupon.toDate).isBefore(moment()),
//       //   })
//       if (
//         moment(coupon.toDate)
//           .tz('Africa/Cairo')
//           .isBefore(moment().tz('Africa/Cairo'))
//       ) {
//         coupon.couponStatus = 'Expired'
//       }
//       await coupon.save()
//     }

//     console.log(`cron changeCouponStatusCron() is running.........`)
//   })
// }




// export const reminderCron = () => {
//   scheduleJob('* * 1 * * *', async function () {
//     // console.log(validCoupons)

    
//     console.log(`cron changeCouponStatusCron() is running.........`)
//   }
// )}
