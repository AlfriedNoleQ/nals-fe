import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

const FormInput = ({
  className,
  type,
  value,
  name,
  errors,
  placeholder,
  onChange,
  touched
}) => {
  return (
    <Col sm={12}>
      <Form.Control
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      <p className="error mb-2 text-danger">
        {errors?.[name] && touched?.[name] && errors?.[name]}
      </p>
    </Col>
  )
}

export default FormInput
