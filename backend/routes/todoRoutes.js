import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        completed: req.body.completed
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (req.body.title != null){
            todo.title = req.body.title;
        }
        if (req.body.completed != null){
            todo.completed = req.body.completed;
        }
        const updatedTodo = await todo.save();
        res.json(updatedTodo);

    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        await todo.remove();
        res.json({ message: 'Todo deleted'});
    } catch (err) {
        res.status(500).json({ messgae: err.message });
    }
});

export default router;