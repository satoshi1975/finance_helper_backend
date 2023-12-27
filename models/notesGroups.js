import mongoose from 'mongoose'

const NotesGroupSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		// note: {
		// 	// type: mongoose.Schema.Types.ObjectId,
		// 	// ref: 'Note',
		// 	type: String,
		// 	required: true,
		// },
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

export default mongoose.model('NoteGroup', NotesGroupSchema)
