import React, { useContext } from 'react'
import { useState } from 'react';
import NotesContext from './contexts/notesContextsHere/NotesContext';

export default function AddNote() {
    let {addNote, deleteNote, updateNote} = useContext(NotesContext);
    let [note, setNote] = useState({title:"", discription:""});

    let handleOnchageAddNote = (event)=>{
        setNote({...note, [event.target.id]:event.target.value});
    }

    let handleAddNote = (event) => {
        event.preventDefault();
        addNote(note.title, note.discription);
    }

    return (
    <>
        <div className='container my-3'>
            <form>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={handleOnchageAddNote}/>
            </div>
            <div className="form-group">
                <label htmlFor="discription">Discription</label>
                <textarea id="discription" name="discription" rows="6" className='form-control' onChange={handleOnchageAddNote}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add</button>
            </form>  
        </div>
    </>
  )
}
