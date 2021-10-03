import { RequestHandler } from 'express';
import {
  PathParams, RequestType, RequestParamHandler, RouteMethod, ServeStaticOptions
} from './types';

export const WORK_TYPE = {
  ROUTE: 'ROUTE',
  MIDDLEWARE: 'MIDDLEWARE',
  STATIC: 'STATIC',
  SETTINGS: 'SETTINGS',
  ENGINE: 'ENGINE',
  PARAM: 'PARAM'
} as const;

export type WorkType = typeof WORK_TYPE[keyof typeof WORK_TYPE];

type Work<T> = {
  type: WorkType;
  path: PathParams;
  handlers: T[]
};

export type RouteWork = Work<RequestHandler> & {
  type: typeof WORK_TYPE.ROUTE;
  method: RouteMethod;
};

export type MiddlewareWork = Pick<Work<RequestType | RequestType[]>, 'handlers'> & Partial<Pick<Work<RequestType | RequestType[]>, 'path'>> & {
  type: typeof WORK_TYPE.MIDDLEWARE;
};

export type StaticWork = Partial<Pick<Work<never>, 'path'>> & {
  type: typeof WORK_TYPE.STATIC;
  root: string;
  options?: ServeStaticOptions;
};

export type SettingsWork = {
  type: typeof WORK_TYPE.SETTINGS;
  action: 'enable' | 'disable' | 'set';
  payload: { name: string; value?: unknown; };
};

export type SettingsWorkAction = Pick<SettingsWork, 'action'>[keyof Pick<SettingsWork, 'action'>];

export type SettingsWorkPayload = Pick<SettingsWork, 'payload'>[keyof Pick<SettingsWork, 'payload'>];

export type EngineWork = {
  type: typeof WORK_TYPE.ENGINE;
  ext: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: (path: string, options: object, callback: (e: any, rendered?: string) => void) => void;
};

export type ParamWork = {
  type: typeof WORK_TYPE.PARAM;
  name?: string | string[];
  handler?: RequestParamHandler;
  callback?: (name: string, matcher: RegExp) => RequestParamHandler;
};

export type WorkList = MiddlewareWork | RouteWork | StaticWork | SettingsWork | EngineWork | ParamWork;

export function isRouteWork(work: WorkList): work is RouteWork {
  return work.type === WORK_TYPE.ROUTE;
}

export function isMiddlewareWork(work: WorkList): work is MiddlewareWork {
  return work.type === WORK_TYPE.MIDDLEWARE;
}

export function isStaticWork(work: WorkList): work is StaticWork {
  return work.type === WORK_TYPE.STATIC;
}

export function isSettingsWork(work: WorkList): work is SettingsWork {
  return work.type === WORK_TYPE.SETTINGS;
}

export function isEngineWork(work: WorkList): work is EngineWork {
  return work.type === WORK_TYPE.ENGINE;
}

export function isParamWork(work: WorkList): work is ParamWork {
  return work.type === WORK_TYPE.PARAM;
}

export default Work;
