import { createRouteWork } from '../lib/createRouteWorks';
import { RouteWork, WORK_TYPE } from '../lib/Work';

test('createRouteWork', () => {
  const handler = jest.fn(() => { });
  expect(createRouteWork('get', '/', [handler])).toMatchObject<RouteWork>({
    type: WORK_TYPE.ROUTE,
    method: 'get',
    path: '/',
    handlers: [handler]
  });
});
