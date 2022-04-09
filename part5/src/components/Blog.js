import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, onEdit, onDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div style={blogStyle} className='blog'>
      <span className='blogTitle'>{`${blog.title} ${blog.author}`}</span>
      <Button
        handleClick={toggleDetailsVisibility}
        text={detailsVisible ? 'hide' : 'view'}
      />

      {detailsVisible && (
        <div className='blogDetails'>
          <div>{blog.url}</div>
          <div>
            {`likes ${blog.likes}`}
            <Button
              handleClick={() => onEdit({ ...blog, likes: blog.likes + 1 })}
              text="like"
            />
          </div>
          <div>{blog.user && blog.user.name}</div>
          {blog.user && blog.user.username === user.username && (
            <Button
              handleClick={() => onDelete(blog)}
              text="remove"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Blog