import express from 'express';
import {add_printer, get_printer_by_id, get_printer_by_name, get_printer_by_ip, delete_printer} from './controller.js';
import authentication from '../middleware/authentication.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

router.post('/printer', authentication, add_printer);

router.get('/printer/:id', authentication, get_printer_by_id);
router.get('/printer/name',  authentication, get_printer_by_name);
router.get('/printer/ip', authentication, get_printer_by_ip);

router.delete('/printer/:id', authentication, delete_printer);

export default router;