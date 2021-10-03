import createMiddlewareWorks from '../lib/createMiddlewareWorks';
import { MiddlewareWork, WORK_TYPE } from '../lib/Work';

describe('createMiddlewareWorks', () => {
  const handler = jest.fn(() => {});
  const first = jest.fn(() => {});
  const second = jest.fn(() => {});

  it('with path and handlers', () => {
    expect(createMiddlewareWorks('/all-in', first, second)).toMatchObject<MiddlewareWork[]>([{
      type: WORK_TYPE.MIDDLEWARE,
      path: '/all-in',
      handlers: [first, second]
    }]);
  });

  it('only handlers (path = undefined)', () => {
    expect(createMiddlewareWorks(undefined, first, [handler], second)).toMatchObject<MiddlewareWork[]>([{
      type: WORK_TYPE.MIDDLEWARE,
      path: undefined,
      handlers: [first, [handler], second]
    }]);
  });

  it('with two middleware config', () => {
    expect(createMiddlewareWorks([
      { path: '*', handlers: [first, [handler], second] },
      { path: '/all-in', handlers: [handler] }
    ])).toMatchObject<MiddlewareWork[]>([
      {
        type: WORK_TYPE.MIDDLEWARE,
        path: '*',
        handlers: [first, [handler], second]
      },
      {
        type: WORK_TYPE.MIDDLEWARE,
        path: '/all-in',
        handlers: [handler]
      }
    ]);
  });
});
