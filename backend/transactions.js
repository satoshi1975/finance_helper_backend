import { registerValidator, loginValidator } from '../validations/auth.js'
import { noteCreateValidator } from '../validations/notes.js'

import { transactionsController } from '../controllers/index.js'
import express from 'express'
import { checkAuth, handleValidationErrors } from '../utils/index.js'
const router = express.Router()
router.get('/transactions/search/', checkAuth, transactionsController.search) //search by month and year
router.patch('/transactions/:id', checkAuth, transactionsController.update) // get a certain note
router.get('/transactions/:id', checkAuth, transactionsController.getOne) // get a certain note
router.get('/transactions', checkAuth, transactionsController.getAll) // get all of my notes
router.delete('/transactions', checkAuth, transactionsController.remove) // get all of my notes
router.post(
	'/transactions',
	checkAuth,
	handleValidationErrors,
	transactionsController.create
) // create new transaction

export default router
