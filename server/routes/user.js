const express = require('express');
const router = express.Router();

const {updateProfile , searchUsers} = require('../controllers/userController');
const verifyToken = require('../middleware/verify');


router.put('/:userId',verifyToken,updateProfile);
router.get('/search/query', searchUsers);

module.exports=router;