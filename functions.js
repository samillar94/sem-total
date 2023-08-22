
/**
 * 
 * @param {object} query 
 * @returns extractedData = { attendances, unit }
 */
function extractData(query) {

  let extractedData = {};

  query.forEach(param => {
    let att = query['attendance_'+id];
    extractedData.data[query['item_'+id]] = att;
    extractedData.total+=parseInt(att);
  });

return extractedData };

/**
 * 
 * @param {object} extractedData 
 * @returns processedData = { lines, total }
 */
function processData(extractedData) {

  let processedData = {};
  processedData.lines = [];
  processedData.total = 0;

  extractedData.attendances.forEach(attendance => {
    processedData.total += attendance;
  });

  processedData.lines.push(`Total of ${processedData.total} ${extractedData.unit} attended`);

return processedData };

module.exports = {
	extractData, processData
};