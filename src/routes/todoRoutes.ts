import { Router } from 'express';
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todoController';

const router = Router();

router.get('/:id', getTodo);
router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;