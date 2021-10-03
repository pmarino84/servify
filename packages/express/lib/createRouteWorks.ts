import { RequestHandler } from 'express';
import {
  PathParams, RouteBuilderConfig, RouteConfig, RouteMethod
} from './types';
import { RouteWork, WORK_TYPE } from './Work';

export function createRouteWork(method: RouteMethod, path: PathParams, handlers: RequestHandler[]): RouteWork {
  return {
    type: WORK_TYPE.ROUTE,
    method,
    path,
    handlers
  };
}

export function createRouteWorks(
  ...args: [method: string, path: PathParams, ...handlers: RequestHandler[]] | [items: RouteConfig[]]
): RouteWork[] {
  let works: RouteWork[] = [];

  if (args.length === 1) {
    works = [...(args[0] as RouteConfig[]).map<RouteWork>(({ method, path, handlers }) => createRouteWork(method, path, handlers))];
  } else {
    works.push(createRouteWork(args.shift() as RouteMethod, args.shift() as string, args as RequestHandler[]));
  }

  return works;
}

export function createRouteWorksFactory(method: RouteMethod) {
  return (...args: [path: PathParams, ...handlers: RequestHandler[]] | [items: RouteBuilderConfig[]]): RouteWork[] => {
    let works: RouteWork[] = [];

    if (args.length === 1) {
      works = [...(args[0] as RouteBuilderConfig[]).map<RouteWork>(({ path, handlers }) => createRouteWork(method, path, handlers))];
    } else {
      works.push(createRouteWork(method, args.shift() as string, args as RequestHandler[]));
    }

    return works;
  };
}

export const createRouteWorksForAll = createRouteWorksFactory('all');

export const createRouteWorksForGet = createRouteWorksFactory('get');

export const createRouteWorksForPost = createRouteWorksFactory('post');

export const createRouteWorksForPut = createRouteWorksFactory('put');

export const createRouteWorksForDelete = createRouteWorksFactory('delete');

export const createRouteWorksForPatch = createRouteWorksFactory('patch');

export const createRouteWorksForOptions = createRouteWorksFactory('options');

export const createRouteWorksForHead = createRouteWorksFactory('head');
