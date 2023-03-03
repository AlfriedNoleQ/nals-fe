import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'

const Blog = () => {
  const params = useParams()
  const [blog, setBlog] = useState()
  // const isAddMode = !params.blogId

  const getData = useCallback(async () => {
    const result = await fetch(
      `https://5f55a98f39221c00167fb11a.mockapi.io/blogs/${params.blogId}`
    )

    if (!result.ok) throw new Error('something wrongs!')
    const data = await result.json()
    setBlog(data)
  }, [params.blogId])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      {blog && (
        <div>
          <h3 className="mb-4 text-center">{blog.title}</h3>
          <img
            className="d-flex mx-auto mb-4"
            src={blog.image}
            alt={blog.title}
          />

          <p className="content text-center">{blog.content}</p>
        </div>
      )}
    </>
  )
}

export default Blog
