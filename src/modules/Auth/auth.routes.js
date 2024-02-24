import { Router } from 'express'
const router = Router()
import * as ac from './auth.controller.js'
import { asyncHandler } from '../../utils/errorhandling.js'

router.post('/', asyncHandler(ac.signUp))

router.get('/confirm/:token', asyncHandler(ac.confirmEmail))
router.post('/login', asyncHandler(ac.logIn))
router.post('/forget', asyncHandler(ac.forgetPassword))
router.post('/reset/:token', asyncHandler(ac.resetPassword))

export default router
