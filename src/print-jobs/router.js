import express from 'express';
import {add_job, get_user_jobs, get_print_jobs_id, get_pending_jobs, delete_job} from './controller.js'
import authentication from '../middleware/authentication.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

router.post('/print-job', authentication, add_job);

router.get('/print-jobs/user', authentication, authorization('user'), get_user_jobs);
router.get('/print-jobs/:id', authentication, get_print_jobs_id);

router.get('/print-job/agent',  get_pending_jobs);

router.delete('/print-jobs', authentication, delete_job);

export default router;