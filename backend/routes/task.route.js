const router = require('express').Router();
let Task = require('../model/task.model');

router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const description = req.body.description;
  const newTask = new Task({ description });

  newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;