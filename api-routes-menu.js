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
	const collection = await getCollection('Menu-API', 'Menu')
	const result = await collection.find({}).toArray()
    response.json(result)
})

// POST /api/menu
Router.post('/', async (request, response) => {
	const collection = await getCollection('Menu-API', 'Menu')
	const { Name, Description, Price, ImgURL } = request.body
    const result = await collection.insertOne({ Name, Description, Price, ImgURL })
    response.json(result)
})

// PUT /api/menu
Router.put('/:id', async (request, response) => {
	const collection = await getCollection('Menu-API', 'Menu')
	const { id } = request.params
	const Name = "test name"
    const Description = "test desc"
    const Price = "$test price"
	const ImgURL = "https://www.steaksandgame.com/images/Product/medium/exotic-eats-what-does-alligator-taste-like-1S-5862.jpg"
	const result = await collection.updateOne({ _id: new ObjectId({ id }) }, { $set: { Name, Description, Price, ImgURL } })
	response.json(result)
})

// DELETE /api/menu
Router.delete('/:id', async (request, response) => {
	const collection = await getCollection('Menu-API', 'Menu')
	const { id } = request.params
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
	response.json(result)
})


module.exports = Router