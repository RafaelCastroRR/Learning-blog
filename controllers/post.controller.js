// controllers/post.controller.js
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Crear una nueva publicación
const createPost = async (req, res) => {
  const { title, description, course } = req.body;

  // Validación simple
  if (!title || !description || !course) {
    return res.status(400).json({
      success: false,
      message: 'Título, descripción y curso son requeridos',
    });
  }

  if (!['Taller III', 'Práctica Supervisada', 'Tecnología III'].includes(course)) {
    return res.status(400).json({
      success: false,
      message: 'El curso debe ser uno de los siguientes: Taller III, Práctica Supervisada, Tecnología III',
    });
  }

  try {
    const newPost = new Post({
      title,
      description,
      course,
    });

    await newPost.save();
    res.status(201).json({
      success: true,
      message: 'Publicación creada con éxito',
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la publicación',
    });
  }
};

// Obtener todas las publicaciones
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las publicaciones',
    });
  }
};

// Obtener una publicación por ID y sus comentarios
const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    // Obtener comentarios asociados
    const comments = await Comment.find({ postId: post._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { post, comments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la publicación',
    });
  }
};

// Pre-poblar la base de datos con cursos y publicaciones iniciales
const seedDatabase = async () => {
  const courses = ['Taller III', 'Práctica Supervisada', 'Tecnología III'];

  // Comprobar si ya existen cursos
  const existingCourses = await Post.countDocuments();
  if (existingCourses > 0) return; // Si ya existen publicaciones, no hacer nada

  // Crear publicaciones de ejemplo para cada curso
  for (const course of courses) {
    const post1 = new Post({
      title: `Actividad 1 de ${course}`,
      description: `Descripción de la actividad 1 para el curso ${course}.`,
      course: course,
    });

    const post2 = new Post({
      title: `Actividad 2 de ${course}`,
      description: `Descripción de la actividad 2 para el curso ${course}.`,
      course: course,
    });

    await post1.save();
    await post2.save();
  }
};

module.exports = { createPost, getPosts, getPost, seedDatabase };
