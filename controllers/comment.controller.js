// controllers/comment.controller.js
const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Obtener todos los comentarios
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los comentarios' });
  }
};

// Obtener un comentario por su ID
const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el comentario' });
  }
};

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

  // Limpiar el postId y verificar el tipo de datos
  const cleanedPostId = postId.trim(); // Elimina espacios al principio y al final
  console.log('Tipo de postId:', typeof postId); // Verifica el tipo de postId
  console.log('postId recibido en la URL:', postId); // Verifica el valor de postId
  console.log('postId limpio:', cleanedPostId); // Muestra el postId limpio

  // Validación del formato del postId
  if (cleanedPostId.length !== 24) {
    console.log('El postId tiene una longitud incorrecta');
    return res.status(400).json({
      success: false,
      message: 'El ID del post no tiene una longitud válida',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(cleanedPostId)) {
    console.log('El postId no es válido según Mongoose');
    return res.status(400).json({
      success: false,
      message: 'El ID del post no es válido',
    });
  }

  try {
    // Verificar si la publicación existe
    const post = await Post.findById(cleanedPostId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'La publicación no existe',
      });
    }

    // Crear el nuevo comentario
    const newComment = new Comment({
      postId: cleanedPostId,
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


module.exports = {
  getAllComments,
  getCommentById,
  createComment
};

module.exports = { createComment,getCommentById , getAllComments};
