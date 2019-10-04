import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../docs/role-manager-api.json';

import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const userRoutes = require('./routes/userRoutes');

const app = express();

if (
  process.env.NODE_ENV === 'development'
    || process.env.NODE_ENV === 'production'
) {
  app.use(logger('dev'));
}

const DEBUG = Debug('dev');
const PORT = process.env.PORT || 5000;

//mongoose connection to MongoDB Compass
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const db_url = 'mongodb://localhost:27017/usersDB';
let mongoDB = process.env.MONGODB_URL ||db_url
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',userRoutes);


app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Role-Manager...'
  });
});

app.get((req, res, next) => {
  const error = new Error('resource not found');
  error.status = 404;
  next();
});

app.get((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: 'an error occurred while loading this page'
    }
  });
});

app.listen(PORT, () => DEBUG(`Server running on port ${PORT}`));

export default app;
