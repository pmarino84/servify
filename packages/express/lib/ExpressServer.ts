import { Server } from 'http';
import { Express } from 'express';
import noop from 'lodash/noop';

interface ServerFactory<T> {
  (app: Express): T;
}

export default class ExpressServer<T extends Server> {
  server: T | null;

  serverFactory: ServerFactory<T>;

  constructor(public app: Express, serverFactory: ServerFactory<T>) {
    this.server = null;
    this.serverFactory = serverFactory;
  }

  listen(port = 8080, listeningListener = noop): this {
    this.server = this.serverFactory(this.app);
    this.server.listen(port, listeningListener);
    return this;
  }
}
