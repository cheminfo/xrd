import JSZip from 'jszip';
import { parseDiffractogram } from '../parser/parser';

/**
 * @param  {} binary
 * @param  {} options={}
 */
// eslint-disable-next-line no-unused-vars
export function readBRML(binary, options = {}) {
  let zip = new JSZip();
  const diffractogram = zip
    .loadAsync(binary)
    .then(function(zipFiles) {
      return zipFiles.file('Experiment0/RawData0.xml').async('text');
    })
    .then((txt) => {
      return parseDiffractogram(txt);
    });
  return diffractogram;
}
