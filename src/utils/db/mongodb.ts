import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
export const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  try {
    if (!uri) {
      throw new Error('A variável MONGODB_URI não está definida!');
    }

    await mongoose.connect(uri, {
      dbName: dbName,
    });

    console.log('Conexão com o MongoDB bem-sucedida');
    return mongoose.connection;
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

connectToDatabase()
  .then(async () => {
    console.log('Teste de conexão com MongoDB concluído');
  })
  .catch(error => {
    console.error('Erro no teste de conexão:', error);
  });
