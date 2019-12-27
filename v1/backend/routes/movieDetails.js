const router = require('express').Router();

let MovieDetail = require('../models/MovieDetails.model');

router.route('/').get((req, res) => {
  MovieDetail.find()
    .then(movieDetails => res.json(movieDetails))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const year = Number(req.body.year);
  const director = req.body.director;
  const type = req.body.type;

  const newMovieDetail = new MovieDetail({
      title,
      year,
      director,
      type
    });

  newMovieDetail.save()
    .then(() => res.json(newMovieDetail+' added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  MovieDetail.findById(req.params.id)
    .then(movieDetail => res.json(movieDetail))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  MovieDetail.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  MovieDetail.findById(req.params.id)
    .then(movieDetail => {
        movieDetail.title = req.body.title;
        movieDetail.year = req.body.year;
        movieDetail.director = req.body.director;
        movieDetail.type = req.body.type;

      movieDetail.save()
        .then(() => res.json('MovieDetail updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;