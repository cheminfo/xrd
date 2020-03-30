import { readFileSync } from 'fs';
import { join } from 'path';

import { parseDiffractogram } from '../parser/parser';

describe('parseDiffractogram', () => {
  const data = readFileSync(join(__dirname, '../../data/RawData0.xml'), 'utf8');
  it('check the dictionary', () => {
    let result = parseDiffractogram(data);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('metadata');
    expect(result.data).toHaveProperty('x');
    expect(result.data).toHaveProperty('y');
    expect(result.metadata).toHaveProperty('info');
    expect(result.metadata).toHaveProperty('xUnit');
    expect(result.metadata).toHaveProperty('yUnit');
    expect(result.metadata).toHaveProperty('type');
    expect(result.metadata).toHaveProperty('origin');
    expect(result.metadata.info).toHaveProperty('userName');
    expect(result.metadata.info).toHaveProperty('axes');
    expect(result.metadata.info.axes).toHaveLength(2);
    expect(result.data.x).toHaveLength(3714);
    expect(result.data.y).toHaveLength(3714);
    expect(result.data.x.slice(0, 3)).toStrictEqual([2, 2.0102, 2.0205]);
    expect(result.data.y.slice(0, 3)).toStrictEqual([1080, 1024, 1009]);
    expect(result.data.x[3714 - 1]).toStrictEqual(40.0099);
    expect(result.data.y[3714 - 1]).toStrictEqual(472);
  });
});
