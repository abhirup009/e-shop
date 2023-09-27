const express = require('express');
const router = express.Router();
const { loginUserWithEmail } = require('../controllers/auth_controller');

router.post('/login/email', loginUserWithEmail);

module.exports = router;
