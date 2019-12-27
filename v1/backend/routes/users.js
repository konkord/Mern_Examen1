const router = require('express').Router();

let User = require('../models/users.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:page/:size').get((req, res) => {


  const str = req.query.search || ''
  const gendre = req.query.gendre || 1
  const dob = req.query.gendre || 1

  const page = req.params.page;
  const size = req.params.size;
  User.paginate({ "username" : { $regex: str , $options: 'i' } },{ page: page, limit: size ,sort: { dob: dob , gendre: gendre}})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add1').post((req, res) => {
  const username = req.body.username;
  const gendre = req.body.gendre;
  const dob = req.body.dob;
  const news = req.body.news;
  const email = req.body.email;
  const photo = req.body.photo;

  const newUser = new User({username,gendre,dob,news,email,photo});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.gendre = req.body.gendre;
      user.dob = Date(req.body.dob);
      user.news = req.body.news;
      user.email = req.body.email;
      user.photo = req.body.photo;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;