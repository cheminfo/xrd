import { readFileSync } from 'fs';
import { join } from 'path';

import { convert } from 'jcampconverter';

import { xrdConverter } from '..';

describe('xrdConverter', () => {
  const data = readFileSync(join(__dirname, '../../data/test.brml'));
  it('check the output jcamp', async () => {
    const result = await xrdConverter(data);
    const spectrum = convert(result).spectra[0];
    expect(spectrum).toHaveProperty('dataType');
    expect(spectrum.data[0]).toHaveLength(spectrum.nbPoints * 2);
    expect(spectrum.xUnit).toStrictEqual('TwoTheta / Degree');
  });
});
