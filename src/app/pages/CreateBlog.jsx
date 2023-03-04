/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormInput from '../components/FormInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const CreateBlog = () => {
  const [thumbnail, setThumbnail] = useState()
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state?.data
  const isEditMode = data?.id

  const initialValues = isEditMode
    ? {
        imgUrl: data?.image,
        title: data?.title,
        content: data?.content
      }
    : {
        imgUrl: '',
        title: '',
        content: ''
      }

  const handleSelectImage = e => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setThumbnail(file)
    setFieldValue('imgUrl', file.name)
  }

  useEffect(() => {
    return () => thumbnail && URL.revokeObjectURL(thumbnail.preview)
  }, [thumbnail])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      imgUrl: Yup.string().required('Required'),
      title: Yup.string().required('Required'),
      content: Yup.string().required('Required')
    }),
    onSubmit: values => onSubmit(values)
  })

  const onSubmit = value => {
    const newData = {
      ...value,
      id: uuidv4()
    }

    return new Promise((resolve, reject) => {
      // check edit or add new
      if (!isEditMode) {
        // call api
        try {
          fetch(`https://5f55a98f39221c00167fb11a.mockapi.io/blogs`, {
            method: 'POST',
            body: JSON.stringify(newData)
          })
        } catch (error) {
          reject(error)
        }
      } else {
        // call api
        try {
          fetch(
            `https://5f55a98f39221c00167fb11a.mockapi.io/blogs/${data?.id}`,
            {
              method: 'POST',
              body: JSON.stringify(value)
            }
          )
        } catch (error) {
          reject(error)
        }
      }
      resolve(true)
      // eslint-disable-next-line no-unreachable
      navigate('/')
    })
  }

  const { handleSubmit, values, handleChange, errors, touched, setFieldValue } =
    formik

  return (
    <>
      <h3 className="text-center mb-4">Create blog</h3>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Row>
              <FormInput
                className="mb-2"
                type="file"
                name="imgUrl"
                onChange={handleSelectImage}
                errors={errors}
                touched={touched}
              />
            </Row>

            {thumbnail ? (
              <img
                style={{ width: '100px' }}
                className="mb-2 object-fit-contain border rounded"
                src={thumbnail.preview}
                alt=""
              />
            ) : (
              <img
                style={{ width: '100px' }}
                className="mb-2 object-fit-contain border rounded"
                src={values?.imgUrl}
                alt=""
              />
            )}

            <Row>
              <Col sm={12}>
                <FormInput
                  className="mb-2"
                  type="text"
                  placeholder="title"
                  name="title"
                  value={values.title || ''}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </Col>

              <Col sm={12}>
                <FormInput
                  className="mb-2"
                  type="text"
                  placeholder="content"
                  name="content"
                  value={values.content || ''}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </Col>
            </Row>

            {isEditMode ? (
              <Button type="submit" className="mb-2">
                Edit
              </Button>
            ) : (
              <Button type="submit" className="mb-2">
                submit
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default CreateBlog
