import { xrdConverter } from '..';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('xrdConverter', () => {
  const data = readFileSync(join(__dirname, '../../data/test.brml'));

  it('should return 42', () => {
    let result = xrdConverter(data);
    expect(result).toStrictEqual(42);
  });
});
