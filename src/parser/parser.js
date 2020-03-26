import parser from 'fast-xml-parser';

/**
 * @param  {} file with the raw measurement data
 */
export function parseDiffractogram(file) {
  let json = parser.parse(file, {
    ignoreAttributes: false,
    attributeNamePrefix: '__',
  });
  const data = json.RawData;

  let axes = [];
  data.DataRoutes.DataRoute.ScanInformation.ScanAxes.ScanAxisInfo.forEach(
    (element) => {
      axes.push({
        id: element.__AxisId,
        name: element.__AxisName,
        unitBase: element.Unit.__Base,
        unitPrefix: element.Unit.__Prefix,
        reference: element.reference,
        start: element.start,
        stop: element.stop,
        increment: element.increment,
      });
    },
  );

  let adddata = {
    startTime: data.TimeStampStarted,
    endTime: data.TimeStampFinished,
    measurmentPoints:
      data.DataRoutes.DataRoute.ScanInformation.MeasurementPoints,
    timePerStep: data.DataRoutes.DataRoute.ScanInformation.TimePerStep,
    timePerStepEffective:
      data.DataRoutes.DataRoute.ScanInformation.TimePerStepEffective,
    scanMode: data.DataRoutes.DataRoute.ScanInformation.ScanMode,
    scanModeVisibleName:
      data.DataRoutes.DataRoute.ScanInformation.ScanModeVisibleName,
    userName: data.Identifier.__UserName,
    machineName: data.Identifier.__MachineName,
    guid: data.Identifier.Guid,
    axes: axes,
    goniometerType: data.FixedInformation.Instrument.GoniometerType,
  };

  const diffractogram = getXYDiffractogram(data.DataRoutes.DataRoute.Datum);

  const info = { ...adddata, ...diffractogram.metadata.info };
  diffractogram.metadata.info = info;
  diffractogram.metadata.xUnit = `${adddata.axes[0].name} / ${adddata.axes[0].unitBase}`;

  return diffractogram;
}

/**
 * @param  {array} data array of strings of the measured points
 */
function getXYDiffractogram(data) {
  let axis1 = [];
  let axis2 = [];
  let measuredTimePerStep = [];
  let plannedTimePerStep = [];
  let counts = [];

  data.forEach((element) => {
    const factors = element.split(',');
    measuredTimePerStep.push(parseFloat(factors[0]));
    plannedTimePerStep.push(parseFloat(factors[1]));
    axis1.push(parseFloat(factors[2]));
    axis2.push(parseFloat(factors[3]));
    counts.push(parseFloat(factors[4]));
  });

  const diffractogram = {
    data: { x: axis1, y: counts },
    metadata: {
      xUnit: '2 theta',
      yUnit: 'counts',
      type: 'XRD pattern',
      origin: 'Data converted from BRML using convert-to-jcamp',
      info: {
        axis2: axis2,
        measuredTimePerStep: measuredTimePerStep,
        plannedTimePerStep: plannedTimePerStep,
      },
    },
  };

  return diffractogram;
}
