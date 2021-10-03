import { RequestParamHandler } from './types';
import { ParamWork, WORK_TYPE } from './Work';

export default function createParamWork(
  ...args: [name: string | string[], handler: RequestParamHandler] | [callback: (name: string, matcher: RegExp) => RequestParamHandler]
): ParamWork {
  const work: ParamWork = {
    type: WORK_TYPE.PARAM
  };

  if (args.length === 2) {
    const [name, handler] = args;
    work.name = name;
    work.handler = handler;
  } else {
    const [callback] = args;
    work.callback = callback;
  }

  return work;
}
