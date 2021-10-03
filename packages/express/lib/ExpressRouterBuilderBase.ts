import { RequestHandler } from 'express';
import * as rw from './createRouteWorks';
import createMiddlewareWorks from './createMiddlewareWorks';
import RouterBuilder from './RouterBuilder';
import {
  PathParams, RouteBuilderConfig, RequestType, MiddlewareConfig, ServeStaticConfig, ServeStaticOptions
} from './types';
import { WorkList } from './Work';
import createServeStaticWorks from './createServeStaticWorks';

export default class ExpressRouterBuilderBase implements RouterBuilder<ExpressRouterBuilderBase> {
  constructor(protected works: Array<WorkList> = [], protected prefix: PathParams | undefined = undefined) {}

  protected addWorks(works: Array<WorkList>): this {
    // eslint-disable-next-line no-restricted-syntax
    for (const w of works) {
      this.works.push(w);
    }

    return this;
  }

  all(...args: [path: PathParams, ...handlers: RequestHandler[]] | [items: RouteBuilderConfig[]]): this {
    return this.addWorks(rw.createRouteWorksForAll(...args));
  }

  get(...args: [path: PathParams, ...handlers: RequestHandler[]] | [items: RouteBuilderConfig[]]): this {
    return this.addWorks(rw.createRouteWorksForGet(...args));
  }

  post(...args: [path: PathParams, ...handlers: RequestHandler[]] | [items: RouteBuilderConfig[]]): this {
    return this.addWorks(rw.createRouteWorksForPost(...args));
  }

  put(...args: [path: PathParams, ...handlers: RequestHandler[]] | [items: RouteBuilderConfig[]]): this {
    return this.addWorks(rw.createRouteWorksForPut(...args));
  }

  delete(...args: [path: PathParams, ...handlers: RequestHandler[]] | [items: RouteBuilderConfig[]]): this {
    return this.addWorks(rw.createRouteWorksForDelete(...args));
  }

  patch(...args: [path: PathParams, ...handlers: RequestHandler[]] | [items: RouteBuilderConfig[]]): this {
    return this.addWorks(rw.createRouteWorksForPatch(...args));
  }

  options(...args: [path: PathParams, ...handlers: RequestHandler[]] | [items: RouteBuilderConfig[]]): this {
    return this.addWorks(rw.createRouteWorksForOptions(...args));
  }

  head(...args: [path: PathParams, ...handlers: RequestHandler[]] | [items: RouteBuilderConfig[]]): this {
    return this.addWorks(rw.createRouteWorksForHead(...args));
  }

  use(...args: [path?: PathParams, ...handlers: Array<RequestType | Array<RequestType>>] | [items: MiddlewareConfig[]]): this {
    return this.addWorks(createMiddlewareWorks(...args));
  }

  route(prefix: PathParams): this {
    this.prefix = prefix;
    return this;
  }

  // eslint-disable-next-line max-len
  static(...args: [path: PathParams, root: string, options?: ServeStaticOptions] | [root: string, options?: ServeStaticOptions] | [items: ServeStaticConfig[]]): this {
    return this.addWorks(createServeStaticWorks(...args));
  }
}
