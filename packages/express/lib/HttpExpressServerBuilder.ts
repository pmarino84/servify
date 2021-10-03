import http, { Server, ServerOptions } from 'http';
import { Express } from 'express';
import AbstractExpressServerBuilder from './AbstractExpressServerBuilder';

export default class HttpExpressServerBuilder extends AbstractExpressServerBuilder<Server, ServerOptions> {
  /**
   * @override
   */
  serverFactory(app: Express): Server {
    return http.createServer(this.serverOptions, app);
  }
}
