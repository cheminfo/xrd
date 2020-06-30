function trimReplace(s) {
  let tmp = s.split(':');
  return tmp[1].replace('"', '').replace("'", '').trim();
}
// eslint-disable-next-line no-unused-vars
export function parseXY(file, options = {}) {
  let lines = file.split('\n');
  const header = lines[0];
  lines.splice(0, 1); // header line
  lines.splice(-1, 1); // last empty line
  let data = {
    x: [],
    y: [],
  };
  for (const line of lines) {
    let tmp = line.split(/\s+/);
    data.x.push(parseFloat(tmp[0].trim()));
    data.y.push(parseFloat(tmp[1].trim()));
  }
  let headerlines = header.split('" ');

  // try to make metadata consistent with Bruker
  let meta = {};
  meta.id = trimReplace(headerlines[0]);
  meta.comment = trimReplace(headerlines[1]);
  meta.userName = trimReplace(headerlines[2]);
  meta.anode = trimReplace(headerlines[3]);
  meta.scanType = trimReplace(headerlines[4]);
  // eslint-disable-next-line radix
  meta.timePerStep = parseInt(trimReplace(headerlines[5]));

  const diffractogram = {
    data: { x: data.x, y: data.y },
    info: {
      xUnits: '2ϴ [°]',
      yUnits: 'counts',
      dataType: 'XRD pattern',
      origin: 'Data converted from xy using convert-to-jcamp',
    },
    meta: meta,
  };

  return diffractogram;
}
