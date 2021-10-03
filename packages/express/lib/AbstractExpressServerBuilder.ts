import { Express } from 'express';
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import {
  json, OptionsJson, raw, Options, text, OptionsText, urlencoded, OptionsUrlencoded
} from 'body-parser';
import { Server, ServerOptions } from 'http';
import noop from 'lodash/noop';
import createExpressApp from './createExpressApp';
import { createMiddlewareWork } from './createMiddlewareWorks';
import ExpressServer from './ExpressServer';
import { BodyParserOptions, RequestParamHandler } from './types';
import ExpressRouterBuilderBase from './ExpressRouterBuilderBase';
import createSettingsWork from './createSettingsWork';
import createEngineWork from './createEngineWork';
import createParamWork from './createParamWork';

export default abstract class AbstractExpressServerBuilder<T extends Server, SO extends ServerOptions> extends ExpressRouterBuilderBase {
  constructor(protected serverOptions: SO) {
    super();
  }

  cors(options?: CorsOptions | CorsOptionsDelegate | undefined): this {
    return this.addWorks([createMiddlewareWork(undefined, [cors(options)])]);
  }

  bodyParser(options: BodyParserOptions): this {
    let handler = null;
    if (options.json) {
      handler = json(options.json);
    } else if (options.raw) {
      handler = raw(options.raw);
    } else if (options.text) {
      handler = text(options.text);
    } else if (options.urlencoded) {
      handler = urlencoded(options.urlencoded);
    }

    if (handler) {
      this.addWorks([createMiddlewareWork(undefined, [handler])]);
    }

    return this;
  }

  json(options: OptionsJson = {}): this {
    return this.bodyParser({ json: options });
  }

  raw(options: Options = {}): this {
    return this.bodyParser({ raw: options });
  }

  text(options: OptionsText = {}): this {
    return this.bodyParser({ text: options });
  }

  urlencoded(options: OptionsUrlencoded = {}): this {
    return this.bodyParser({ urlencoded: options });
  }

  build(): ExpressServer<T> {
    return new ExpressServer<T>(createExpressApp(this.works), this.serverFactory.bind(this));
  }

  /**
   * build and listen automatically
   * @param {number} port
   * @param {() => void} listeningListener
   * @returns {ExpressServer} ExpressServer instance
   */
  listen(port = 8080, listeningListener = noop): ExpressServer<T> {
    return this.build().listen(port, listeningListener);
  }

  /**
   * Create the server instance with the express app passed as request handler
   * @param {Express} app Express app instance
   * @returns {Server} Node.js Server instance
   */
  abstract serverFactory(app: Express): T;

  enable(name: string): this {
    return this.addWorks([createSettingsWork('enable', { name })]);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  engine(ext: string, fn: (path: string, options: object, callback: (e: any, rendered?: string) => void) => void): this {
    return this.addWorks([createEngineWork(ext, fn)]);
  }

  disable(name: string): this {
    return this.addWorks([createSettingsWork('disable', { name })]);
  }

  set<V>(name: string, value: V): this {
    return this.addWorks([createSettingsWork('set', { name, value })]);
  }

  param(...args: [name: string | string[], handler: RequestParamHandler] | [callback: (name: string, matcher: RegExp) => RequestParamHandler]): this {
    return this.addWorks([createParamWork(...args)]);
  }
}
