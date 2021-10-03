import { Router, RouterOptions } from 'express';
import createExpressRouter from './createExpressRouter';
import ExpressRouterBuilderBase from './ExpressRouterBuilderBase';

export default class ExpressRouterBuilder extends ExpressRouterBuilderBase {
  build(options?: RouterOptions): Router {
    return createExpressRouter(this.works, this.prefix, options);
  }
}
