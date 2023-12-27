import NoteModel from '../models/notes.js'

export const update = async (req, res) => {
	try {
		const noteID = req.params.id
		const note = await NoteModel.findOne({ _id: noteID })
		if (note.user != req.userId) {
			return res.status(400).json({
				message: 'not your note',
			})
		}
		await NoteModel.updateOne(
			{ _id: noteID },
			{
				title: req.body.title,
				text: req.body.text,
				group: req.body.group,
				// imageUrl: req.body.imageUrl,
				user: req.userId,
				// tags: req.body.tags,
			}
		)
		res.json({ success: true })
	} catch (err) {
		console.log(req)
		console.log(err)
		res.status(500).json({
			message: 'update note error',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const noteID = req.params.id
		const note = await NoteModel.findOne({ _id: noteID })
		if (!note) {
			return res.status(404).json({
				message: 'cant find this note',
			})
		} else if (note.user != req.userId) {
			return res.status(500).json({
				message: 'not your note',
			})
		}
		const delNote = await NoteModel.findByIdAndDelete(noteID)

		res.json(delNote)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'note delet error',
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const noteID = req.params.id
		const note = await NoteModel.findOne({ _id: noteID })
			.populate('user')
			// .populate('group')
			.exec()
		if (!note) {
			return res.status(404).json({
				message: 'cant find this note',
			})
		}
		res.json(note)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'search error',
		})
	}
}

export const getAll = async (req, res) => {
	try {
		const myNotes = await NoteModel.find({ user: req.userId })
			.populate('user')
			.exec()

		res.json(myNotes)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'cant find your notes',
		})
	}
}

export const search = async (req, res) => {
	try {
		const { search, group } = req.query

		let query = {}

		if (search || group) {
			const searchQuery = search
				? {
						$or: [
							{ title: new RegExp('^' + escapeRegex(search), 'i') },
							{ text: new RegExp('^' + escapeRegex(search), 'i') },
						],
				  }
				: {}

			const groupQuery = group ? { group: group } : {}

			query = {
				$and: [searchQuery, groupQuery].filter(q => Object.keys(q).length),
			}
		}

		const results = await NoteModel.find(query)

		res.json(results)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export const create = async (req, res) => {
	try {
		const doc = new NoteModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.bodyimageUrl,
			// tags: req.body.tags,
			user: req.userId,
		})
		const note = await doc.save()
		res.json(note)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'create note error',
		})
	}
}
