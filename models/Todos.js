const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;


const TodosSchema = new Schema({
    title: {
        type : String,
        requires: true,
        //enum : ['a','b,','c']
    },
    description : String
}, {timestamps : true} ); //timestamps gives : createdAt,  updatedAt

module.exports = mongoose.model('Todos', TodosSchema); //model() is method given by mongoose 
//export gareko model ho not schema export gareko hoina

