
const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// GOOGLE SHEET SETUP
// =======================
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "1ev0IKmiwQZcExab2loSS421379YQa5O7nlzXjClnWtg"; // <<< ganti ID Google Sheet Anda

// =======================
// ENDPOINT API
// =======================
app.post("/register", async (req, res) => {
  try {
    const { name, phone, email, pkg } = req.body;

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            name,
            phone,
            email,
            pkg
          ]
        ],
      },
    });

    res.json({ success: true, message: "Data saved to sheet" });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// =======================
// START SERVER
// =======================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

