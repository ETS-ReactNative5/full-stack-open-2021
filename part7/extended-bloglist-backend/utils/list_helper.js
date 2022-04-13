const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
]

const dummy = () => {
  return 1
}

/**
 * @param {*} blogs An array of blog posts
 * @returns The total sum of likes in all of the blog posts
 */
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

/**
 * @param {*} blogs An array of blog posts
 * @returns The most liked blog
 */
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const reducer = (sum, item) => {
    return sum.likes < item.likes ? item : sum
  }

  const favorite = blogs.reduce(reducer, blogs[0])
  
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

/**
 * @param {*} blogs An array of blog posts
 * @returns The author who has the largest amount of blogs
 */
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authors = {}

  blogs.map(({ author }) => {
    authors[author] ? (authors[author] += 1) : (authors[author] = 1)
  })

  const result = Object.keys(authors).sort((a, b) => authors[b] - authors[a])[0]

  return {
    author: result,
    blogs: authors[result],
  }
}

/**
 * @param {*} blogs An array of blog posts
 * @returns The author whose blog posts have the largest amount of likes
 */
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authors = {}

  blogs.map(({ author, likes }) => {
    authors[author] ? (authors[author] += likes) : (authors[author] = likes)
  })

  const result = Object.keys(authors).sort((a, b) => authors[b] - authors[a])[0]

  return {
    author: result,
    likes: authors[result],
  }
}

module.exports = {
  blogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
