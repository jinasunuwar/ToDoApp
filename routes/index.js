var express = require('express');
var router = express.Router();

const Todos = require('../models/Todos'); //databse ko todo

var todos = require('../resource/todo');  //importing 
//console.log(todos);

/* GET home page. */
router.get('/', async function(req, res, next) {
  const todos = await  Todos.find();
  console.log(todos);
  res.render('home', {title: "Add To Do", todosList:todos});
});

router.get('/', function(req, res, next) {
  res.render('home', {todosList:todos});
});


router.get('/addToDo', function(req, res, next) {
  res.render('addToDo', {title: "Add To Do" });
});


router.post('/saveToDo', async function(req, res, next) {
  const todo = new Todos({
    title: req.body.title,
    description: req.body.description
  });
  await todo.save();

  // todo.save().then(() = console.log('todo inserted')). catch(() => console.log());

  // await Todos.insertMany({ title: req.body.title, description: req.body.description});
  // todos.push({...req.body, _id: `00${todos.length}`});

  res.redirect('/');
})

// router.get('/deleteToDo/:index', function(req, res, next){
//   //console.log(req.params.index);
//   todos.splice(req.params.index,1);
//   res.redirect('/');
// })


// router.get('/deleteToDo/:id', function(req, res, next){
//   ///console.log(req.params.id);
//   const deleteToDo = todos.findIndex(todo => todo._id == req.params.id);
//   todos.splice(deleteToDo,1);
//   res.redirect('/');
// })
router.get('/deleteToDo/:id', async function(req, res, next){
  const deleteToDo = await Todos.remove({_id : req.params.id});
  res.redirect('/');
})

router.get('/openEditForm/:id', async function(req, res, next){
  const todo = await Todos.findOne({ _id: req.params.id });
  res.render('editToDo', {title: 'Edit To Do', todo: todo });
  // const todotodo  = todos.find(todo => todo._id === req.params.id);
  // res.render('editToDo', {todo: todotodo});
})

router.post('/editToDo/:id', async function(req, res, next) {
  const index = await Todos.updateOne({_id: req.params.id}, {$set: {title: req.body.title,
    description: req.body.description}} );
  res.redirect('/');
});

// router.post('/editToDo/:id', function(req, res, next) {
//   console.log(req.body, req.params);
//   const index = todos.findIndex(todo => todo._id == req.params.id);
//   todos.splice(index,1,{...req.body, _id: req.params.id});
//   res.redirect('/');
// })

module.exports = router;

