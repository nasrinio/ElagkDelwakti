import { connectionDB } from "../../DB/connection.js";
import { globalResponse } from "./errorhandling.js";
import * as routers from "../modules/index.routes.js";
import cors from "cors";
//import {uploadProcessData} from "./firebase.js"
 //import { reminderCron } from './crons.js'
//import { client } from "../services/sendSMS.js";
// import { whatsappClient } from "../services/whatsappClient.js";
// import {client} from "../services/whatsappClient.js"
//import FCM from 'fcm-node/lib/fcm.js';


export const initiateApp = (app, express) => {
    const port = process.env.PORT;
    
    app.use(express.json());
    //app.use(express.urlencoded({ extended: false }));
    
    connectionDB();
    app.use(cors());
    
    app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/pharmacy", routers.pharmacyRouter);
  // app.use('/subCategory', routers.subCategoryRouter)
  app.use("/medicine", routers.medicineRouter);
  // app.use('/product', routers.productRouter)
  app.use("/auth", routers.auhtRouter);
  app.use("/reminder", routers.reminderRouter);
  app.use("/city", routers.cityRouter);  
  app.use("/governate", routers.governateRouter);
  app.use("/medicineCategory", routers.medicineCategoryRouter);
  app.use("/prescription", routers.prescriptionRouter);
  app.use("/prescribedMedicine", routers.prescribedMedicineRouter);

//   app.post('/fcm', async(req, res, next) => {
//     try {
//         let fcm = new FCM(process.env.SERVERKEY)
//         let message = {
//             to: '/topics/' + req.body.topic,
//             notification: {
//                 title: req.body.title,
//                 body: req.body.body,
//                 sound: "default",
//                 click_action: "FCM_PLUGIN_ACTIVITY",
//                 icon: "fcm_push_icon"
//             },
//             // data: {
//             //     title: req.body.title,
//             //     body: req.body.body
//             // }
//         }
//     fcm.send(message ,(err, response) => {
//         if (err) {
//             next(err)
//         }else{
//             res.send(response)
//         }
//     })

//     } catch (error) {
//         next(error)
//     }
// })




  app.all("*", (req, res, next) =>
    res.status(404).json({ message: "404 Not Found URL" })
  );

  app.use(globalResponse);
   //reminderCron(
//client

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};
