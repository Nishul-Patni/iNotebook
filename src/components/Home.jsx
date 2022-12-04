import React, {useContext} from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

export default function Home() {
  return (
    <>
      <div className="container my-3">
        <h2>iNotebook</h2>
      </div>
      <AddNote/>
      <Notes/>
    </>
  )
}
