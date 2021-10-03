import express, { Express } from 'express';
import { RequestHandler } from './types';
import {
  WORK_TYPE,
  MiddlewareWork,
  RouteWork,
  WorkList,
  StaticWork,
  SettingsWork,
  EngineWork,
  ParamWork
} from './Work';

function performMiddlewareWork(app: Express, work: MiddlewareWork): void {
  const { path, handlers } = work;
  if (path) {
    app.use(path, ...handlers as RequestHandler[]);
  } else {
    app.use(...handlers as RequestHandler[]);
  }
}

function performRouteWork(app: Express, work: RouteWork): void {
  const { method, path, handlers } = work;
  app[method](path, ...handlers as RequestHandler[]);
}

function performStaticWork(app: Express, { path, root, options }: StaticWork): void {
  // TODO: improve typings
  if (path) {
    app.use(path, (express.static(root, options as any) as unknown) as RequestHandler);
  } else {
    app.use((express.static(root, options as any) as unknown) as RequestHandler);
  }
}

function performSettingsWork(app: Express, { action, payload }: SettingsWork): void {
  app[action](payload.name, payload.value);
}

function performEngineWork(app: Express, { ext, fn }: EngineWork): void {
  app.engine(ext, fn);
}

function performParamWork(app: Express, work: ParamWork): void {
  if (work.name && work.handler) {
    app.param(work.name, work.handler);
  } else if (work.callback) {
    app.param(work.callback);
  }
}

// eslint-disable-next-line max-len
type WorkHandler = ((app: Express, work: MiddlewareWork) => void) | ((app: Express, work: RouteWork) => void) | ((app: Express, work: StaticWork) => void) | ((app: Express, work: SettingsWork) => void) | ((app: Express, work: EngineWork) => void) | ((app: Express, work: ParamWork) => void);

const WORK_HANDLER: Record<string, WorkHandler> = {
  [WORK_TYPE.MIDDLEWARE]: performMiddlewareWork,
  [WORK_TYPE.ROUTE]: performRouteWork,
  [WORK_TYPE.STATIC]: performStaticWork,
  [WORK_TYPE.SETTINGS]: performSettingsWork,
  [WORK_TYPE.ENGINE]: performEngineWork,
  [WORK_TYPE.PARAM]: performParamWork
};

function createPerformWork(app: Express): (work: WorkList, index: number, array: (WorkList)[]) => void {
  return (w) => WORK_HANDLER[w.type](app, w as any);
}

export default function createExpressApp(works: Array<WorkList>): Express {
  const app = express();

  const performWork = createPerformWork(app);
  works.forEach(performWork);

  return app;
}
