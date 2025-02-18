import Database from "better-sqlite3";
import path from "path";

// Initialize the database
const db = new Database(path.join(__dirname, "../../notes.db"), { verbose: console.log });

// Create notes table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )
`);

export default db;
