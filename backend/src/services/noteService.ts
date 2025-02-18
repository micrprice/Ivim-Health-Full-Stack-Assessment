import db from "../database/db";
import { Note } from "../models/Note";
import { v4 as uuidv4 } from "uuid";

export const getNotes = (): Note[] => {
  return db.prepare("SELECT * FROM notes").all() as Note[];
};

export const getNoteById = (id: string): Note | undefined => {
  return db.prepare("SELECT * FROM notes WHERE id = ?").get(id) as Note | undefined;
};

export const createNote = (title: string, content: string): Note => {
  const id = uuidv4();
  const timestamp = new Date().toISOString();

  db.prepare(
    "INSERT INTO notes (id, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)"
  ).run(id, title, content, timestamp, timestamp);

  return { id, title, content, createdAt: timestamp, updatedAt: timestamp };
};

export const updateNote = (id: string, title: string, content: string): Note | null => {
  const timestamp = new Date().toISOString();
  
  const result = db.prepare(
    "UPDATE notes SET title = ?, content = ?, updatedAt = ? WHERE id = ?"
  ).run(title, content, timestamp, id);

  if (result.changes === 0) return null;

  const updatedNote = getNoteById(id);
  return updatedNote !== undefined ? updatedNote : null;
};

export const deleteNote = (id: string): boolean => {
  const result = db.prepare("DELETE FROM notes WHERE id = ?").run(id);
  return result.changes > 0;
};
