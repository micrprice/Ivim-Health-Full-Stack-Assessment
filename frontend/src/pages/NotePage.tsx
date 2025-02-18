import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../api";

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    if (id) {
      getNote(id).then((response) => setNote(response.data));
    }
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await deleteNote(id);
      navigate("/");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h2 className="card-title">{note.title}</h2>
            <button
              onClick={handleClose}
              className="btn btn-link text-decoration-none"
            >
              &times;
            </button>
          </div>
          <p className="card-text">{note.content}</p>
          <div className="mt-4">
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="btn btn-success me-2"
            >
              Edit Note
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
