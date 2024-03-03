import { Router } from 'express'
// import { multerCloudFunction } from '../../services/multerCloud.js'
// import { allowedExtensions } from '../../utils/allowedExtensions.js'
import { asyncHandler } from '../../utils/errorhandling.js'
import * as cc from './city.controller.js'
// import { validationCoreFunction } from '../../middlewares/validation.js'
// import * as validators from './category.validationSchemas.js'
// import { isAuth } from '../../middlewares/auth.js'

const router = Router()

router.post(
  '/',
  asyncHandler(cc.createCity),
)

router.get(
  '/',
  asyncHandler(cc.getAllCities),
)
router.get(
  '/citiesOfGov',
  asyncHandler(cc.getCitiesByGovernateName),
)

// router.get(
//   '/',
// uploadProcessData
// )

// router.get('/', asyncHandler(cc.getAllProd))

// router.delete('/', asyncHandler(cc.deleteCity))

 export default router
