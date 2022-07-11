// ========== App
// import all modules
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import { config } from '../config';
import db from './database';

// import all routers
import AuthRouter from '../router/AuthRouter';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setup();
  }

  private setup(): void {
    const { app } = this;

    // Setup some of middlewares
    app.use(compression());
    app.use(helmet());

    if (config.env === 'development') {
      app.use(morgan('dev'));
    }

    // Setup url encoded & json
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Setup cors
    const corsOption: CorsOptions = {
      origin(origin, callback) {
        if (config.clients.indexOf(String(origin)) !== 1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('The RESTful API has beend blocked by Cors'));
        }
      },
    };
    app.use(cors(corsOption));

    db.users.sync();
    db.rooms.sync();
    db.messages.sync();

    db.users.hasMany(db.messages);
    db.messages.belongsTo(db.users, { foreignKey: { name: 'uid' } });

    db.rooms.hasMany(db.messages);
    db.messages.belongsTo(db.rooms, { foreignKey: { name: 'roomId' } });

    // api routes
    app.use('/api/v1', AuthRouter.router);
  }

  public listen() {
    const { app } = this;

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`The RESTful API is being run at ${config.apiUrl}`);
    });
  }
}

export default App;
