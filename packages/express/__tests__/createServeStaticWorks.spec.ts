import createServeStaticWorks from '../lib/createServeStaticWorks';
import { StaticWork, WORK_TYPE } from '../lib/Work';

describe('createServeStaticWorks', () => {
  it('with path and root', () => {
    expect(createServeStaticWorks('static', 'public')).toMatchObject<StaticWork[]>([
      {
        type: WORK_TYPE.STATIC,
        path: 'static',
        root: 'public',
        options: {}
      }
    ]);
  });

  it('only root', () => {
    expect(createServeStaticWorks('public')).toMatchObject<StaticWork[]>([
      {
        type: WORK_TYPE.STATIC,
        path: undefined,
        root: 'public',
        options: {}
      }
    ]);
  });
});
