import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import http from 'http'
import notes from './backend/notes.js'
import auth from './backend/auth.js'
import transactions from './backend/transactions.js'

mongoose
	.connect(
		'mongodb+srv://satoshibuterin19331337:4ppKVp48bRAWuxJO@finhelper.otda4fa.mongodb.net/finhelp?retryWrites=true&w=majority'
	)
	.then(() => console.log('DB ok'))
	.catch(err => console.log('DB error', err))

const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())
app.use('', notes)
app.use('', auth)
app.use('', transactions)
app.listen(PORT, err => {
	if (err) {
		return console.log(err)
	}
	console.log(`SERVER is starting on ${PORT}`)
})

// const http = require('http')
// http
// 	.createServer(function (request, response) {
// 		response.end('hello node')
// 	})
// 	.listen(3000, '127.0.0.1', function () {
// 		console.log('alright')
// 	})

export default app
