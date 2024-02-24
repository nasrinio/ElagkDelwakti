import { Router, application } from 'express'
const router = Router()
import * as rc from './reminder.controller.js'
import { asyncHandler } from '../../utils/errorhandling.js'
// import { multerCloudFunction } from '../../services/multerCloud.js'
// import { allowedExtensions } from '../../utils/allowedExtensions.js'
 import { validationCoreFunction } from '../../middlewares/validation.js'
 import {
//   addCouponSchema,
createReminderSchema,
 } from './reminder.validationSchema.js'
 //import { isAuth } from '../../middlewares/auth.js

router.get('/', asyncHandler(rc.getAllReminder))


router.post(
  '/',
  // isAuth(),
  //validationCoreFunction(createReminderSchema),
  asyncHandler(rc.createReminder),
)

router.delete(
  '/',
  // isAuth(),
  // validationCoreFunction(deleteCouponSchem),
  asyncHandler(rc.deleteReminder),
)

export default router
