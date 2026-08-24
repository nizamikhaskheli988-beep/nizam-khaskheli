# Website enquiry form + Google Sheets

The restored website keeps the original visual design, animations, ticker effects and alignment. The contact form is connected separately through Google Apps Script, so the website layout does not depend on the spreadsheet.

## 1. Connect the form to your existing Google Sheet

The included `google-apps-script.gs` is already configured for the spreadsheet you supplied:

`1qn9Ma5BAK5szO2YBs4HPVz0OKvmoGd0J`

Open that spreadsheet and choose **Extensions → Apps Script**. Replace the default Apps Script code with the contents of `google-apps-script.gs`.

Then choose **Deploy → New deployment → Web app** and use:

- Execute as: **Me**
- Who has access: **Anyone**

Authorize the script when Google asks. Copy the deployed URL ending in `/exec`.

## 2. Put the Web App URL into the website

In `index.html`, find:

`YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL`

and replace it with your `/exec` URL.

Do not put the Google Sheet URL into the HTML. The Sheet remains private; only the Apps Script Web App receives the form submission.

## 3. What appears in the Sheet

Each successful submission creates one new row:

- Timestamp
- Full Name
- Brief Introduction
- What They're Looking For
- Query

## 4. Visitor analytics

The restored website also contains a Google Analytics 4 integration placeholder. Replace `G-XXXXXXXXXX` in `index.html` with your Google Analytics **Measurement ID**.

After deployment, Google Analytics can show aggregate visitor information such as users, sessions, pages viewed, traffic sources, device type and approximate location. It does **not** normally reveal the real-world identity of anonymous visitors.

The enquiry form is the appropriate place for visitors to voluntarily identify themselves.
