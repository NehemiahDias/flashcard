import React from 'react'

function CreateForm() {
  return (
    <>
        <h3>Create Deck</h3>
        <form onSubmit={(e) => e.preventDefault()}>
            <input 
                placeholder='Study Deck Title...'
            />
            <input 
                placeholder='description...'
            />
            <button>Submit</button>
        </form>
    </>
  )
}

export default CreateForm