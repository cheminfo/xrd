import JSZip from 'jszip';
import { parseDiffractogram } from '../parser/parser';

/**
 * @param  {} binary
 * @param  {} options={}
 */
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
