import { IRoute, Router, RouterOptions } from 'express';
import { PathParams, RequestHandler } from './types';
import {
  isMiddlewareWork, isRouteWork, MiddlewareWork, RouteWork, WorkList
} from './Work';

function performMiddlewareWork(r: Router, work: MiddlewareWork): void {
  const { path, handlers } = work;
  if (path) {
    r.use(path, ...handlers as RequestHandler[]);
  } else {
    r.use(...handlers as RequestHandler[]);
  }
}

function performRouteWorkForRouter(r: Router, work: RouteWork): void {
  const { method, path, handlers } = work;
  r[method](path, ...handlers as RequestHandler[]);
}

function performRouteWorkForRoute(r: IRoute, work: RouteWork): void {
  const { method, handlers } = work;
  r[method](...handlers as RequestHandler[]);
}

function performRouteWork(r: Router | IRoute, work: RouteWork): void {
  if (r instanceof Router) {
    performRouteWorkForRouter(r as Router, work);
  } else {
    performRouteWorkForRoute(r as IRoute, work);
  }
}

function createPerformWork(r: Router | IRoute): (value: WorkList, index: number, array: (WorkList)[]) => void {
  return (w) => {
    if (isMiddlewareWork(w)) {
      if (r instanceof Router) {
        performMiddlewareWork(r as Router, w);
      }
    } else if (isRouteWork(w)) {
      performRouteWork(r, w);
    }
  };
}

export default function createExpressRouter(works: WorkList[], prefix?: PathParams, options?: RouterOptions): Router {
  const router = Router(options);

  const route = prefix ? router.route(prefix) : null;

  const performWork = createPerformWork(route || router);
  works.forEach(performWork);

  return router;
}
