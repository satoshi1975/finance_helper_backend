import { noteCreateValidator } from '../validations/notes.js'

import { noteController, noteGroupController } from '../controllers/index.js'
import express from 'express'
import { checkAuth, handleValidationErrors } from '../utils/index.js'

const router = express.Router()

// NOTES API //

router.get('/notes', checkAuth, noteController.getAll) // get all of my notes
router.get('/notes/:id', checkAuth, noteController.getAll) // get all of my notes
router.get('/note/:id', noteController.getOne) // get a certain note
router.post(
	'/notes',
	checkAuth,
	noteCreateValidator,
	handleValidationErrors,
	noteController.create
) // create new note
router.get('/search', checkAuth, noteController.search) // find notes by params
router.delete('/notes/:id', checkAuth, noteController.remove) // create new note
router.patch(
	'/notes/:id',
	checkAuth,
	noteCreateValidator,
	handleValidationErrors,
	noteController.update
) // update note
router.get('/groups', checkAuth, noteGroupController.getAll) // get all of my note groups
router.post('/groups', checkAuth, noteGroupController.create) // create new note group

export default router
