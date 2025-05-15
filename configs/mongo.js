const mongoose = require('mongoose');
require('dotenv').config(); // Carga las variables de entorno

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    process.exit(1); // Finaliza el proceso en caso de error
  }
};

module.exports = connectDB;
