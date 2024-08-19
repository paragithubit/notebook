import React,{useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

const Addnotes = () => {
    const context = useContext (noteContext);
     const {addNote} = context;
     
     //usestate
      const [note,setNote] =useState({title:"", description:"",tag:"default"})
     const handleclick =(e)=>{
        // page is note Realod
        e.preventDefault();
        addNote(note.title ,note.description,note.tag);
     }
      const onChange =(e)=>{
           setNote({...note, [e.target.name]:e.target.value})
      }

    return (
        <>
            <div className='container my-3'>
                <h2>Add a Notes</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" className="form-control" id="description" name='description'onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1" >Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Notes</button>
                </form>
            </div>

        </>
    )
}

export default Addnotes
