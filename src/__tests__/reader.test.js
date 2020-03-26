import { readBRML } from '../reader/reader';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('readBRML', () => {
  const data = readFileSync(join(__dirname, '../../data/test.brml'));

  it('should return 42', async () => {
    let result = await readBRML(data);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('metadata');
    expect(result.data).toHaveProperty('x');
    expect(result.data).toHaveProperty('y');
    expect(result.metadata).toHaveProperty('info');
    expect(result.metadata).toHaveProperty('xUnit');
    expect(result.metadata).toHaveProperty('yUnit');
    expect(result.metadata).toHaveProperty('type');
    expect(result.metadata).toHaveProperty('origin');
    expect(result.data.x).toHaveLength(2443);
    expect(result.data.y).toHaveLength(2443);
  });
});
