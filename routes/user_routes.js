const express = require('express');
const router = express.Router();

const {
	createUser,
	getUser,
	getUsers,
} = require('../controllers/user_controller');

router.post('/register', createUser);
router.get('/:id', getUser);
router.get('/', getUsers);

module.exports = router;
