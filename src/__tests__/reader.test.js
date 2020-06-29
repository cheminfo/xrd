import { readFileSync } from 'fs';
import { join } from 'path';

import { readBRML } from '../reader/reader';

describe('readBRML', () => {
  const data = readFileSync(join(__dirname, '../../data/test.brml'));

  it('check the output dictionary', async () => {
    let result = await readBRML(data);
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('x');
    expect(result.data).toHaveProperty('y');
    expect(result.info.xUnits).toBe('2ϴ [°]');
    expect(result.info.yUnits).toBe('counts');
    expect(result.info.dataType).toBe('XRD pattern');
    expect(result.info.origin).toBe(
      'Data converted from BRML using convert-to-jcamp',
    );
    expect(Object.keys(result.meta)).toHaveLength(15);
    expect(result.data.x).toHaveLength(2443);
    expect(result.data.y).toHaveLength(2443);
  });
});
