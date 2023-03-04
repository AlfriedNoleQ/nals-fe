import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

const PaginationComponent = ({
  totalBlog,
  blogsPerPage,
  setCurrentPage,
  currentPage
}) => {
  const pages = []

  for (let i = 1; i <= Math.ceil(totalBlog / blogsPerPage); i++) {
    pages.push(i)
  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => setCurrentPage(prev => prev - 1)}></Pagination.Prev>

      {pages.map(page => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}>
          {page}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => setCurrentPage(prev => prev + 1)}></Pagination.Next>
    </Pagination>
  )
}

export default PaginationComponent
