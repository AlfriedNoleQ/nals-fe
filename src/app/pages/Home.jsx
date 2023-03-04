import React, { useState, useEffect, useCallback } from 'react'

import ListBlog from '../components/ListBlog'
import Pagination from '../components/Pagination'
// import qs from 'query-string'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectBlogs,
  getBlogsApi,
  selectBlogsLoading
} from '../../store/slice/blog'
import { debounce } from 'lodash'
import Skeleton from 'react-loading-skeleton'

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
  const loading = useSelector(selectBlogsLoading)

  const arrLoading = [...Array(10)].map((_, i) => (
    <div className={`mt-2 mb-2 rounded`} key={i}>
      <Skeleton height={100} />
    </div>
  ))

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFunc = useCallback(
    debounce(value => setFilters(value), 500),
    []
  )

  const onSearch = e => {
    const { value } = e.target
    setKeyword(value)
    const newFilters = {
      ...filters,
      search: value.trim()
    }
    // using debounce for searching
    debounceFunc(newFilters)
  }

  const onSort = sort => {
    const newFilters = {
      ...filters,
      sortBy: sort
    }
    // using debounce for sorting
    debounceFunc(newFilters)
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
        <div
          style={{ cursor: 'pointer' }}
          className="up text-primary p-2"
          onClick={() => onSort('id')}>
          <AiOutlineArrowUp />
          id
        </div>
        <div
          style={{ cursor: 'pointer' }}
          className="down text-info p-2"
          onClick={() => onSort('createdAt')}>
          <AiOutlineArrowDown />
          created At
        </div>
      </div>

      <Row>
        <Col>
          {loading ? (
            <ul className="list-unstyled">{arrLoading}</ul>
          ) : (
            <ListBlog list={currentBlogs} />
          )}
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
