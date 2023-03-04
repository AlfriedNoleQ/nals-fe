import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// import Navbar from './Navbar'
import { Link, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import Nav from 'react-bootstrap/Nav'
import Loading from './Loading'

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            home
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/create">
            Create Blog
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>

      <Row>{children}</Row>
    </Container>
  )
}

export default MainLayout
