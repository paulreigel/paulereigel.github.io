const Router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

// GET /api/menu
Router.get('/', async (request, response) => {
	const collection = await getCollection('food-truck', 'menu')
	const result = await collection.find({}).toArray()
    response.json(result)
})

// POST /api/menu
Router.post('/', async (request, response) => {
	const collection = await getCollection('food-truck', 'menu')
	const { name, description, price } = request.body
    const result = await collection.insertOne({ name, description, price })
    response.json(result)
})

// PUT /api/menu
Router.put('/:id', async (request, response) => {
	const collection = await getCollection('food-truck', 'menu')
	const { id } = request.params
	const name = "test name"
    const description = "test desc"
    const price = "$test price"
	const result = await collection.updateOne({ _id: new ObjectId({ id }) }, { $set: { name, description, price } })
	response.json(result)
})

// DELETE /api/menu
Router.delete('/:id', async (request, response) => {
	const collection = await getCollection('food-truck', 'menu')
	const { id } = request.params
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
	response.json(result)
})


module.exports = Router