import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const Navbar = () => {
  return (
    <>
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

      <Outlet />
    </>
  )
}

export default Navbar
