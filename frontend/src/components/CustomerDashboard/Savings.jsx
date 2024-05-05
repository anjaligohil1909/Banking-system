import React from 'react'
import CardButton from './CardButton'

function Saving() {
  return (
    <div className="cards-container">
        <CardButton accountDetails={["Saving", "987654321", "$1000.0"]} />
    </div>
  )
}

export default Saving