import cors from 'cors';
import express from 'express';
import dbConnection from '../db/config.js';
import { scheduleAssignation } from '../helpers/schedule.js';
import candidateRoute from '../routes/members.js';
import reviewerRoute from '../routes/reviewers.js';
import revisionRoute from '../routes/revisions.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // connect db
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Schedule Job
    scheduleAssignation();

    // App Routes
    this.routes();
  }

  routes() {
    this.app.use('/api/reviewers', reviewerRoute);
    this.app.use('/api/members', candidateRoute);
    this.app.use('/api/revisions', revisionRoute);
  }

  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(cors());

    // Lecture and parse of the body
    this.app.use(express.json());
  }

  async connectDB() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port: ', this.port);
    });
  }
}

export default Server;
