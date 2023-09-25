const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');

router.post('/register', UserController.createUser);
router.get('/:id', UserController.getUser);
router.get('/', UserController.getUsers);

module.exports = router;
