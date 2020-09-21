
import * as mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);

export const UserSchema = new mongoose.Schema({
  
  firstName : {
    type: String,
    required: true,
    maxlength: 20
  },

  lastName : {
    type: String,
    maxlength: 30,
    required:false,
  },

  age : {
    type: Number,
    required: true,
    max: 120,
    min: 0
  },

  hobbies : {
    type: [String],
    required: true
  },
},
 );
