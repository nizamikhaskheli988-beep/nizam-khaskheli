/**
 * Nizam Khaskheli website enquiry endpoint.
 *
 * This version writes directly to the Google Sheet supplied for the website:
 * https://docs.google.com/spreadsheets/d/1qn9Ma5BAK5szO2YBs4HPVz0OKvmoGd0J/edit
 *
 * Deploy this file from Google Apps Script as a Web app:
 * Execute as: Me
 * Who has access: Anyone
 *
 * The website posts these fields:
 * name, intro, looking_for, query, source, website (honeypot)
 */

const SPREADSHEET_ID = '1qn9Ma5BAK5szO2YBs4HPVz0OKvmoGd0J';

function doGet() {
  return ContentService
    .createTextOutput('Nizam Khaskheli website enquiry endpoint is active.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const data = (e && e.parameter) ? e.parameter : {};

  // Simple anti-spam honeypot. Real visitors leave this empty.
  if (clean_(data.website)) {
    return json_({ ok: true });
  }

  const sheet = getSheet_();
  sheet.appendRow([
    new Date(),
    clean_(data.name),
    clean_(data.intro),
    clean_(data.looking_for),
    clean_(data.query)
  ]);

  return json_({ ok: true, message: 'Received' });
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  // Use the existing first sheet so submissions land in the sheet you already use.
  const sheet = ss.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Full Name',
      'Brief Introduction',
      "What They're Looking For",
      'Query'
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }

  return sheet;
}

function clean_(value) {
  return String(value || '').trim().slice(0, 5000);
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
