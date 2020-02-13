import parser from 'fast-xml-parser';
import { fromJSON } from 'convert-to-jcamp';

/**
 * @param  {} file wwith the raw measurement data
 */
export function parseDiffractogram(file) {
  let json = parser.parse(file);
  const data = json['RawData'];
  let metaData = {
    startTime: data['TimeStampStarted'],
    endTime: data['TimeStampFinished'],
    measurmentPoints: data['DataRoutes']['DataRoute']['MeasurementPoints'],
    timePerStep: data['DataRoutes']['DataRoute']['TimePerStep'],
    timePerStepEffective:
      data['DataRoutes']['DataRoute']['TimePerStepEffective'],
    scanMode: data['DataRoutes']['DataRoute']['ScanMode'],
    scanModeVisibleName: data['DataRoutes']['DataRoute']['ScanModeVisibleName'],
  };
  const diffractogram = getXYDiffractogram(
    data['DataRoutes']['DataRoute']['Datum'],
  );
  return diffractogram;
}

/**
 * @param  {array} data array of strings of the measured points
 */
function getXYDiffractogram(data) {
  // ToDo: I do not know if axis1 and axis2 are generally theta and 2 theta, need to check, I hope that the format is always like this
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
    axis1: axis1,
    axis2: axis2,
    measuredTimePerStep: measuredTimePerStep,
    plannedTimePerStep: plannedTimePerStep,
    counts: counts,
  };

  return diffractogram;
}
