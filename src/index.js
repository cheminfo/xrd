import JSZip from 'jszip';
import { fromJSON } from 'convert-to-jcamp';
import { parseDiffractogram } from './parser/parser';

/**
 * @param {ArrayBuffer} binary data readed of zipf ile
 * @param {object} [options={}]
 */
export function xrdConverter(binary, options = {}) {
  // unzip
  var zip = new JSZip();

  zip.loadAsync(binary, { base64: true, checkCRC32: true }).then(
    async (zipFiles) => {
      let diffractogram = readDiffractogram(zipFiles);
      console.log(diffractogram);
    },
    function(e) {
      alert('not a valid zip file'); // ToDo: change to proper error handling
    },
  );

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
/**
 * Extract the x,y pattern
 * @param  {JSZip} zipfiles
 * @param  {} options={}
 */
function readDiffractogram(zipFiles, options = {}) {
  let result = [];
  for (let file in zipFiles.files) {
    if (file.endsWith('RawData0.xml')) {
      // ToDo: RawData0 makes it seem as there could be multiple raw data files, investigate this
      console.log(file);
      result.push(file);
    }
  }
  return result;
}
