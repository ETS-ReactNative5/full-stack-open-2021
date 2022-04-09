import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls addBlog and creates a new blog', () => {
  const addBlog = jest.fn()

  render(<BlogForm createBlog={addBlog} />)

  const title = screen.getByPlaceholderText('write here title')
  const author = screen.getByPlaceholderText('write here author')
  const url = screen.getByPlaceholderText('write here url')
  const addBtn = screen.getByText('create')

  userEvent.type(title, 'Testing React apps')
  userEvent.type(author, 'Sara Martinez')
  userEvent.type(url, 'https://testing-react-aps.com')
  userEvent.click(addBtn)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Testing React apps')
  expect(addBlog.mock.calls[0][0].author).toBe('Sara Martinez')
  expect(addBlog.mock.calls[0][0].url).toBe('https://testing-react-aps.com')
})