import { parseDiffractogram } from '../parser/parser';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('parseDiffractogram', () => {
  const data = readFileSync(join(__dirname, '../../data/RawData0.xml'), 'utf8');
  it('should return 42', () => {
    let result = parseDiffractogram(data);
    expect.anything(result);
  });
});
