import { xrdConverter } from '..';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';

describe('xrdConverter', () => {
  const data = readFileSync(join(__dirname, '../../data/test.brml'));

  it('should return 42', async () => {
    let result = await xrdConverter(data);
    expect(result).toStrictEqual(42);
  });
});
