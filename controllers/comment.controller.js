const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  const { postId } = req.params;
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ message: 'Nombre y contenido requeridos' });
  }
  const comment = new Comment({ postId, name, content });
  await comment.save();
  res.status(201).json(comment);
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
  res.json(comments);
};
