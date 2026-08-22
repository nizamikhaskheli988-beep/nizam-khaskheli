# Contact form → Google Sheets setup

The final site includes a black, responsive contact form. To make submissions register in your own Google Sheet, connect the included `google-apps-script.gs` endpoint once.

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

The sheet automatically creates a `Website Enquiries` tab with these columns:

- Timestamp
- Name
- Brief Introduction
- Looking For
- Query
- Source

The website form uses a hidden honeypot field to reduce simple automated spam. The browser shows the confirmation message immediately after submission: **“We have got your back. Hold on a little while — your message is on its way.”**

### Where do I see submitted enquiries?

The website itself does **not** store the submissions. After you complete the setup above, the data appears in the Google Sheet you created in your own Google Drive, inside the automatically created **Website Enquiries** tab.

Each submission creates one row containing the timestamp, name, brief introduction, what the visitor is looking for, their query, and the source. You can open that Sheet from Google Drive at any time, share it with a trusted team member, apply filters, or create notifications using Google Sheets/Apps Script.

Until you replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with your deployed `/exec` URL, the form is only a front-end form and submissions will not be registered in a Sheet.

The Google Sheet remains in your Google account; the website package does not contain credentials or private sheet access.
