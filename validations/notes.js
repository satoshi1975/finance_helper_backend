import { body } from 'express-validator'

export const noteCreateValidator = [
	body('title', 'Enter post title').isLength({ min: 3 }).isString(),
	body('text', 'Enter post text').isLength({ min: 10 }).isString(),
	body('tags', 'Uncurrect tags format(must be massive)').optional().isArray(),
	body('imageUrl', 'Uncurrect image link').optional().isString(),
]
