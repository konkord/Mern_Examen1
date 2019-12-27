const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String,required: true},
  gendre : {type : String , required : true},
  dob : {type : Date , required: true},
  news : {type : Boolean , required : true},
  email : {type : String , required : true},
  photo : {type : String , required : true}
}, {
  timestamps: true,
});

userSchema.plugin(mongoosePaginate)

const User = mongoose.model('users', userSchema,'users');

module.exports = User;
