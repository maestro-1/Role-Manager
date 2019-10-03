import Debug from 'debug';
import express from 'express';
import logger from 'morgan';

const app = express();

if (
  process.env.NODE_ENV === 'development'
  || process.env.NODE_ENV === 'production'
) {
  app.use(logger('dev'));
}

const DEBUG = Debug('dev');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Role-Manager...'
  });
});

app.get('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Resource does not exist',
  });
});

app.listen(PORT, () => DEBUG(`Server running on port ${PORT}`));

export default app;
