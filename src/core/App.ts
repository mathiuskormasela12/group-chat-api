// ========== App
// import all modules
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import http, { Server } from 'http';
import { Server as SocketIoServer } from 'socket.io';
import { config } from '../config';
import db from './database';
import { socket } from '../middlewares';

// import all routers
import AuthRouter from '../router/AuthRouter';
import MessageRouter from '../router/MessageRouter';

class App {
  private app: Application;

  private server: Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.setup();
  }

  private setup(): void {
    const { app, server } = this;

    // Setup Socket Io
    const io = new SocketIoServer(server, {
      cors: {
        origin: config.clients,
      },
    });

    io.on('connection', () => {
      // eslint-disable-next-line no-console
      console.log('a use has been connected');
    });

    app.use(socket(io));

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
    db.messages.belongsTo(db.users, { foreignKey: { name: 'userId' } });

    db.rooms.hasMany(db.messages);
    db.messages.belongsTo(db.rooms, { foreignKey: { name: 'roomId' } });

    // api routes
    app.use('/api/v1', AuthRouter.router);
    app.use('/api/v1', MessageRouter.router);
  }

  public listen() {
    const { server } = this;

    server.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`The RESTful API is being run at ${config.apiUrl}`);
    });
  }
}

export default App;
