import { fromJSON } from 'convert-to-jcamp';
import { readBRML } from './reader/reader';

/**
 * @param {ArrayBuffer} binary data readed of zipf ile
 * @param {object} [options={}]
 */
export function xrdConverter(binary, options = {}) {
  // unzip
  const diffractogram = readBRML(binary);
  // read xmls

  const result = {
    x: [1, 2, 3, 4],
    y: [2, 3, 4, 5],
  };

  // write to jcamp
  const jcamp = fromJSON(result, { type: 'XRD' });

  console.log(jcamp);
  return 42;
}
