import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/notes', noteRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



/*
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
import mongoose from 'mongoose';
import notesRouter from './routes';

const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/notes', notesRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/


/*
// backend/src/index.ts
//import express from 'express';
//import cors from 'cors';
import { json } from 'body-parser';

const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(json());

const notes = new Map();

app.get('/notes', (_req: any, res: { json: (arg0: any[]) => void; }) => {
  res.json(Array.from(notes.values()));
});

app.get('/notes/:id', (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: any) => void; }) => {
  const note = notes.get(req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
});

app.post('/notes', (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) => {
  const id = Date.now().toString();
  const newNote = { id, ...req.body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  notes.set(id, newNote);
  res.status(201).json(newNote);
});

app.put('/notes/:id', (req: { params: { id: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: any) => void; }) => {
  if (!notes.has(req.params.id)) return res.status(404).json({ message: 'Note not found' });
  const updatedNote = { ...notes.get(req.params.id), ...req.body, updatedAt: new Date().toISOString() };
  notes.set(req.params.id, updatedNote);
  res.json(updatedNote);
});

app.delete('/notes/:id', (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; send: { (): void; new(): any; }; }; }) => {
  if (!notes.delete(req.params.id)) return res.status(404).json({ message: 'Note not found' });
  res.status(204).send();
});

app.listen(3001, () => console.log('Server running on port 3001'));
*/