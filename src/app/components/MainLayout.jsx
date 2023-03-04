import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Navbar from './Navbar'

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Navbar />

      <Row>{children}</Row>
    </Container>
  )
}

export default MainLayout
