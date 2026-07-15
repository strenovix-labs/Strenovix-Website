/**
 * Strenovix contact-form → Google Sheets bridge.
 *
 * Setup:
 * 1. Open the spreadsheet: https://docs.google.com/spreadsheets/d/1zPLuUNqd2R1raeWrgHBkFpVqxx6R5UAGPm_SOQf3zMQ/edit
 * 2. Extensions -> Apps Script
 * 3. Delete the boilerplate code and paste this whole file in.
 * 4. Deploy -> New deployment -> type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the requested permissions, then copy the
 *    Web app URL (ends in /exec).
 * 6. Paste that URL into SHEET_WEBHOOK_URL in
 *    src/components/ContactSection.jsx, replacing the placeholder.
 *
 * Every submission appends a row: timestamp, name, email, phone, project details.
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted At', 'Name', 'Email', 'Phone', 'Project Details']);
  }

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.projectDetails || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
