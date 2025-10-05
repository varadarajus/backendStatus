const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Save database in Render's writable tmp folder
const dbPath = path.join(__dirname, "data", "users.db");

// Make sure the folder exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Open database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Database opened at", dbPath);

    // ✅ Create table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err);
        } else {
          console.log("User table is ready ✅");
        }
      }
    );
  }
});

module.exports = db;
