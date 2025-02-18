import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotes } from "../api"; // Import the getNotes function from api.ts

interface Note {
  id: string;
  title: string;
  content: string;
}

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getNotes().then((response) => setNotes(response.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Notes</h2>
      <Link to="/create" className="btn btn-primary mb-3">
        Create New Note
      </Link>
      <div className="row">
        {notes.map((note) => (
          <div key={note.id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text text-truncate">{note.content}</p>
                <Link to={`/notes/${note.id}`} className="btn btn-info">
                  View Note
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;