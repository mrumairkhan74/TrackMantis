const express = require('express');
const upload = require('../config/upload')
const { Authentication, isAdmin } = require('../Auth/Authentication')
const { createUser, loginUser, getUser, getUserById, updateUserById, UpdateUserRole,logoutUser, DeleteUserById } = require('../controller/UserController')
const router = express.Router()


router.post('/signup', upload.single('image'), createUser);
router.post('/login', loginUser);
router.get('/', Authentication, isAdmin, getUser);
router.get('/:id', Authentication, isAdmin, getUserById);
router.post('/logout', Authentication, logoutUser);
router.put('/:id', upload.single('image'), Authentication, updateUserById);
router.put('/role/:id', Authentication, UpdateUserRole);
router.delete('/:id', Authentication, isAdmin, DeleteUserById);

router.get('/me', Authentication, async (req, res) => {
    res.json(req.user);
});
module.exports = router