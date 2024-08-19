const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the notes  using: Get "/api/notes/fetchalluser". login required
router.get('/fetchalluser', fetchuser, async (req, res) => {
    try {
        //Fetch Data
        const note = await Note.find({ user: req.user.id });
        res.json(note)

    } catch (error) {
        console.error(error.message);
        res.status(400).json("Internal servar Error")
    }
})

//Route 2 : Add new notes using post "api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Title is reqyired').isLength({ min: 5 }),
    body('description', 'description must be 5 chater ').isLength({ min: 5 }),
], async (req, res) => {
       try {
        
       
    // which field required
    const { title, description, tag } = req.body;

    // If there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // New Note     
    const note = new Note({
        title, description, tag, user: req.user.id
    })
 
    //Note Save
    const saveNote = await note.save();
    res.json(saveNote)
} catch (error) {
      console.error(error.message)
      res.status(500).send ("Internal servar Error")  
}
})

//Route 3: upadate notes using put "/api/note/upadatenote". login required
router.put('/upadatenote/:id', fetchuser, async (req, res) => {
    // descruting 
    const { title, description, tag } = req.body;
    try {
        // create new object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find by id 
        let note = await Note.findById(req.params.id);
        //if notes  not of exists 
        if (!note) {
            return res.status(404).send("Not Found")
        }
         // if user not
     if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
      }
        //Update Notes
        note = await Note.findByIdAndUpdate(req.params.id, { set: newNote }, { new: true });
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(400).json("Internal servar Error")
    }
})


//Route 4 : Delete notes using delete "/api/note/deletenote". login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // descruting 
    const { title, description, tag } = req.body;
    try {

        // Find by notes and deleted 
        let note = await Note.findById(req.params.id);
        //if notes   not of exists 
        if (!note) {
            return res.status(404).send("Not Found")
        }
        // if note user define
        if (note.user.toString() !== req.user.id){
            res.status(404).send ("Not Allowed")
       }     

        //Delete  Notes
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Sucess": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(400).json("Internal servar Error")
    }
})

module.exports = router