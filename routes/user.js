const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);

module.exports = router;
