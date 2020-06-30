import { parseXY } from '../parser/parseXY';

export function readXY(file, options = {}) {
  const diffractogram = parseXY(file, options);
  return diffractogram;
}
