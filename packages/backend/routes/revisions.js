import { Router } from 'express';
import { getTodayRevision, postTodayRevision, putAssignments } from '../controllers/revisions.js';

const router = Router();

router.get('/assignation-of-today', getTodayRevision);

router.put('/update-revision-today', putAssignments);

router.post('/force-assignation-of-today', postTodayRevision);

export default router;
