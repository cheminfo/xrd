import { readFileSync } from 'fs';
import { join } from 'path';

import { convert } from 'jcampconverter';

import { xrdConverter } from '..';

describe('xrdConverter', () => {
  const binary = readFileSync(join(__dirname, '../../data/test.brml'));

  it('should return 42', () => {
    let jcamp = xrdConverter(binary);
    let parsed = convert(jcamp, { xy: true });

    let data = parsed.spectra[0].data[0];

    expect(data).toStrictEqual({ x: [1, 2, 3, 4], y: [2, 3, 4, 5] });
  });
});
