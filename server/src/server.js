import app from './app.js';
import { connectDatabase } from './config/database.js';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

