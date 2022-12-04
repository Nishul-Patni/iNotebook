import react, { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props) => {
  // let notes = [
  //   {
  //     _id: "632319b9856589cbec2f1b29",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note2",
  //     discription: "testing note2",
  //     date: "2022-09-15T12:25:29.908Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632319c0856589cbec2f1b2b",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note3",
  //     discription: "testing note3",
  //     date: "2022-09-15T12:25:36.732Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "63231a245b9f49ad90044eaa",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note3",
  //     discription: "testing note3",
  //     date: "2022-09-15T12:27:16.779Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632f2d0da80fb0d2143dfb44",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note 12",
  //     discription: "something",
  //     date: "2022-09-24T16:15:09.354Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632f2d11a80fb0d2143dfb46",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note 13",
  //     discription: "something",
  //     date: "2022-09-24T16:15:13.113Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632f2d15a80fb0d2143dfb48",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note 14",
  //     discription: "something",
  //     date: "2022-09-24T16:15:17.185Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632f2d18a80fb0d2143dfb4a",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note 15",
  //     discription: "something",
  //     date: "2022-09-24T16:15:20.262Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632f2d1ba80fb0d2143dfb4c",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note 16",
  //     discription: "something",
  //     date: "2022-09-24T16:15:23.560Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632f2d22a80fb0d2143dfb4e",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note 17",
  //     discription: "something",
  //     date: "2022-09-24T16:15:30.399Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632f2d25a80fb0d2143dfb50",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note 18",
  //     discription: "something",
  //     date: "2022-09-24T16:15:33.568Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632f2d29a80fb0d2143dfb52",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note 19",
  //     discription: "something",
  //     date: "2022-09-24T16:15:37.074Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "632f2d2ea80fb0d2143dfb54",
  //     user: "62f7e24a1d17e68010e6e8f7",
  //     title: "Note 20",
  //     discription: "something",
  //     date: "2022-09-24T16:15:42.416Z",
  //     __v: 0,
  //   },
  // ];

  // let setNotes = null;
  
  
  let[notes, setNotes] = useState([]);

  const host = "http://localhost:5000/api";
  // fetching notes
  let getNotes = async () => {
    console.log("fetching notes");
    const response = await fetch(`${host}/notes/fetchAllNotes/`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('authToken')
      },
    });
    // console.log(response.json()) // parses JSON response into native JavaScript objects
    setNotes(await response.json());
  };

  // 1 Add Note
  let addNote = async (title, discription) => {
    console.log("add note called");
    let note = {
      _id: notes.length + 1,
      user: "62f7e24a1d17e68010e6e8f7",
      title: title,
      discription: discription,
      date: "2022-09-15T12:27:16.779Z",
      __v: 0,
    };

    const response = await fetch(`${host}/notes/addNote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem('authToken')
      },
      body : JSON.stringify(note)
    });

    console.log(await response.json());

    setNotes(notes.concat(note));


  };

  // 2 delete Note
  let deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deletNote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem('authToken')
      },
    });

    let newNotes = notes.filter((note)=>{return note._id!=id});
    setNotes(newNotes);

    // console.log(await response.json()) // parses JSON response into native JavaScript objects
  };

  // 3 update Note
  let updateNote = async (note) => {
    // console.log(note._id);
    const response = await fetch(`${host}/notes/updateNote/${note._id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem('authToken')
      },
      body : JSON.stringify(note)
    });

    const newNotes = [...notes];
    console.log(newNotes);
    for(let i=0; i<newNotes.length; i++){
      if(newNotes[i]._id==note._id){
        newNotes[i].title = note.title;
        newNotes[i].discription = note.discription;
        break;
      }
    }

    setNotes(newNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes}}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;
