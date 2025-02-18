import { createNote, getNotes, updateNote, deleteNote, getNoteById } from "../src/services/noteService";
import db from "../src/database/db";

beforeAll(() => {
  // Reset the database before tests
  db.exec("DELETE FROM notes");
});

describe("Note Service with SQLite", () => {
  it("should create a new note", () => {
    const note = createNote("Test Note", "This is a test note.");
    expect(note).toHaveProperty("id");
    expect(note.title).toBe("Test Note");
  });

  it("should retrieve all notes", () => {
    const notes = getNotes();
    expect(Array.isArray(notes)).toBe(true);
  });

  it("should retrieve a note by ID", () => {
    const note = createNote("Test Note", "This is a test note.");
    const retrievedNote = getNoteById(note.id);
    expect(retrievedNote).not.toBeUndefined();
    expect(retrievedNote?.id).toBe(note.id);
  });

  it("should update a note", () => {
    const note = createNote("To Edit", "Original Content");
    const updated = updateNote(note.id, "Updated Title", "Updated Content");

    expect(updated).not.toBeNull();
    expect(updated?.title).toBe("Updated Title");
  });

  it("should return null when updating a non-existent note", () => {
    const updated = updateNote("non-existent-id", "Updated Title", "Updated Content");
    expect(updated).toBeNull();
  });

  it("should delete a note", () => {
    const note = createNote("To Delete", "Will be removed.");
    const result = deleteNote(note.id);

    expect(result).toBe(true);
  });

  it("should return false when deleting a non-existent note", () => {
    const result = deleteNote("non-existent-id");
    expect(result).toBe(false);
  });
});

it("should delete a note", () => {
  const note = createNote("To Delete", "Will be removed.");
  const result = deleteNote(note.id);

  expect(result).toBe(true);
});
