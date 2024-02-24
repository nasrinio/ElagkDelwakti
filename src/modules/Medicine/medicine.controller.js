//import slugify from 'slugify'
// import cloudinary from '../../utils/coludinaryConfigrations.js'
// import { customAlphabet } from 'nanoid'
import { medicineModel } from "../../../DB/Models/medicine.model.js";
import { medicineCategoryModel } from "../../../DB/Models/medicineCategory.js";
// const nanoid = customAlphabet('123456_=!ascbhdtel', 5)

//=================================== Add medicine ========================
export const addMedicine = async (req, res, next) => {
  const {
    medicineName,
    prescriptionRequired,
    storageCondition,
    expiryDate,
    usageInstruction,
    sideEffects,
    activeIngredient,
    medicineType,
    manufacture,
    concentration,
  } = req.body;
  const { categoryId } = req.query;
  // check categories

  const categoryExists = await medicineCategoryModel.findById(categoryId);

  if (!categoryExists) {
    return next(new Error("invalid categories", { cause: 400 }));
  }
  //   // slug
  //   const slug = slugify(name, {
  //     replacement: '_',
  //     lower: true,
  //   })
  //   //logo
  //   if (!req.file) {
  //     return next(new Error('please upload your logo', { cause: 400 }))
  //   }
  //   const customId = nanoid()
  //   const { secure_url, public_id } = await cloudinary.uploader.upload(
  //     req.file.path,
  //     {
  //       folder: `${process.env.PROJECT_FOLDER}/Medicines/${customId}`,
  //     },
  //   )
     // db
    const medicineObject = {
    medicineName,
    prescriptionRequired,
    storageCondition,
    expiryDate,
    usageInstruction,
    sideEffects,
    activeIngredient,
    manufacture,
    medicineType,
    concentration,
  //     slug,
  //     logo: { secure_url, public_id },
  categoryId,
  //     customId,
  }
     const dbMedicine = await medicineModel.create(medicineObject)
     if (!dbMedicine) {
  //     await cloudinary.uploader.destroy(public_id)
      return next(new Error('try again later', { cause: 400 }))
   }
   res.status(201).json({ message: 'CreatedDone', dbMedicine })
};

// // TODO: update and delete brand , get all brands with products
