//import JSZip from 'jszip';
//import xmlParser from 'fast-xml-parser';
import { fromJSON } from 'convert-to-jcamp';

/**
 *
 * @param {ArrayBuffer} binary
 * @param {object} [options={}]
 * @param {number} [options.maxLength=1234]
 */
export function xrdConverter() {
  // need to do stuff

  const result = {
    x: [1, 2, 3, 4],
    y: [2, 3, 4, 5],
  };

  // convert to XRD
  return fromJSON(result, { type: 'XRD' });
}
