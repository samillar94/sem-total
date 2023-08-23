
/**
 * 
 * @param {object} query 
 * @returns extractedData = { {array} attendances, {array} availabilities, {str} unit }
 */
function extractData(query) {

  let extractedData = {
    attendances: [],
    availabilities: [],
    unit: ""
  };

  const count = Object.entries(query).length;
  // console.log(count/3 + 1);

  let hasNext = true;

  let att = query['attendance_1'];
  let av = query['availability_1'];
  let u = query['unit_1'];

  if (typeof att === "undefined" || typeof av === "undefined" || typeof u === "undefined") {
    throw new Error("Component attribute missing");
  };

  for (let nextID = 2; (nextID <= count/3 + 1 && hasNext == true); nextID++) {
    
    // console.log(nextID-1);
    let attFloat = parseFloat(att);
    let avFloat = parseFloat(av);

    if (attFloat == NaN) throw new Error("Non-numerical/blank attendance");
    if (avFloat == NaN) throw new Error("Non-numerical/blank availability");

    if (attFloat < 0) throw new Error("Negative attendance");
    if (avFloat < 0) throw new Error("Negative availability");

    if (attFloat > avFloat) throw new Error("Attendance larger than available");

    extractedData.attendances.push(attFloat);
    extractedData.availabilities.push(avFloat);

    att = query[`attendance_${nextID}`];
    av = query[`availability_${nextID}`];
    uNext = query[`unit_${nextID}`];

    if (typeof att === "undefined" && typeof av === "undefined" && typeof uNext === "undefined") {
      hasNext = false;
    } else if (typeof att === "undefined" || typeof av === "undefined" || typeof uNext === "undefined") {
      hasNext = false;
      throw new Error(`Inconsistent counts of component attributes. Next attendance ${att}, next availability ${av}, next unit ${uNext}`);
    } else if (uNext != u) {
      hasNext = false;
      throw new Error(`Inconsistent units ${nextID-1}:"${u}" and ${nextID}:"${uNext}"`);
    } else {
      u = uNext;
    };

  };

  extractedData.unit = u;

return extractedData };

/**
 * 
 * @param {object} extractedData = { {array} attendances, {array} availabilities, {str} unit}
 * @returns processedData = { {array} lines, {float} total }
 */
function buildResponse(extractedData) {

  let resToFront = {
    error: false,
    data: {},
    lines: []
  };
  
  resToFront.data.total = 0;
  resToFront.data.totalAvailable = 0;

  extractedData.attendances.forEach(attendance => {
    resToFront.data.total += attendance;
  });

  extractedData.availabilities.forEach(availability => {
    resToFront.data.totalAvailable += availability;
  });

  resToFront.lines.push(`Total of ${resToFront.data.total} ${extractedData.unit} attended, of ${resToFront.data.totalAvailable} available`);

return resToFront };

module.exports = {
	extractData, buildResponse
};