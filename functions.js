
/**
 * 
 * @param {object} query 
 * @returns extractedData = { {array} attendances, {array} availabilities, {str} unit }
 */
function extractData(query) {

  let extractedData = {
    attendances: [],
    availabilities: []
  };

  const count = Object.entries(query).length;

  let hasNext = true;

  let att = query['attendance_1'];
  let av = query['availability_1'];
  let u = query['unit_1'];

  if (typeof att == undefined || typeof att == undefined || typeof att == undefined) {
    throw new Error("Component attribute missing");
  };

  for (nextID = 2; nextID <= count.length/3 + 1, hasNext == true; nextID++) {
    
    console.log(nextID);
    let attFloat = parseFloat(att);
    let avFloat = parseFloat(av);

    if (attFloat == NaN) throw new Error("Non-numerical/blank attendance");
    if (avFloat == NaN) throw new Error("Non-numerical/blank availability");

    if (attFloat < 0) throw new Error("Negative attendance");
    if (avFloat < 0) throw new Error("Negative availability");

    if (attFloat > avFloat) throw new Error("Attendance larger than available");

    extractedData.attendances.push(attFloat);
    extractedData.availabilities.push(avFloat);

    att = query['attendance_'+nextID];
    av = query['availability_'+nextID];
    uNext = query['unit_'+nextID];

    if (typeof att == undefined && typeof av == undefined && typeof uNext == undefined) {
      hasNext = false;
    } else if (typeof att == undefined || typeof av == undefined || typeof uNext == undefined) {
      throw new Error("Inconsistent counts of component attributes");
    } else if (uNext != u) {
      throw new Error("Inconsistent units");
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
function processData(extractedData) {

  let processedData = {};
  processedData.lines = [];
  processedData.total = 0;
  processedData.totalAvailable = 0;

  extractedData.attendances.forEach(attendance => {
    processedData.total += attendance;
  });

  extractedData.availabilities.forEach(availability => {
    processedData.totalAvailable += availability;
  });

  processedData.lines.push(`Total of ${processedData.total} ${extractedData.unit} attended, of ${processedData.totalAvailable} available`);

return processedData };

module.exports = {
	extractData, processData
};