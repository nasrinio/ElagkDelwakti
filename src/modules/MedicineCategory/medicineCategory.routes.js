import { Router } from "express";
// import { multerCloudFunction } from '../../services/multerCloud.js'
// import { allowedExtensions } from '../../utils/allowedExtensions.js'
import { asyncHandler } from "../../utils/errorhandling.js";
import * as mcc from "../MedicineCategory/medicineCategory.controller.js";
// import { validationCoreFunction } from '../../middlewares/validation.js'
// import * as validators from './category.validationSchemas.js'
// import { isAuth } from '../../middlewares/auth.js'

const router = Router();

router.post("/", asyncHandler(mcc.createMedicineCategory));

// router.put(
//   '/',
//   asyncHandler(gc.updateProduct),
// )

// router.get('/', asyncHandler(gc.getAllGov))

// router.delete('/', asyncHandler(gc.deleteMedicineCategory))

export default router;
