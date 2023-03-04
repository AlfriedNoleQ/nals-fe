import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loading = ({ animation = 'border', variant = 'success' }) => {
  return (
    <div className="center">
      <Spinner animation={animation} variant={variant} />
    </div>
  )
}

export default Loading
