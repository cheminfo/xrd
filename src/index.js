import { fromJSON } from 'convert-to-jcamp';
import { readBRML } from './reader/reader';

/**
 * @param {ArrayBuffer} binary data readed of zipf ile
 * @param {object} [options={}]
 */
export async function xrdConverter(binary, options = {}) {
  const result = await readBRML(binary, options);

  // write to jcamp
  const jcamp = fromJSON(result.data, result.metadata);
  console.log(jcamp);

  return 42;
}
