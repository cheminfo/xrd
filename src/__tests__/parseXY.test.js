import { readFileSync } from 'fs';
import { join } from 'path';

import { parseXY } from '../parser/parseXY';

describe('parseXY', () => {
  const xy = readFileSync(
    join(__dirname, '../../data/MG1-Cu2O-28_bg_subtracted.xy'),
    'utf8',
  );

  it('check the dictionary', () => {
    const diffractogram = parseXY(xy);
    expect(diffractogram.meta.userName).toBe('Lab Manager');
    expect(diffractogram.data.x[0]).toStrictEqual(10);
    expect(diffractogram.data.y[1]).toStrictEqual(-0.0755227112146954);
    expect(diffractogram.info.origin).toBe(
      'Data converted from xy using convert-to-jcamp',
    );
  });
});
