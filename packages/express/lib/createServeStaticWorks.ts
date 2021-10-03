import { PathParams, ServeStaticConfig, ServeStaticOptions } from './types';
import { StaticWork, WORK_TYPE } from './Work';

export function createServeStaticWork(path: PathParams | undefined, root: string, options?: ServeStaticOptions): StaticWork {
  return {
    type: WORK_TYPE.STATIC,
    path,
    root,
    options: options || {}
  };
}

export default function createServeStaticWorks(
  // eslint-disable-next-line max-len
  ...args: [path: PathParams, root: string, options?: ServeStaticOptions] | [root: string, options?: ServeStaticOptions] | [items: ServeStaticConfig[]]
): StaticWork[] {
  let works: StaticWork[] = [];

  if (args.length === 1) {
    // only root or items case
    const arg = args[0];
    if (Array.isArray(arg)) {
      // only items case
      works = [...arg.map<StaticWork>(({ path, root, options }) => createServeStaticWork(path, root, options))];
    } else {
      // only root case
      works.push(createServeStaticWork(undefined, arg));
    }
  } else {
    // root [, options] or path, root [options] case
    const [first, second, third] = args;
    if (typeof second === 'string') {
      // path, root [, options] case
      works.push(createServeStaticWork(first, second, third));
    } else {
      // root [, options] case
      works.push(createServeStaticWork(undefined, first as string, second));
    }
  }

  return works;
}
