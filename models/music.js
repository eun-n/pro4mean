var mongoose = require('mongoose');

var MusicSchema = new mongoose.Schema({
  title: String,
  //size is XS, S, M, L, XL
  artist: String,
  //image is a url
  album: String, 
  //lifespan is the number of years
  url: String
});

module.exports = mongoose.model('Music', MusicSchema);
