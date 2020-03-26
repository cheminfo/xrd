import { parseDiffractogram } from '../parser/parser';
import { readFileSync } from 'fs';
import { join } from 'path';

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
  });
});
