import { hello } from '../src';

describe('This is a simple test', () => {
  test('Check the hello function', () => {
    expect(hello()).toEqual('Hello World');
  });
});
