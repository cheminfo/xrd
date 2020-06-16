import { readFileSync } from 'fs';
import { join } from 'path';

import { convert } from 'jcampconverter';

import { xrdConverter } from '..';

describe('xrdConverter', () => {
  const data = readFileSync(join(__dirname, '../../data/test.brml'));

  it('check the output jcamp', async () => {
    const result = await xrdConverter(data);
    const entry = convert(result).flatten[0];
    expect(entry).toHaveProperty('dataType');
    expect(entry.spectra[0].data.x).toHaveLength(2443);
    expect(entry.spectra[0].xUnits).toStrictEqual('2ϴ [°]');
  });
});
