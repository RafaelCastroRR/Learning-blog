const express = require('express');
const router = express.Router();
const { createComment, getCommentById ,getAllComments } = require('../controllers/comment.controller');

// Rutas de comentarios
router.post('/', createComment);
router.get('/comment/:commentId', getCommentById); 
router.get('/all', getAllComments);

module.exports = router;
