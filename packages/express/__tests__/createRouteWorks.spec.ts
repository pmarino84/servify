import { createRouteWorks } from '../lib/createRouteWorks';
import { RouteWork, WORK_TYPE } from '../lib/Work';

describe('createRouteWorks', () => {
  const handler = jest.fn(() => {});
  const first = jest.fn(() => {});
  const second = jest.fn(() => {});

  it('with method, path and two handlers', () => {
    expect(createRouteWorks('get', '/', first, second)).toMatchObject<RouteWork[]>([{
      type: WORK_TYPE.ROUTE,
      method: 'get',
      path: '/',
      handlers: [first, second]
    }]);
  });

  it('with three route config', () => {
    expect(createRouteWorks([
      { method: 'get', path: '/cats', handlers: [handler] },
      { method: 'get', path: '/cats/:id', handlers: [handler] },
      { method: 'post', path: '/cats', handlers: [handler] }
    ])).toMatchObject<RouteWork[]>([
      {
        type: WORK_TYPE.ROUTE,
        method: 'get',
        path: '/cats',
        handlers: [handler]
      },
      {
        type: WORK_TYPE.ROUTE,
        method: 'get',
        path: '/cats/:id',
        handlers: [handler]
      },
      {
        type: WORK_TYPE.ROUTE,
        method: 'post',
        path: '/cats',
        handlers: [handler]
      }
    ]);
  });
});
