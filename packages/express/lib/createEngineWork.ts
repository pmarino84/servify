import { EngineWork, WORK_TYPE } from './Work';

export default function createEngineWork(
  ext: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: (path: string, options: object, callback: (e: any, rendered?: string) => void) => void
): EngineWork {
  return {
    type: WORK_TYPE.ENGINE,
    ext,
    fn
  };
}
