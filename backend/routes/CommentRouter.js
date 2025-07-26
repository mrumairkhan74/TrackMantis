// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { createComment, getCommentsByBugId, deleteCommentById } = require('../controller/CommentController');
const { Authentication } = require('../Auth/Authentication');
const upload = require('../config/upload')
// POST /comment/create
router.post('/create',upload.single('uploadFile') ,Authentication, createComment);
router.delete('/:commentId', Authentication, deleteCommentById);
// GET /comment/bug/:bugId
router.get('/bug/:bugId', getCommentsByBugId);

module.exports = router;