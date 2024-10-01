import { prisma } from '@/shared/prisma';
import { Router } from 'express';

const router = Router();

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users); // 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users.' })
    }
});

router.get('/questions', async (req, res) => {
    try {
        const questions = await prisma.question.findMany();
        res.json({ total: questions?.length, questions });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users.' })
    }
});
router.delete('/questions', async (req, res) => {
    try {
        await prisma.question.deleteMany(); // Deletes all questions         
        res.status(204).send(); // Respond with no content status     
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting questions.' });
    }
});

export default router;
