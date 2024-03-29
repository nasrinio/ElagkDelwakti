// import slugify from 'slugify'
import cloudinary from "../../utils/coludinaryConfigrations.js";
import { customAlphabet } from "nanoid";
import { pharmacyyModel } from "../../../DB/Models/pharmacyy.model.js";
import { medicineModel } from "../../../DB/Models/medicine.model.js";
import { cityModel } from "../../../DB/Models/city.js";

const nanoid = customAlphabet("123456_=!ascbhdtel", 5); 

// ========================================== create Pharmacy ==========================================
export const createPharmacy = async (req, res, next) => {
  console.log("Start createPharmacy function");
  const {
    pharmacyName,
    unitPrice,
    phoneNumber,
    operatingHours,
    streetName,
    buildingNum,
  } = req.body;
  const { medicineId, cityId } = req.query;
  console.log("medicineId:", medicineId);
  console.log("cityId:", cityId);
  // check medicineId and cityId
  const [medicineExists, cityExists] = await Promise.all([
    medicineModel.findById(medicineId),
    cityModel.findById(cityId),
  ]);
  console.log("medicineExists:", medicineExists);
  console.log("cityExists:", cityExists);
  if (!medicineExists) {
    console.log("Invalid medicine");
    return next(new Error("invalid medicine", { cause: 400 }));
  }
  if (!cityExists) {
    console.log("Invalid city");
    return next(new Error("invalid city", { cause: 400 }));
  }
  // slug
  //   const slug = slugify(name, {
  //     replacement: "",
  //     lower: true,
  //   });
  //logo
  if (!req.file) {
    console.log("No logo uploaded");
    return next(new Error("please upload your logo", { cause: 400 }));
  }
  const customId = nanoid();
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.PROJECT_FOLDER}/Pharmacies/${pharmacyName + customId}`,
    }
  );
  console.log("Uploaded logo to cloudinary");
  // !db
  const pharmacyObject = {
    pharmacyName,
    unitPrice,
    phoneNumber,
    operatingHours,
    streetName,
    buildingNum,
    //slug,
    logo: { secure_url, public_id },
    medicineId,
    cityId,
    customId,
  };
  console.log("Creating pharmacy in database");
  const pharmacy = await pharmacyyModel.create(pharmacyObject);
  if (!pharmacy) {
    console.log("Failed to add pharmacy to database");
    await cloudinary.uploader.destroy(public_id);
    return next(
      new Error("try again later , fail to add your pharmacy", { cause: 400 })
    );
  }
  console.log("Pharmacy added successfully");
  res.status(200).json({ message: "Added Done", pharmacy });
};



// =====================find Pharmacies By Medicine And City ==========================================

export const findPharmacies = async (req, res) => {
    const { medicineName, cityName } = req.body;

    // Find the city ID based on the provided city name
    const city = await cityModel.findOne({ name: cityName });
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // Find the medicine ID based on the provided medicine name
    const medicine = await medicineModel.findOne({ medicineName });
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    // Find pharmacies with the given medicine ID and city ID
    const pharmacies = await pharmacyyModel.find({
      medicineId: medicine._id,
      cityId: city._id,
    });
    if (!pharmacies) {
      return res.status(404).json({ message: "Pharmacies not found" });
    }
    res.status(200).json({ message: " pharmacies found", pharmacies });
  } 


//================== getAllPharmacies =======================================
export const getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await pharmacyyModel.find().populate("cityId", "name");
    res.status(200).json({ pharmacies });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};








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
