const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment.controller');

router.post('/:postId', controller.createComment);
router.get('/:postId', controller.getCommentsByPost);

module.exports = router;
