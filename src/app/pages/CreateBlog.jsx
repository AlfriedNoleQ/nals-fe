import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

const CreateBlog = () => {
  return (
    <Row>
      <Col>
        <Form>
          <Form.Control className="mb-2" type="text" placeholder="title" />
          <Form.Control className="mb-2" type="text" placeholder="content" />
        </Form>
      </Col>
    </Row>
  )
}

export default CreateBlog
