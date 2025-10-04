const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Save database in Render's writable tmp folder
const dbPath = path.join(__dirname, "data", "users.db");

// Make sure the folder exists
const fs = require("fs");
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Error opening database", err);
  else console.log("Database opened at", dbPath);
});

module.exports = db;
