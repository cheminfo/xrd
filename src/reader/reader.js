import JSZip from 'jszip';
import { parseDiffractogram } from '../parser/parser';
import { readFileSync } from 'fs';

/**
 * @param  {} binary
 * @param  {} options={}
 */
export async function readBRML(binary, options = {}) {
  var zip = new JSZip();
  const diffractogram = await zip
    .loadAsync(binary, { base64: true, checkCRC32: true })
    .then(
      async (zipFiles) => {
        // ToDo: process other files
        let diffractogram = await readDiffractogram(zipFiles);
        return diffractogram;
      },
      function(e) {
        alert('not a valid zip file'); // ToDo: change to proper error handling
      },
    );
  return diffractogram;
}

/**
 * Extract the x,y pattern
 * @param  {JSZip} zipfiles
 * @param  {} options={}
 */
async function readDiffractogram(zipFiles, options = {}) {
  let result;
  for (let file in zipFiles.files) {
    if (file.endsWith('RawData0.xml')) {
      // ToDo: RawData0 makes it seem as there could be multiple raw data files, investigate this
      result = await zipFiles
        .file(file)
        .async('text')
        .then(function(txt) {
          return parseDiffractogram(txt);
        });
    }
  }
  return result;
}
