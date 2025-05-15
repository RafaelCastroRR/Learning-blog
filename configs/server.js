// configs/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./mongo');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rutas de publicaciones
app.use('/api/posts', require('../routes/post.routes'));

// Rutas de comentarios
app.use('/api/comments', require('../routes/comment.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));