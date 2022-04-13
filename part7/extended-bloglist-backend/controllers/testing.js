const router = require('express').Router()
const Blog = require('../cryptic-tundra-07821/models/blog')
const User = require('../cryptic-tundra-07821/models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router