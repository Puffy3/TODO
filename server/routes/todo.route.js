import express from 'express';
import Todo from '../models/Todo.model.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ 
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

export default router;
