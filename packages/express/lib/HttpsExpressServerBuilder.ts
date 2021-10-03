import https, { Server, ServerOptions } from 'https';
import { Express } from 'express';
import AbstractExpressServerBuilder from './AbstractExpressServerBuilder';

export default class HttpsExpressServerBuilder extends AbstractExpressServerBuilder<Server, ServerOptions> {
  /**
   * @override
   */
  serverFactory(app: Express): https.Server {
    return https.createServer(this.serverOptions, app);
  }
}
