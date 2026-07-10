import express from 'express';
import {fileUpload, getFileById, usersFiles, deleteFileRecord} from './controller.js';

const router = express.Router();

router.post('/file', fileUpload);

router.get('/file/:id', getFileById);
router.get('/files', usersFiles);

router.delete('/file/:id', deleteFileRecord);

export default router;