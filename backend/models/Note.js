const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema ({
   // Which user is login is define (foreankey)
         user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
         } ,  

    title: {
        type: String,
        require: true // field required
     },
  
     description: {
        type: String,
        require: true,
        unique: true // unique true
     },
  
     tag: {
        type: String,
        default:"General"
     },
     date: {
        type: Date,
        default: Date.now
     },
  
});

module.exports = mongoose.model('notes',NotesSchema);