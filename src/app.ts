import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
const app = express();
app.use(json({ limit: '50mb' }));
app.use(express.json());
const port = process.env.PORT;
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
import routes from './api/routes';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.post('/questions', async (req, res) => {
//     try {
//         const {
//             subTopicId,
//             question,
//             type,
//             marks,
//             difficultyLevel,
//             answers,
//             questionImage = "",
//             additional = "",
//             mcqImage = false,
//             answerCount = 0,
//             importId
//         } = req.body;

//         // Create the question in the database
//         const newQuestion: any = await prisma.question.create({
//             data: {
//                 subTopicId,
//                 question,
//                 type,
//                 marks,
//                 difficultyLevel,
//                 questionImage,
//                 additional,
//                 mcqImage,
//                 answerCount,
//                 importId,
//                 answers: {
//                     create: answers.map((answer: any) => ({
//                         answer: answer.answer,
//                         type: answer.type,
//                         sequenceNo: answer.sequenceNo,
//                         additional: answer.additional,
//                         isCorrect: answer.isCorrect,
//                         answerImage: answer.answerImage,
//                     }))
//                 }
//             },
//             include: {
//                 answers: true, // return the created answers along with the question
//             }
//         });

//         res.status(201).json({
//             message: 'Question created successfully',
//             question: newQuestion,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while creating the question.' });
//     }
// });

app.use('/api/v1', routes)

// API endpoint to create a new question
app.post('/api/questions', async (req, res) => {
    const { subTopicId, question, type, marks, difficultyLevel, answers, questionImage, additional, mcqImage, importId } = req.body;

    try {
        // Check if SubTopic exists
        const subTopicExists = await prisma.subTopic.findUnique({
            where: { id: subTopicId },
        });

        if (!subTopicExists) {
            return res.status(400).json({ error: 'SubTopic not found' });
        }

        // Create the new question
        const newQuestion = await prisma.question.create({
            data: {
                subTopicId,
                question,
                type,
                marks,
                difficultyLevel,
                questionImage: questionImage || "", // Default to empty string if not provided
                additional: additional || "",
                mcqImage: mcqImage || false,
                importId,
                answers: {
                    create: answers, // Create related answers
                },
            },
        });

        return res.status(201).json(newQuestion); // Respond with the created question
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/api/data', async (req, res) => {
    try {

        const questions = await prisma.question.findMany();


        // Construct the response object
        const data = {

            questions,

        };

        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});