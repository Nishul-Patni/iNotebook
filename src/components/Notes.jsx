import React, {useContext, useEffect, useRef} from 'react'
import NotesContext from './contexts/notesContextsHere/NotesContext'
import NoteItem from './NoteItem';
import Modal from './Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  let {notes, getNotes} = useContext(NotesContext);
  let [updateThisNote, setUpdateNote] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('authToken')){
      navigate('/login')
      return;
    }
    getNotes();
  }, [])
  
  const modalButton = useRef(null);

  let updateNote = (note)=>{
    setUpdateNote(note);
    modalButton.current.click();
  }

  return (
    <>
        <div className="container justify-content-md-center">
            <h2>Your Notes</h2>
            <div className='row'>
              {
                notes.map((note)=>{
                    return <NoteItem note={note} updateNote={updateNote} key={note._id}/>
                })
              }
            </div>
            <Modal note={updateThisNote}/>
            {/* modal button */}
            <button ref={modalButton} type="button" className="d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

        </div>
    </>
  )
}
