var db = require('../connection')
const router = require('express').Router()

// Lists all restaurants in BD
router.get('/list', async (req, res) => {
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  await db.list('restaurants', page, size)
  res.send(db.results)
})

// Lists all restaurants in BD
router.get('/search', async (req, res) => {
  var search = req.query.search
  await db.search('restaurants', search)
  res.send(db.results)
})

// Find restaurant via id
router.get('/find/:id', async (req, res) => {
  var id = req.params.id;
  await db.findOne('restaurants', 'restaurant.id', id)
  res.send(db.results)
})

// List restaurant via city
router.get('/city/:id', async (req, res) => {
  var id = req.params.id;
  id = parseInt(id)
  await db.find('restaurants', 'restaurant.location.city_id', id)
  res.send(db.results)
})

// List all restaurant via rating
router.get('/rating', async (req, res) => {
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  await db.sort('restaurants', 'restaurant.user_rating.aggregate_rating', page, size)
  res.send(db.results)
})

// List all restaurant via rating
router.post('/review', async (req, res) => {
  var id = req.body.id
  var review = req.body.critic
  var author = req.body.author
  await db.update('restaurants', id, review, author)
  res.send('Review added successfully')
})

// List all restaurant via price tag
router.get('/price/:id', async (req, res) => {
  var id = req.params.id;
  id = parseInt(id)
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  await db.list2('restaurants', 'restaurant.price_range', id, page, size)
  res.send(db.results)
})

// List restaurants by popularity
router.get('/popular', async (req, res) => {
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  await db.sort('restaurants', 'restaurant.user_rating.votes', page, size)
  res.send(db.results)
})

module.exports = router