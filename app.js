import './config/environment.js';
import express, { urlencoded, json } from 'express';
import cors from 'cors';
import session from 'express-session';
import sequelize from './config/database.js';
import ApiError from './utils/ApiError.js';
import { ErrorHandler } from './middleware/Error.js';

import bookingRoutes from './routes/booking.routes.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to Database 🚀');

    // Synchronize the models with the database (create tables if they don't exist)
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env['SESSION_SECRET'],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 86400000 }
  })
);

app.get('/', (_req, res) => {
  res.status(200).send({ data: 'API is up and running... 🚀', status: 200 });
});

app.use('/api/booking', bookingRoutes);

// if any unknown endpoint is hit then the error is handelled
app.use((_req, _res) => {
  throw new ApiError(404, 'Page Not Found');
});
app.use(ErrorHandler);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`server is listning on port ${port}...`);
});

// Export the app and a function to close the database connection
export { app, sequelize, server };
