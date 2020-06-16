import { fromJSON } from 'convert-to-jcamp';

import { readBRML } from './reader/reader';

/**
 * @param {ArrayBuffer} binary data readed of zipf ile
 * @param {object} [options={}]
 */
async function xrdConverter(binary, options = {}) {
  const result = await readBRML(binary, options);
  // write to jcamp
  const jcamp = fromJSON(result.data, { meta: result.meta, info: result.info });

  return jcamp;
}

export { xrdConverter, readBRML };
