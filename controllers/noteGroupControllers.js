import NotesGroup from '../models/notesGroups.js'

export const getAll = async (req, res) => {
	try {
		const myGroups = await NotesGroup.find({ user: req.userId })

		res.json(myGroups)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'cant find your groups',
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new NotesGroup({
			name: req.body.name,

			user: req.userId,
		})
		const group = await doc.save()
		res.json(group)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: req.body,
		})
	}
}
