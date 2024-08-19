
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial  = [
        {
          "_id": "6645b396299e303ae5518404",
          "user": "6640bb8f43929db235f4ab0b",
          "title": "Parag ",
          "description": "my des",
          "tag": "i am good ",
          "date": "2024-05-16T07:19:50.804Z",
          "__v": 0
        },
        {
          "_id": "664af0b86cae865fdb3f8907",
          "user": "6640bb8f43929db235f4ab0b",
          "title": "Upadate Notes ",
          "description": "my notes",
          "tag": "i am update notes  ",
          "date": "2024-05-20T06:42:00.911Z",
          "__v": 0
        },
        {
          "_id": "664af0b886cae865fdb3f8907",
          "user": "6640bb8f43929db235f4ab0b",
          "title": "Upadate Notes ",
          "description": "my notes",
          "tag": "i am update notes  ",
          "date": "2024-05-20T06:42:00.911Z",
          "__v": 0
        },
        {
          "_id": "664af0b986cae865fdb3f8907",
          "user": "6640bb8f43929db235f4ab0b",
          "title": "Upadate Notes ",
          "description": "my notes",
          "tag": "i am update notes  ",
          "date": "2024-05-20T06:42:00.911Z",
          "__v": 0
        },
        {
          "_id": "664af0b786cae865fdb3f8907",
          "user": "6640bb8f43929db235f4ab0b",
          "title": "Upadate Notes ",
          "description": "my notes",
          "tag": "i am update notes  ",
          "date": "2024-05-20T06:42:00.911Z",
          "__v": 0
        },
    ]

    const [notes,setNotes]=useState (notesInitial)

    // Add note
    const addNote =(title,description,tag)=>{ //note add use
        // TODO API Call
         console.log("Addiang New Note")
       const note= {
          "_id": "664af0b786cae865fdb3f8907",
          "user": "6640bb8f43929db235f4ab0b9",  
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-05-20T06:42:00.911Z",
          "__v": 0
        };
        setNotes (notes.concat(note))  //push note
    }

    //Delte note 
    const deleteNote =(id)=>{
      console.log("Deleting notes with id "+id)
      const newNotes = notes.filter((note)=>{ return note._id!==id})
       setNotes(newNotes)
    }

    //Edit note
    const editNote =()=>{

    }
    
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;