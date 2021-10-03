import { RequestHandler } from 'express';
import {
  MiddlewareConfig, PathParams, RequestType, RouteBuilderConfig, ServeStaticConfig, ServeStaticOptions
} from './types';

export type RouteBuilderParams<T> = {
  (path: PathParams, ...handlers: RequestHandler[]): T;
  (items: RouteBuilderConfig[]): T;
};

export type MiddlewareBuilderParams<T> = {
  (path?: PathParams, ...handlers: Array<RequestType | Array<RequestType>>): T;
  (items: MiddlewareConfig[]): T;
};

export type StaticBuilderParams<T> = {
  (path: PathParams, root: string, options?: ServeStaticOptions): T; // for app.use method
  (root: string, options?: ServeStaticOptions): T;
  (items: ServeStaticConfig[]): T;
};

export default interface RouterBuilder<T> {
  all: RouteBuilderParams<T>;
  get: RouteBuilderParams<T>;
  post: RouteBuilderParams<T>;
  put: RouteBuilderParams<T>;
  delete: RouteBuilderParams<T>;
  patch: RouteBuilderParams<T>;
  options: RouteBuilderParams<T>;
  head: RouteBuilderParams<T>;

  use: MiddlewareBuilderParams<T>;

  route(prefix: PathParams): T;

  static: StaticBuilderParams<T>;
}
