const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', (request, response) => {
  console.log('GET /api/blogs', response)
  
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/api/blogs', (request, response) => {
  console.log('POST /api/blogs', request.body)
  
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter