import { Router } from "express";
// import { multerCloudFunction } from '../../services/multerCloud.js'
// import { allowedExtensions } from '../../utils/allowedExtensions.js'
import { asyncHandler } from "../../utils/errorhandling.js";
import * as gc from "../Governate/governat.controller.js";
// import { validationCoreFunction } from '../../middlewares/validation.js'
// import * as validators from './category.validationSchemas.js'
// import { isAuth } from '../../middlewares/auth.js'

const router = Router();

router.post("/", asyncHandler(gc.createGovernate));

router.get(
    '/',
    asyncHandler(gc.getAllGovernates),
  )
  
// router.put(
//   '/',
//   asyncHandler(gc.updateProduct),
// )

// router.get('/', asyncHandler(gc.getAllGov))

// router.delete('/', asyncHandler(gc.deleteGovernate))

export default router;
