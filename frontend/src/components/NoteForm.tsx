import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, createNote, updateNote } from "../api";

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getNote(id)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(() => setError("Failed to load note for editing."));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content cannot be empty.");
      return;
    }

    try {
      if (id) {
        await updateNote(id, { title, content });
      } else {
        await createNote({ title, content });
      }
      navigate("/");
    } catch (error) {
      setError("Failed to save note. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{id ? "Edit Note" : "Create Note"}</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              {id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
