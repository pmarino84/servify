import { MiddlewareConfig, PathParams, RequestType } from './types';
import { MiddlewareWork, WORK_TYPE } from './Work';

export function createMiddlewareWork(path: PathParams | undefined, handlers: Array<RequestType | RequestType[]>): MiddlewareWork {
  return {
    type: WORK_TYPE.MIDDLEWARE,
    path,
    handlers
  };
}

export default function createMiddlewareWorks(
  ...args: [path?: PathParams, ...handlers: Array<RequestType | RequestType[]>] | [items: MiddlewareConfig[]]
): MiddlewareWork[] {
  let works: MiddlewareWork[] = [];

  if (args.length === 1) {
    works = [...(args[0] as MiddlewareConfig[]).map<MiddlewareWork>(({ path, handlers }) => createMiddlewareWork(path, handlers))];
  } else {
    works.push(createMiddlewareWork(args.shift() as string || undefined, args as Array<RequestType | RequestType[]>));
  }

  return works;
}
