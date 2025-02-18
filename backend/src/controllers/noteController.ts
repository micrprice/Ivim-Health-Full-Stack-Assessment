import { Request, Response } from 'express';
import { Note } from '../models/Note';
import * as noteService from '../services/noteService';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await noteService.getNoteById(id);
    if (note) res.status(200).json(note);
    else res.status(404).json({ error: 'Note not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch note' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    const newNote = await noteService.createNote(title, content);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedNote = await noteService.updateNote(id, title, content);
    if (updatedNote) res.status(200).json(updatedNote);
    else res.status(404).json({ error: 'Note not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const success = await noteService.deleteNote(id);
    if (success) res.status(204).send();
    else res.status(404).json({ error: 'Note not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
