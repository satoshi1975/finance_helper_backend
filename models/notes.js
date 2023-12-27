import mongoose from 'mongoose'

const NotesSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
			unique: true,
		},
		group: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'NoteGroup',
			required: false,
		},
		// tags: {
		// 	type: Array,
		// 	default: [],
		// },
		// imageUrl: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Note', NotesSchema)
