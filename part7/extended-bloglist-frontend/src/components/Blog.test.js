import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testing React apps',
  author: 'Sara Martinez',
  url: 'https://testing-react-aps.com',
  likes: 0,
  user: {
    username: 'root'
  }
}

describe('blog lists tests', () => {
  let container
  const editBlog = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} onEdit={editBlog} user={blog.user} />
    ).container
  })

  test('renders the blog´s title and author, but not its url or likes by default', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Testing React apps')
    expect(div).toHaveTextContent('Sara Martinez')
    expect(div.querySelector('.blogDetails')).toBe(null)
  })

  test('clicking the detail button renders the blog´s url and likes', async () => {
    const detailBtn = screen.getByText('view')
    userEvent.click(detailBtn)

    const div = container.querySelector('.blog')
    expect(div.querySelector('.blogDetails')).not.toBe(null)
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const detailBtn = screen.getByText('view')
    userEvent.click(detailBtn)

    const likeBtn = screen.getByText('like')
    userEvent.click(likeBtn)
    userEvent.click(likeBtn)

    expect(editBlog.mock.calls).toHaveLength(2)
  })
})
