import { ServerOptions as HttpServerOptions } from 'http';
import { ServerOptions as HttpsServerOptions } from 'https';
import ExpressRouterBuilder from './ExpressRouterBuilder';
import HttpExpressServerBuilder from './HttpExpressServerBuilder';
import HttpsExpressServerBuilder from './HttpsExpressServerBuilder';

export const http = (serverOptions: HttpServerOptions = {}): HttpExpressServerBuilder => new HttpExpressServerBuilder(serverOptions);

export const https = (serverOptions: HttpsServerOptions = {}): HttpsExpressServerBuilder => new HttpsExpressServerBuilder(serverOptions);

export const router = (): ExpressRouterBuilder => new ExpressRouterBuilder();
