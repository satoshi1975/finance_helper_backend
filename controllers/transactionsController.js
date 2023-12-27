import TransactionsModel from '../models/transactions.js'

export const create = async (req, res) => {
	try {
		const doc = new TransactionsModel({
			title: req.body.title,
			amount: req.body.amount,
			time: req.body.time,
			type: req.body.type,
			user: req.userId,
		})
		const transaction = await doc.save()
		res.json(transaction)
	} catch (err) {
		res.status(500).json({
			message: 'create transaction error' + err,
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const trID = req.params.id
		const transaction = await TransactionsModel.findOne({ _id: trID })
			.populate('user')
			.exec()
		if (!transaction) {
			return res.status(404).json({
				message: 'cant find this transaction',
			})
		}
		res.json(transaction)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'search esrror',
		})
	}
}

export const update = async (req, res) => {
	try {
		const trID = req.params.id
		const transaction = await NoteModel.findOne({ _id: trID })
		if (transaction.user != req.userId) {
			return res.status(400).json({
				message: 'not your note',
			})
		}
		await TransactionsModel.updateOne(
			{ _id: trID },
			{
				title: req.body.title,
				amount: req.body.amount,
				time: req.body.time,
				type: req.body.type,
				user: req.userId,
			}
		)
		res.json({ success: true })
	} catch (err) {
		res.status(500).json({
			message: 'update transaction error',
		})
	}
}

export const getAll = async (req, res) => {
	try {
		const myTransactions = await TransactionsModel.find({ user: req.userId })
			.populate('user')
			.exec()

		res.json(myTransactions)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'cant find your transactions',
		})
	}
}

const getMonthDateRange = (year, month) => {
	const startDate = new Date(year, month, 1)
	const endDate = new Date(year, month + 1, 0)
	return { start: startDate, end: endDate }
}

export const remove = async (req, res) => {
	try {
		const idsToDelete = req.body.ids

		if (!idsToDelete || idsToDelete.length === 0) {
			return res.status(400).send('No IDs provided')
		}
		await TransactionsModel.deleteMany({ _id: { $in: idsToDelete } })
		res.status(200).send('Items deleted successfully')
	} catch (err) {
		res.status(500).send('Server error: ' + error.message)
	}
}

export const search = async (req, res) => {
	try {
		const { year, month } = req.query
		const { start, end } = getMonthDateRange(
			parseInt(year),
			parseInt(month) - 1
		)

		const transactions = await TransactionsModel.find({
			createdAt: {
				$gte: start,
				$lte: end,
			},
		}).sort({ createdAt: -1 })

		res.json(transactions)
	} catch (error) {
		res.status(500).send(error.message)
	}
}
