// routes/comment.routes.js
const express = require('express');
const router = express.Router();
const { createComment, getComments } = require('../controllers/comment.controller');

// Crear un comentario en una publicación
router.route('/').post(createComment);

// Obtener los comentarios de una publicación específica
router.route('/:postId').get(getComments);

module.exports = router;
