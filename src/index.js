import { fromJSON } from 'convert-to-jcamp';

import { readBRML } from './parser/parseBRML';
import { parseXY } from './parser/parseXY';

/**
 * @param {file} binary
 * @param {string} filetype
 * @param {object} [options={}]
 */
async function xrdConverter(binary, options) {
  const fileType = options.fileType;
  let result;
  switch (fileType.toLowerCase()) {
    case 'brml':
      result = await readBRML(binary);
      break;
    case 'xy':
      result = parseXY(binary);
      break;
    default:
      throw new Error('Filetype is required');
  }
  const jcamp = fromJSON(result.data, {
    meta: result.meta,
    info: result.info,
  });
  return jcamp;
}

export { xrdConverter, readBRML, parseXY };
