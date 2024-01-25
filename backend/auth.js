import { registerValidator, loginValidator } from '../validations/auth.js'
import { userController } from '../controllers/index.js'
import express from 'express'
import { checkAuth, handleValidationErrors } from '../utils/index.js'

const router = express.Router()
// LOGIN
router.post(
	'/auth/login',
	loginValidator,
	handleValidationErrors,
	userController.login
)

// REGiSTER
router.post(
	'/auth/register',
	registerValidator,
	handleValidationErrors,
	userController.register
)
router.get('/auth/me', checkAuth, userController.getMe)

export default router
