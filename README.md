[README.md](https://github.com/user-attachments/files/27398398/README.md)
# linkedinpage# Sachin Hattangadi Career Atlas

A static personal branding web app for recruiters and hiring managers. The interface is designed to turn LinkedIn profile data into a visual career narrative across timeline, skills, education, and certifications.

## How to Preview

Open `index.html` in a browser.

If the browser blocks `data/career.json` because of local file security, run the included static server from this folder and open the local URL:

```powershell
node server.mjs
```

Then visit:

```text
http://localhost:5500
```

## How to Export LinkedIn for Integration

Please provide two exports if possible.

### 1. Public Profile PDF

Use this for the fastest first integration.

1. Open LinkedIn in your browser.
2. Go to your profile page.
3. Click `More`.
4. Choose `Save to PDF`.
5. Send me the downloaded PDF.

This usually includes your headline, summary, experience, education, skills, certifications, and contact-visible profile details.

### 2. LinkedIn Data Archive

Use this when you want cleaner structured data.

1. Go to LinkedIn `Settings & Privacy`.
2. Open `Data privacy`.
3. Choose `Get a copy of your data`.
4. Select either `Download larger data archive` or select profile-related categories if available.
5. Request the archive and wait for LinkedIn's email.
6. Download the ZIP when it is ready.
7. Share the ZIP or the relevant CSV files.

The most useful files are usually:

- `Profile.csv`
- `Positions.csv`
- `Education.csv`
- `Skills.csv`
- `Certifications.csv`

## Integration Target

The site reads content from:

```text
data/career.json
```

Once you provide the LinkedIn export, I will convert it into this JSON structure and replace the placeholder content.
