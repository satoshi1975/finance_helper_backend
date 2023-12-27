import mongoose from 'mongoose'

const TransactionsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			// required: true,
		},
		amount: {
			type: Number,
			required: true,
			// unique: true,
		},
		time: {
			type: Date,
			required: false,
		},
		type: {
			type: String,
			required: false,
		},
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

export default mongoose.model('Transactions', TransactionsSchema)
