import React from 'react'
import { useContext } from 'react';
import NotesContext from './contexts/notesContextsHere/NotesContext';

export default function NoteItem(props) {
    let {deleteNote} = useContext(NotesContext);
    let {note, updateNote} = props;

    let handleDeleteNote = (id)=>{
      deleteNote(id);
    }

    return (
      <div className='col-md-4'>
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.discription}</p>
          <i className="fa-sharp fa-solid fa-trash pointer mx-3" onClick={()=>{handleDeleteNote(note._id)}}/>
          <i className="fa-regular fa-pen-to-square pointer mx-3" onClick={()=>{
            updateNote(note);
          }}/>
        </div>
      </div>
      </div>
  )
}
