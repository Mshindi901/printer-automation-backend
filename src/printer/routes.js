import express from 'express';
import {add_printer, get_printer_by_id, get_printer_by_name, get_printer_by_ip, delete_printer} from './controller.js'

const router = express.Router();

router.post('/printer', add_printer);

router.get('/printer/:id', get_printer_by_id);
router.get('/printer/name', get_printer_by_name);
router.get('/printer/ip', get_printer_by_ip);

router.delete('/printer/:id', delete_printer);

export default router;