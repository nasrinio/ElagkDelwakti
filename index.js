import express from 'express'
import { config } from 'dotenv'
import path from 'path'
import { initiateApp } from './src/utils/initiateApp.js'
//import FCM from 'fcm-node/lib/fcm.js'; ;

//import { initializeFirebaseApp, uploadProcessData } from './src/utils/firebase.js'
config({ path: path.resolve('./config/config.env') })

const app = express()
//initializeFirebaseApp()
//uploadProcessData()





initiateApp(app, express)



