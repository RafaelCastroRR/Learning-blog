// routes/post.routes.js
const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPost, seedDatabase } = require('../controllers/post.controller');

// Pre-poblar la base de datos (solo una vez)
router.route('/seed').get(seedDatabase); // Solo para inicializar

// Rutas para las publicaciones
router.route('/').get(getPosts); // Obtener todas las publicaciones
router.route('/:id').get(getPost); // Obtener publicación por ID

router.route('/').post(createPost); // Crear publicación

module.exports = router;
