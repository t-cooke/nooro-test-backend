import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

export const getTodo = async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;
        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(id) },
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch todo details' });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title, color } = req.body;
        console.log(title, color);
        
        const newTodo = await prisma.todo.create({
            data: { title, color },
        });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, color, done } = req.body;
        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { title, color, done },
        });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.todo.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};
