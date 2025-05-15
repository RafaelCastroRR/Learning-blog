const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, description, course } = req.body;
  if (!title || !description || !course) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  const post = new Post({ title, description, course });
  await post.save();
  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const { course } = req.query;
  const filter = course ? { course } : {};
  const posts = await Post.find(filter).sort({ createdAt: -1 });
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });
  res.json(post);
};
