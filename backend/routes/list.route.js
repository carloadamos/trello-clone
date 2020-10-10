const router = require('express').Router();
let List = require('../model/list.model');

router.route('/').get((req, res) => {
  List.find()
    .then((lists) => res.json(lists))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const newList = new List({
    title,
    tasks: []
  });

  newList
    .save()
    .then(() => res.json('List added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').put((req, res) => {
  List.findById(req.params.id).then((taskList) => {
    taskList.title = req.body.title;
    taskList.tasks = req.body.tasks;

    taskList
      .save()
      .then(() => res.json('Task list updated'))
      .catch((err) => res.status(400).json(`Error : ${err}`));
  });
});

router.route('/:id').delete((req, res) => {
  List.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task list deleted'))
    .catch((err) => res.status(400).json(`Error : ${err}`));
});

router.route('/').delete((req, res) => {
  List.deleteMany()
    .then(() => res.json('All task list deleted'))
    .catch((err) => res.status(400).json(`Error : ${err}`));
});

module.exports = router;
