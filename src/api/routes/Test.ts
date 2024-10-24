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
router.get('/conn', async (req, res) => {
    try {
        const users = await prisma.connectionRequest.findMany();
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

router.get('/history', async (req, res) => {
    try {
        const questions = await prisma.exportedQuestion.findMany();
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

router.get('/assign', async (req: any, res: any) => {
    try {



        const assignments = await prisma.assignmentQuestion.findMany({

            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true,
                questions: {
                    include: {
                        answers: true,
                    },
                },
                school: true,
                grade: true,
                subject: true,
                topic: true,
                subTopic: true,
            },
        });

        // Filter out duplicate answers for each question
        assignments.forEach(assignment => {
            assignment.questions.forEach(question => {
                const uniqueAnswers = Array.from(
                    new Map(question.answers.map(answer => [answer.answer, answer])).values()
                );
                question.answers = uniqueAnswers;
            });
        });

        return res.status(200).json({ assignments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching assignments.' });
    }


});

router.delete('/assign', async (req, res) => {
    try {
        const assign = await prisma.assignmentQuestion.deleteMany();
        console.log(assign)
        res.status(200).send() // Respond with no content status     
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting questions.' });
    }
});
export default router;
