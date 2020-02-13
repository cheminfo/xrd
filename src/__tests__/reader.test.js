import { readBRML } from '../reader/reader';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('readBRML', () => {
  const data = readFileSync(join(__dirname, '../../data/test.brml'));

  it('should return 42', () => {
    let result = readBRML(data);
    expect.anything(result);
  });
});
