const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieDetailsSchema = new Schema({
  title : String,
  year : Number,
  director : String,
  type : String,
}, {
  timestamps: true,
});


const MovieDetails = mongoose.model('movieDetails', movieDetailsSchema,'movieDetails');

module.exports = MovieDetails;