const express = require("express")
const todoRouter = express.Router()
const Todo = require("../models/todo.js")

todoRouter.get("/", (req, res, next) => {
    Todo.find((err, todos) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(todos)
    })
})
todoRouter.post("/", (req, res, next) => {
    const newTodo = new Todo(req.body) 
    newTodo.save((err, savedTodo) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedTodo)
    })
})
todoRouter.delete("/todoId", (req, res, next) => {
    Todo.findOneAndDelete({ _id: req.params.todoId }, (err, deletedTodo) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`successfully deleted ${deletedTodo.title}`)
    })
})
todoRouter.put("/todoId", (req, res, next) => {
    Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, {new: true}, (err, updatedTodo) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedTodo)
    })
})

module.exports = todoRouter