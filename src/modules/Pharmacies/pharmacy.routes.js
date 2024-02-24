import { Router } from 'express'
import { multerCloudFunction } from '../../services/multerCloud.js'
import { allowedExtensions } from '../../utils/allowedExtensions.js'
import { asyncHandler } from '../../utils/errorhandling.js'
import * as pc from './pharmacy.contoller.js'
// import { validationCoreFunction } from '../../middlewares/validation.js'
// import * as validators from './category.validationSchemas.js'
// import subCategoryRouter from '../subCategories/subCategory.routes.js'
// import { isAuth } from '../../middlewares/auth.js'

const router = Router()

// router.use('/:categoryId', subCategoryRouter)

router.post(
  '/',
  //isAuth(),
  multerCloudFunction(allowedExtensions.Image).single('image'),
  //validationCoreFunction(validators.createPharmacySchema),
  asyncHandler(pc.createPharmacy),
)

// router.put(
//   '/:categoryId',
//   isAuth(),
//   multerCloudFunction(allowedExtensions.Image).single('image'),
//   validationCoreFunction(validators.updateCategorySchema),
//   asyncHandler(cc.update),
// )
router.get('/', asyncHandler(pc.findPharmacies))

router.get('/getAllPharmacies', asyncHandler(pc.getAllPharmacies))

// router.get('/', asyncHandler(cc.getAllCategories))

// router.delete('/', isAuth(), asyncHandler(cc.deleteCategory)) // TODO: api validation

export default router
