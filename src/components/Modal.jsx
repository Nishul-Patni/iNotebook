import React from 'react'
import { useRef } from 'react';
import { useState, useEffect, useContext } from 'react';
import NotesContext from './contexts/notesContextsHere/NotesContext';

export default function Modal(props) {
    
    let { note } = props;
    let [updatedNote, setUpdatedNote] = useState({});
    const {updateNote} = useContext(NotesContext)
    let closeModalRef = useRef(null);

    useEffect(() => {
        setUpdatedNote(note);
    }, [note])
    

    const handleUpdateOnChange = (event)=>{
        setUpdatedNote({...updatedNote, [event.target.id]:event.target.value})
    }

    const handleSaveChanges = (event)=>{
        event.preventDefault();
        console.log(updatedNote);
        updateNote(updatedNote);
        closeModalRef.current.click();
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            Update this note
                        </div>
                        <div className="container mx-3 my-3 col-11">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Title</label>
                                    <input type="email" className="form-control" id="title" aria-describedby="emailHelp" onChange={handleUpdateOnChange}  value={updatedNote.title}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Discription</label>
                                    <input type="text" className="form-control" id="discription" onChange={handleUpdateOnChange}  value={updatedNote.discription}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeModalRef} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
