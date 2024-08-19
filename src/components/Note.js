import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';

const Note = () => {
    const context = useContext (noteContext);
    //descruting 
     const {notes} = context;
  return (
    <>
    <Addnotes/>
    <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note)=>{
            return <Noteitem key={note._id} note ={note}/>
        })}
      
    </div>
    </>
  )
}

export default Note
