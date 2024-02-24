// import slugify from 'slugify'
// import cloudinary from '../../utils/coludinaryConfigrations.js'
import { medicineCategoryModel } from "../../../DB/Models/medicineCategory.js"


// import { customAlphabet } from 'nanoid'
// import { subCategoryModel } from '../../../DB/Models/subCategory.model.js'
// import { brandModel } from '../../../DB/Models/brand.model.js'
// import { productModel } from '../../../DB/Models/product.model.js'
// const nanoid = customAlphabet('123456_=!ascbhdtel', 5)

// // ========================================== create Category ==========================================
export const createMedicineCategory = async (req, res, next) => {
//   const { _id } = req.authUser
const { name } = req.body


if (await medicineCategoryModel.findOne({ name })) {
     return next(
      new Error('please enter different medicine Category name', { cause: 400 }),
    )
   }
   const medicineCategoryObject = {name}

  const medicineCategory = await medicineCategoryModel.create(medicineCategoryObject)
  if (!medicineCategory) {
    return next(
      new Error('try again later , fail to add medicine Category', { cause: 400 }),
    )
  }

  res.status(200).json({ message: 'Added Done', medicineCategory })
}

// // ========================================== upadte Category ==========================================
// export const updateCategory = async (req, res, next) => {
//   const { _id } = req.authUser
//   const { categoryId } = req.params
//   const { name } = req.body
//   // console.log()
//   // get category by id
//   const category = await categoryModel.findOne({
//     _id: categoryId,
//     createdBy: _id,
//   })
//   if (!category) {
//     return next(new Error('invalud category Id', { cause: 400 }))
//   }

//   if (name) {
//     // different from old name
//     if (category.name == name.toLowerCase()) {
//       return next(
//         new Error('please enter different name from the old category name', {
//           cause: 400,
//         }),
//       )
//     }
//     // unique name
//     if (await categoryModel.findOne({ name })) {
//       return next(
//         new Error('please enter different category name , duplicate name', {
//           cause: 400,
//         }),
//       )
//     }

//     category.name = name
//     category.slug = slugify(name, '_')
//   }

//   if (req.file) {
//     // delete the old category image
//     await cloudinary.uploader.destroy(category.Image.public_id)

//     // upload the new category image
//     const { secure_url, public_id } = await cloudinary.uploader.upload(
//       req.file.path,
//       {
//         folder: `${process.env.PROJECT_FOLDER}/Categories/${category.customId}`,
//       },
//     )
//     // db
//     category.Image = { secure_url, public_id }
//   }
//   category.updatedBy = _id
//   await category.save()
//   res.status(200).json({ message: 'Updated Done', category })
// }

// //========================================== get all categories with subCategories ==========================================
// export const getAllCategories = async (req, res, next) => {
//   const Categories = await categoryModel.find().populate([
//     {
//       path: 'subCategories',
//       select: 'name',
//       populate: [
//         {
//           path: 'Brands',
//           select: 'name',
//         },
//       ], // nested populate
//     },
//   ])
//   console.log({ Categories })

//   //======================================== normal for loop ======================================
//   // for (const category of Categories) {
//   //   const subCategories = await subCategoryModel.find({
//   //     categoryId: category._id,
//   //   })
//   //   const objectCat = category.toObject()
//   //   objectCat.subCategories = subCategories
//   //   categoryArr.push(objectCat)
//   // }

//   //=========================================== cursor way ================================
//   //   const cursor = Categories.cursor()
//   //   for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//   //     const subCategories = await subCategoryModel.find({
//   //       categoryId: doc._id,
//   //     })

//   //     const objectCat = doc.toObject()
//   //     objectCat.subCategories = subCategories
//   //     categoryArr.push(objectCat)
//   //   }

//   res.status(200).json({ message: 'Done', Categories })
// }

// // ========================================= delete category =========================
// export const deleteCategory = async (req, res, next) => {
//   const { _id } = req.authUser
//   const { categoryId } = req.query

//   // check category id
//   const categoryExists = await categoryModel.findOneAndDelete({
//     categoryId,
//     createdBy: _id,
//   })
//   if (!categoryExists) {
//     return next(new Error('invalid categoryId', { cause: 400 }))
//   }

//   //=========== Delete from DB ==============
//   const deleteRelatedSubCategories = await subCategoryModel.deleteMany({
//     categoryId,
//   })

//   if (!deleteRelatedSubCategories.deletedCount) {
//     return next(new Error('delete fail subCate', { cause: 400 }))
//   }
//   const deleteRelatedBrands = await brandModel.deleteMany({
//     categoryId,
//   })
//   if (!deleteRelatedBrands.deletedCount) {
//     return next(new Error('delete fail brands', { cause: 400 }))
//   }
//   const deleteRelatedProducts = await productModel.deleteMany({
//     categoryId,
//   })
//   if (!deleteRelatedProducts.deletedCount) {
//     return next(new Error('delete fail products', { cause: 400 }))
//   }
//   //=========== Delete from cloudinary ==============
//   await cloudinary.api.delete_resources_by_prefix(
//     `${process.env.PROJECT_FOLDER}/Categories/${categoryExists.customId}`,
//   )

//   await cloudinary.api.delete_folder(
//     `${process.env.PROJECT_FOLDER}/Categories/${categoryExists.customId}`,
//   )

//   res.status(200).json({ messsage: 'Deleted Done' })
// }
