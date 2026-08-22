# Contact form → Google Sheets setup

The final site includes a black, responsive contact form. The previous Send an Enquiry header button has been removed. The form is ready to register submissions in your own Google Sheet once the included Apps Script endpoint is deployed.

## Setup

1. Create a new Google Sheet.
2. Open **Extensions → Apps Script**.
3. Replace the default code with `google-apps-script.gs`.
4. Save the project.
5. Choose **Deploy → New deployment → Web app**.
6. Set **Execute as** to your Google account.
7. Set **Who has access** to **Anyone**.
8. Deploy and copy the Web app URL ending in `/exec`.
9. Open `index.html` and replace:

   `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL`

   with your `/exec` URL.
10. Re-upload the site.

After the connection is deployed, open the Google Sheet you created. The submissions will appear in a tab named `Website Enquiries` (the script creates it automatically) with these columns:

- Timestamp
- Name
- Brief Introduction
- Looking For
- Query
- Source

The website form uses a hidden honeypot field to reduce simple automated spam. The browser shows the confirmation message immediately after submission: **“We have got your back. Hold on a little while — your message is on its way.”**

The Google Sheet remains in your Google account; the website package does not contain credentials or private sheet access.
