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

// Obtener los comentarios de una publicación junto con la publicación
const getCommentsWithPost = async (req, res) => {
  const { postId } = req.params;

  // Limpiar el postId y verificar el tipo de datos
  const cleanedPostId = postId.trim(); // Elimina espacios al principio y al final
  console.log('postId recibido en la URL:', postId); // Verifica el valor de postId
  console.log('postId limpio:', cleanedPostId); // Muestra el postId limpio

  // Validación del formato del postId
  if (!mongoose.Types.ObjectId.isValid(cleanedPostId)) {
    return res.status(400).json({
      success: false,
      message: 'El ID del post no es válido',
    });
  }

  try {
    // Obtener la publicación
    const post = await Post.findById(cleanedPostId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'La publicación no existe',
      });
    }

    // Obtener los comentarios asociados a esa publicación
    const comments = await Comment.find({ postId: cleanedPostId }).sort({ createdAt: -1 });

    // Respuesta exitosa con la publicación y los comentarios
    res.status(200).json({
      success: true,
      data: {
        post, // Incluye los detalles de la publicación
        comments, // Incluye los comentarios asociados
      },
    });
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los comentarios',
    });
  }
};

// Obtener un comentario por su ID
const getCommentById = async (req, res) => {
  const { commentId } = req.params;

  // Limpiar el commentId y verificar el tipo de datos
  const cleanedCommentId = commentId.trim(); // Elimina espacios al principio y al final
  console.log('commentId recibido en la URL:', commentId); // Verifica el valor de commentId
  console.log('commentId limpio:', cleanedCommentId); // Muestra el commentId limpio

  // Validación del formato del commentId
  if (!mongoose.Types.ObjectId.isValid(cleanedCommentId)) {
    return res.status(400).json({
      success: false,
      message: 'El ID del comentario no es válido',
    });
  }

  try {
    // Obtener el comentario por su ID
    const comment = await Comment.findById(cleanedCommentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'El comentario no existe',
      });
    }

    // Obtener la publicación asociada al comentario
    const post = await Post.findById(comment.postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'La publicación asociada al comentario no existe',
      });
    }

    // Respuesta exitosa con el comentario y la publicación
    res.status(200).json({
      success: true,
      data: {
        comment,  // Incluye los detalles del comentario
        post,     // Incluye los detalles de la publicación asociada
      },
    });
  } catch (error) {
    console.error('Error al obtener el comentario:', error);
    res.status(500).json({
      success: false,
      message: 'Hubo un error al obtener el comentario',
    });
  }
};

module.exports = { createComment, getCommentsWithPost, getCommentById };
