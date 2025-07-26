const express = require('express');
const upload = require('../config/upload')
const { Authentication, isAdmin } = require('../Auth/Authentication');
const { createBug, getBug, getBugByUserId, getBugById, updateBugStatus, DeleteBugByUser } = require('../controller/BugController');
const router = express.Router()
const Bug = require('../models/BugModel')

router.post('/create', upload.fields([
    { name: 'screenShot', maxCount: 5 },
    { name: 'documentFiles', maxCount: 5 }
]), Authentication, createBug)
router.get('/', getBug)
router.get('/user/:id', Authentication, getBugByUserId)
router.get('/:id', Authentication, getBugById)
router.put('/:id', Authentication, updateBugStatus)
router.delete('/:id/:bugId', Authentication, DeleteBugByUser);


module.exports = router