

/**
 * Takes a JS Date object and turns it into a string of the type 'YYYY-MM-DD', which is what Apex is expecting.
 * @param {Date} date The date to be stringified
 * @returns {string}
 */
function toApexDate(/*Date*/ date) {
  if (date == null) {
    return null
  }
  // Get the ISO formatted date string.
  // This will be formatted: YYYY-MM-DDTHH:mm:ss.sssZ
  var dateIso = date.toISOString()

  // Replace everything after the T with an empty string
  return dateIso.replace(new RegExp('[Tt].*'), "")
}
