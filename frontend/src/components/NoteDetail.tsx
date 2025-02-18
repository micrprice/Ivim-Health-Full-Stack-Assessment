import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../api"; // Import the getNote and deleteNote functions from api.ts

interface Note {
  id: string;
  title: string;
  content: string;
}

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    getNote(id!).then((response) => setNote(response.data));
  }, [id]);

  const handleDelete = async () => {
    await deleteNote(id!);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      {note ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{note.title}</h2>
            <p className="card-text">{note.content}</p>
            <button className="btn btn-danger me-2" onClick={handleDelete}>
              Delete Note
            </button>
            <a href={`/edit/${id}`} className="btn btn-primary">
              Edit Note
            </a>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NoteDetail;