import request from 'supertest';
import express from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from '../src/controllers/noteController';
import * as noteService from '../src/services/noteService';

const app = express();
app.use(express.json());
app.get('/notes', getNotes);
app.get('/notes/:id', getNoteById);
app.post('/notes', createNote);
app.put('/notes/:id', updateNote);
app.delete('/notes/:id', deleteNote);

jest.mock('../src/services/noteService');

describe('Note Controller', () => {
    beforeAll(() => {
        // Setup code if needed
    });

    afterAll(() => {
        // Cleanup code if needed
    });

    describe('getNotes', () => {
        it('should retrieve all notes', async () => {
            const mockNotes = [{ id: '1', title: 'Test Note', content: 'This is a test note.' }];
            (noteService.getNotes as jest.Mock).mockResolvedValue(mockNotes);

            const response = await request(app).get('/notes');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockNotes);
        });

        it('should return 500 if there is a server error', async () => {
            (noteService.getNotes as jest.Mock).mockRejectedValue(new Error('Failed to fetch notes'));

            const response = await request(app).get('/notes');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch notes' });
        });
    });

    describe('getNoteById', () => {
        it('should retrieve a note by ID', async () => {
            const mockNote = { id: '1', title: 'Test Note', content: 'This is a test note.' };
            (noteService.getNoteById as jest.Mock).mockResolvedValue(mockNote);

            const response = await request(app).get('/notes/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockNote);
        });

        it('should return 404 if note not found', async () => {
            (noteService.getNoteById as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/notes/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Note not found' });
        });

        it('should return 500 if there is a server error', async () => {
            (noteService.getNoteById as jest.Mock).mockRejectedValue(new Error('Failed to fetch note'));

            const response = await request(app).get('/notes/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch note' });
        });
    });

    describe('createNote', () => {
        it('should create a new note', async () => {
            const mockNote = { id: '1', title: 'New Note', content: 'This is a new note.' };
            (noteService.createNote as jest.Mock).mockResolvedValue(mockNote);

            const response = await request(app).post('/notes').send({ title: 'New Note', content: 'This is a new note.' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockNote);
        });

        it('should return 500 if there is a server error', async () => {
            (noteService.createNote as jest.Mock).mockRejectedValue(new Error('Failed to create note'));

            const response = await request(app).post('/notes').send({ title: 'New Note', content: 'This is a new note.' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create note' });
        });
    });

    describe('updateNote', () => {
        it('should update a note', async () => {
            const mockNote = { id: '1', title: 'Updated Note', content: 'This is an updated note.' };
            (noteService.updateNote as jest.Mock).mockResolvedValue(mockNote);

            const response = await request(app).put('/notes/1').send({ title: 'Updated Note', content: 'This is an updated note.' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockNote);
        });

        it('should return 404 if note not found', async () => {
            (noteService.updateNote as jest.Mock).mockResolvedValue(null);

            const response = await request(app).put('/notes/1').send({ title: 'Updated Note', content: 'This is an updated note.' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Note not found' });
        });

        it('should return 500 if there is a server error', async () => {
            (noteService.updateNote as jest.Mock).mockRejectedValue(new Error('Failed to update note'));

            const response = await request(app).put('/notes/1').send({ title: 'Updated Note', content: 'This is an updated note.' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update note' });
        });
    });

    describe('deleteNote', () => {
        it('should delete a note', async () => {
            (noteService.deleteNote as jest.Mock).mockResolvedValue(true);

            const response = await request(app).delete('/notes/1');

            expect(response.status).toBe(204);
        });

        it('should return 404 if note not found', async () => {
            (noteService.deleteNote as jest.Mock).mockResolvedValue(false);

            const response = await request(app).delete('/notes/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Note not found' });
        });

        it('should return 500 if there is a server error', async () => {
            (noteService.deleteNote as jest.Mock).mockRejectedValue(new Error('Failed to delete note'));

            const response = await request(app).delete('/notes/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete note' });
        });
    });
});