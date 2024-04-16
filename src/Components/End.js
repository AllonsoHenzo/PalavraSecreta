import React from 'react'
import "./End.css"

const End = ({retry}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retry}>Restart</button>
    </div>
  )
}

export default End