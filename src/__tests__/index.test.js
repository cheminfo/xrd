import { readFileSync } from 'fs';
import { join } from 'path';

import { convert } from 'jcampconverter';

import { xrdConverter } from '..';

describe('xrdConverter', () => {
  const data = readFileSync(join(__dirname, '../../data/test.brml'));
  const dataXY = readFileSync(
    join(__dirname, '../../data/MG1-Cu2O-28_bg_subtracted.xy'),
    'utf8',
  );
  it('check the output jcamp', async () => {
    const result = await xrdConverter(data, { fileType: 'brml' });
    const entry = convert(result).flatten[0];
    expect(entry).toHaveProperty('dataType');
    expect(entry.spectra[0].data.x).toHaveLength(2443);
    expect(entry.spectra[0].xUnits).toStrictEqual('2ϴ [°]');

    const resultXY = await xrdConverter(dataXY, { fileType: 'xy' });
    const entryXY = convert(resultXY).flatten[0];
    expect(entryXY).toHaveProperty('dataType');
    expect(entryXY.spectra[0].xUnits).toStrictEqual('2ϴ [°]');
  });
});
