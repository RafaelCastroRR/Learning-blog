// controllers/comment.controller.js
const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Crear un comentario en una publicación
const createComment = async (req, res) => {
  const { postId, userName, content } = req.body;

  // Validación de campos obligatorios
  if (!userName || !content) {
    return res.status(400).json({
      success: false,
      message: 'El nombre del usuario y el contenido son obligatorios',
    });
  }

  // Validación del formato del postId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      success: false,
      message: 'El ID del post no es válido',
    });
  }

  try {
    // Verificar si la publicación existe
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'La publicación no existe',
      });
    }

    // Crear el nuevo comentario
    const newComment = new Comment({
      postId,
      userName,
      content,
    });

    // Guardar el comentario en la base de datos
    await newComment.save();

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Comentario creado con éxito',
      data: newComment,
    });
  } catch (error) {
    console.error('Error al crear el comentario:', error); // Para depuración
    res.status(500).json({
      success: false,
      message: 'Hubo un error al crear el comentario',
    });
  }
};

// Obtener todos los comentarios de una publicación
const getComments = async (req, res) => {
  const { postId } = req.params;

  // Validación del formato del postId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      success: false,
      message: 'El ID del post no es válido',
    });
  }

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los comentarios',
    });
  }
};

module.exports = { createComment, getComments };
