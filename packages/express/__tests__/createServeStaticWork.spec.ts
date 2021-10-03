import { createServeStaticWork } from '../lib/createServeStaticWorks';
import { StaticWork, WORK_TYPE } from '../lib/Work';

describe('createServeStaticWork', () => {
  it('with path and root', () => {
    expect(createServeStaticWork('/static', 'public')).toMatchObject<StaticWork>({
      type: WORK_TYPE.STATIC,
      path: '/static',
      root: 'public',
      options: {}
    });
  });

  it('only root, path undefined', () => {
    expect(createServeStaticWork(undefined, 'public')).toMatchObject<StaticWork>({
      type: WORK_TYPE.STATIC,
      path: undefined,
      root: 'public',
      options: {}
    });
  });

  it('with all arguments', () => {
    expect(createServeStaticWork('/static', 'public', { etag: false })).toMatchObject<StaticWork>({
      type: WORK_TYPE.STATIC,
      path: '/static',
      root: 'public',
      options: { etag: false }
    });
  });
});
