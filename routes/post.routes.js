const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');

router.post('/', controller.createPost);
router.get('/', controller.getPosts);
router.get('/:id', controller.getPostById);

module.exports = router;
