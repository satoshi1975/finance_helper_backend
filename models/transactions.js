import mongoose from 'mongoose'

const TransactionsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		amount: {
			type: Number,
			required: true,
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
