import { createMiddlewareWork } from '../lib/createMiddlewareWorks';
import { MiddlewareWork, WORK_TYPE } from '../lib/Work';

test('createMiddlewareWork', () => {
  const handler = jest.fn(() => { });
  expect(createMiddlewareWork('/cats', [handler])).toMatchObject<MiddlewareWork>({
    type: WORK_TYPE.MIDDLEWARE,
    path: '/cats',
    handlers: [handler]
  });
});
