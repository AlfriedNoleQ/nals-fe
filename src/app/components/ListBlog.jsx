import React from 'react'
import styles from './list-blog.module.css'
import { Link } from 'react-router-dom'

const ListBlog = ({ list }) => {
  return (
    <>
      <ul className="list-unstyled">
        {list &&
          list.map(blog => (
            <li className={`${styles.item} mt-2 mb-2`} key={blog.id}>
              <Link to={`/${blog.id}`}>
                <img src={blog?.image} className="mr-4" alt={blog?.title} />
              </Link>
              <div className="media-body">
                <h5 className="mt-0 mb-1">{blog?.title}</h5>
                <p>{blog?.content}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}

export default ListBlog
