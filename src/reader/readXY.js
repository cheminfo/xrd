import { parseXY } from '../parser/parseXY';

export function readXY(file) {
  const diffractogram = parseXY(file);
  return diffractogram;
}
