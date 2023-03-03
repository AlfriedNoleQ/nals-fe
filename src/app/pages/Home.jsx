import React, { useState, useEffect } from 'react'

import ListBlog from '../components/ListBlog'
import Pagination from '../components/Pagination'
// import qs from 'query-string'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { FcGenericSortingAsc, FcGenericSortingDesc } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { selectBlogs, getBlogsApi } from '../../store/slice/blog'

const Home = () => {
  // const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [blogsPerPage] = useState(10)
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState({
    order: 'desc',
    sortBy: 'id'
  })
  const dispatch = useDispatch()
  const selectData = useSelector(selectBlogs)

  /*
   ** Using redux thunk and redux toolkit handle call api
   */

  useEffect(() => {
    dispatch(getBlogsApi(filters))
  }, [dispatch, filters])

  /*
   ** Using fetch handle call api
   */

  // const getData = useCallback(async () => {
  //   const result = await fetch(
  //     `https://5f55a98f39221c00167fb11a.mockapi.io/blogs?${qs.stringify(
  //       filters
  //     )}`
  //   )
  //   if (!result.ok) throw new Error('something wrongs!')
  //   const data = await result.json()
  //   setData(data)
  // }, [filters])

  // useEffect(() => {
  //   getData()
  // }, [getData])

  const lastPostIndex = currentPage * blogsPerPage
  const firstPostIndex = lastPostIndex - blogsPerPage
  const currentBlogs = selectData.slice(firstPostIndex, lastPostIndex)

  const onSearch = e => {
    const { value } = e.target
    setKeyword(value)
    const newFilters = {
      ...filters,
      search: value.trim()
    }
    setFilters(newFilters)
  }

  const onSort = sort => {
    const newFilters = {
      ...filters,
      sortBy: sort
    }
    setFilters(newFilters)
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Form>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={onSearch}
            />
          </Form>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <div className="up" onClick={() => onSort('id')}>
          <FcGenericSortingDesc />
        </div>
        <div className="down" onClick={() => onSort('createdAt')}>
          <FcGenericSortingAsc />
        </div>
      </div>

      <Row>
        <Col>
          <ListBlog list={currentBlogs} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination
            totalBlog={selectData.length}
            blogsPerPage={blogsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
