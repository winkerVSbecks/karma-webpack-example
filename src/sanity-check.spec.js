import { add, subtract } from './index.js';

describe('The test toolchain', () => {
  it('should add', () => {
    expect( add(1, 1) ).toBe(2);
  });

  it('should subtract', () => {
    expect( subtract(2, 1) ).toBe(1);
  });
});
