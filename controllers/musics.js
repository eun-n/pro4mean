var express = require('express');
var Music = require('../models/music');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Music.find(function(err, musics) {
      if (err) return res.status(500).send(err);
      res.send(musics);
    });
  })
  .post(function(req, res) {
    Music.create(req.body, function(err, music) {
      if (err) return res.status(500).send(err);
      res.send(music);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Music.findById(req.params.id, function(err, music) {
      if (err) return res.status(500).send(err);
      res.send(music);
    });
  })
  .put(function(req, res) {
    Music.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Music.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;

