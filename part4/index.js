const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})


/*require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
const Blog = require('./models/blog')
const app = express()

app.use(cors())
app.use(express.json())*/

/* app.get('/api/blogs', (request, response) => {
  console.log("GET", response)
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  console.log("POST", request.body)
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
}) */

/* const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) */