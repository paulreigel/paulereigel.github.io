const Router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

// GET /api/events
Router.get('/', async (request, response) => {
	const collection = await getCollection('food-truck', 'events')
	const result = await collection.find({}).toArray()
    response.json(result)
})

// POST /api/events
Router.post('/', async (request, response) => {
	const collection = await getCollection('food-truck', 'events')
	const { name, location, dates, hours } = request.body
    const result = await collection.insertOne({ name, location, dates, hours })
    response.json(result)
})

// PUT /api/events
Router.put('/:id', async (request, response) => {
	const collection = await getCollection('food-truck', 'events')
	const { id } = request.params
	const name = "test name"
    const location = "test location"
    const dates = "test date"
	const hours = "test hours"
	const result = await collection.updateOne({ _id: new ObjectId({ id }) }, { $set: { name, location, dates, hours } })
	response.json(result)
})

// DELETE /api/events
Router.delete('/:id', async (request, response) => {
	const collection = await getCollection('food-truck', 'events')
	const { id } = request.params
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
	response.json(result)
})

module.exports = Router