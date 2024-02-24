// import slugify from 'slugify'
// import { customAlphabet } from 'nanoid'
// import cloudinary from '../../utils/coludinaryConfigrations.js'
// const nanoid = customAlphabet('123456_=!ascbhdtel', 5)
import { userModel } from '../../../DB/Models/user.model.js'
import { prescriptionModel } from '../../../DB/Models/prescription.js'

// ========================================== create prescription ==========================================

export const createPrescription = async (req, res, next) => {
    const {createDate} = req.body;
    const { patientId } = req.query;
    // check patientId
    const patientExists = await userModel.findById(patientId);
    if (!patientExists) {
      return next(new Error("invalid patient", { cause: 400 }));
    }
    // //slug
    //   const slug = slugify(name, {
    //     replacement: "_",
    //     lower: true,
    //   });
    // //image
    // if (!req.file) {
    //   return next(new Error("please upload your logo", { cause: 400 }));
    // }
    // const customId = nanoid();
    // const { secure_url, public_id } = await cloudinary.uploader.upload(
    //   req.file.path,
    //   {
    //     folder: `${process.env.PROJECT_FOLDER}/Pharmacies/${customId}`,
    //   }
    // );
    //db
    const prescriptionObject = {
      createDate,
      patientId,
      //slug,
      //image: { secure_url, public_id },

    };
    const prescription = await prescriptionModel.create(prescriptionObject);
    if (!prescription) {
      //await cloudinary.uploader.destroy(public_id);
      return next(
        new Error("try again later , fail to add your prescription", { cause: 400 })
      );
    }
  
    res.status(200).json({ message: "Added Done", prescription });
  };
  
// //======================================= create subCategory ==============================
// export const createSubCategory = async (req, res, next) => {
//   const { categoryId } = req.params
//   const { name } = req.body
//   const category = await categoryModel.findById(categoryId)
//   // check categoryId
//   if (!category) {
//     return next(new Error('invalid categoryId', { cause: 400 }))
//   }

//   // name is unique
//   if (await subCategoryModel.findOne({ name })) {
//     return next(new Error('duplicate name', { cause: 400 }))
//   }
//   // generat slug
//   const slug = slugify(name, '_')

//   // image upload
//   if (!req.file) {
//     return next(new Error('please upload a subcategory image', { cause: 400 }))
//   }

//   const customId = nanoid()
//   // host
//   const { secure_url, public_id } = await cloudinary.uploader.upload(
//     req.file.path,
//     {
//       folder: `${process.env.PROJECT_FOLDER}/Categories/${category.customId}/subCategories/${customId}`,
//     },
//   )

//   // db
//   const subCategoryObject = {
//     name,
//     slug,
//     customId,
//     Image: {
//       secure_url,
//       public_id,
//     },
//     categoryId,
//   }

//   const subCategory = await subCategoryModel.create(subCategoryObject)
//   if (!subCategory) {
//     await cloudinary.uploader.destroy(public_id)
//     return next(new Error('try again later', { cause: 400 }))
//   }
//   res.status(201).json({ message: 'Added Done', subCategory })
// }

// // ========================================== get all subCategories with category Data ==========================================
// export const getAllSubCategories = async (req, res, next) => {
//   const subCategories = await subCategoryModel.find().populate([
//     {
//       path: 'categoryId',
//       select: 'slug',
//     },
//   ])
//   res.status(200).json({ message: 'Done', subCategories })
// }

// // TODO: update and delete subCategory
