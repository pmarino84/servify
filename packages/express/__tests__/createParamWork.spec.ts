import createParamWork from '../lib/createParamWork';
import { ParamWork, WORK_TYPE } from '../lib/Work';

test('createParamWork with name and handler', () => {
  const handler = jest.fn(() => {});
  expect(createParamWork('id', handler)).toMatchObject<ParamWork>({
    type: WORK_TYPE.PARAM,
    name: 'id',
    handler
  });
});

test('createParamWork with names and handler', () => {
  const handler = jest.fn(() => {});
  expect(createParamWork(['id', 'ciccio'], handler)).toMatchObject<ParamWork>({
    type: WORK_TYPE.PARAM,
    name: ['id', 'ciccio'],
    handler
  });
});

test('createParamWork with callback', () => {
  const handler = jest.fn(() => {});
  const callback = jest.fn(() => handler);
  expect(createParamWork(callback)).toMatchObject<ParamWork>({
    type: WORK_TYPE.PARAM,
    callback
  });
});
