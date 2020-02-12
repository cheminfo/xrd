import JSZip from 'jszip';
import xmlParser from 'fast-xml-parser';
import { fromJSON } from 'convert-to-jcamp';

/**
 *
 * @param {ArrayBuffer} binary
 * @param {object} [options={}]
 * @param {number} [options.maxLength=1234]
 */
export function xrdConverter(binary, options = {}) {
  console.log(binary);

  // need to do stuff

  const result = {
    x: [1, 2, 3, 4],
    y: [2, 3, 4, 5],
  };
  const jcamp = fromJSON(result, { type: 'XRD' });

  console.log(jcamp);
  return 42;
}
