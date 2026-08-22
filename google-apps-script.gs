/**
 * Nizam Khaskheli portfolio contact-form endpoint.
 *
 * 1. Create a Google Sheet.
 * 2. Open Extensions > Apps Script.
 * 3. Paste this file into Code.gs and deploy as a Web app.
 * 4. Set Execute as: Me. Who has access: Anyone.
 * 5. Copy the /exec URL into index.html where YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL appears.
 */
const SHEET_NAME = 'Website Enquiries';

function doPost(e) {
  const data = e && e.parameter ? e.parameter : {};
  if (data.website) return output_(''); // honeypot

  const sheet = getSheet_();
  sheet.appendRow([
    new Date(),
    clean_(data.name),
    clean_(data.intro),
    clean_(data.looking_for),
    clean_(data.query),
    clean_(data.source || 'Website')
  ]);

  return output_('OK');
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Brief Introduction', 'Looking For', 'Query', 'Source']);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    sheet.autoResizeColumns(1, 6);
  }
  return sheet;
}

function clean_(value) {
  return String(value || '').trim().slice(0, 5000);
}

function output_(message) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
