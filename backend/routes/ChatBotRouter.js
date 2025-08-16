const express = require('express');
const router = express.Router();
const { chat } = require('../controller/ChatBot');
const {Authentication}= require('../Auth/Authentication');
router.post('/', chat);

module.exports = router;