import express from 'express';
import {fileUpload, getFileInfoById, download_files, usersFiles, deleteFileRecord} from './controller.js';
import authentication from '../middleware/authentication.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

router.post('/file', authentication, authorization('user'), fileUpload);

router.get('/file/:id', authentication, getFileInfoById);
router.get('/files',authentication, authorization('user'), usersFiles);

router.get('/download/agent/:id', download_files);

router.delete('/file/:id', authentication, deleteFileRecord);

export default router;