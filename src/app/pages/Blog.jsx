import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../components/Loading'
import {
  selectBlog,
  getBlogApi,
  selectBlogLoading
} from '../../store/slice/blog'
import { useDispatch, useSelector } from 'react-redux'

const Blog = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const selectData = useSelector(selectBlog)
  const loading = useSelector(selectBlogLoading)

  useEffect(() => {
    dispatch(getBlogApi(params.blogId))
  }, [dispatch, params.blogId])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h3 className="mb-4 text-center">{selectData?.title}</h3>
          <img
            style={{ maxWidth: '720px' }}
            className="d-flex mx-auto mb-4 w-100"
            src={selectData?.image}
            alt={selectData?.title}
          />

          <p className="content text-center">{selectData?.content}</p>
          <Link
            to={`/edit/${params.blogId}`}
            state={{ data: selectData }}
            style={{ maxWidth: '100px' }}
            className="d-flex justify-content-center mx-auto btn btn-primary">
            Edit
          </Link>
        </div>
      )}
    </>
  )
}

export default Blog
