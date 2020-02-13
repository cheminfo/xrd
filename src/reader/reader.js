import JSZip from 'jszip';
import { parseDiffractogram } from '../parser/parser';
import { readFileSync } from 'fs';

/**
 * @param  {} binary
 * @param  {} options={}
 */
export async function readBRML(binary, options = {}) {
  var zip = new JSZip();
  return zip.loadAsync(binary, { base64: true, checkCRC32: true }).then(
    async (zipFiles) => {
      let diffractogram = await readDiffractogram(zipFiles);
      return diffractogram;
    },
    function(e) {
      alert('not a valid zip file'); // ToDo: change to proper error handling
    },
  );
}

/**
 * Extract the x,y pattern
 * @param  {JSZip} zipfiles
 * @param  {} options={}
 */
async function readDiffractogram(zipFiles, options = {}) {
  for (let file in zipFiles.files) {
    if (file.endsWith('RawData0.xml')) {
      // ToDo: RawData0 makes it seem as there could be multiple rawa data files, investigate this
      const diffractogram = parseDiffractogram(
        zipFiles.file(file).async('string'),
      );
    }
  }
  return diffractogram;
}
