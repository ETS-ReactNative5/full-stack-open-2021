const listHelper = require('../utils/list_helper')
const blogs = listHelper.blogs

test('dummy returns one', () => {
  expect(listHelper.dummy(blogs)).toBe(1)
})

describe('total likes', () => {  
  test('when list is empty, equals 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that blog', () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7)
  })

  test('when list has various blogs, equals the sum of likes in all blogs', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })  
})

describe('favorite blog', () => {
  test('when list is empty, equals null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test('when list has only one blog, equals that blog', () => {
    expect(listHelper.favoriteBlog([blogs[0]])).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    })
  })

  test('when list has various blogs, equals the most liked one', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('when list is empty, equals null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('when list has only one blog, equals that blog', () => {
    expect(listHelper.mostBlogs([blogs[0]])).toEqual({
      author: blogs[0].author,
      blogs: 1,
    })
  })

  test('when list has various blogs, equals the author who has the largest amount of blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })  
})

describe('most likes', () => {
  test('when list is empty, equals null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('when list has only one blog, equals that blog', () => {
    expect(listHelper.mostLikes([blogs[0]])).toEqual({
      author: blogs[0].author,
      likes: blogs[0].likes,
    })
  })

  test('when list has various blogs, equals the author whose blogs have the largest amount of likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})