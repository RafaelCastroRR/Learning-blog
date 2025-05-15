const express = require('express');
const router = express.Router();
const { createComment, getCommentsWithPost, getCommentById } = require('../controllers/comment.controller');

// Rutas de comentarios
router.post('/', createComment); // Crear comentario
router.get('/:postId', getCommentsWithPost); // Obtener comentarios junto con la publicación
router.get('/comment/:commentId', getCommentById); // Obtener un comentario por su ID

module.exports = router;
