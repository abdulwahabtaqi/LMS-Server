import express from "express";
import { sendConn, getAcceptedConnections, getPendingConnections, acceptRequest, rejectRequest, getSendPending } from "./../controllers/connection/connection";
const router = express.Router();

router.post('/sendConn', sendConn);
router.get('/getAcceptedConnections/:userId', getAcceptedConnections);
router.get('/getPendingConnections/:userId', getPendingConnections);
router.get('/getSendPending/:userId', getSendPending);
router.post('/acceptRequest', acceptRequest);
router.post('/rejectRequest', rejectRequest);

export default router;
