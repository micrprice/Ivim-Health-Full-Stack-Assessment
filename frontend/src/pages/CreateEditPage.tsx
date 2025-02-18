import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNote, updateNote, getNote } from "../api";

const CreateEditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      getNote(id).then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateNote(id, { title, content });
    } else {
      await createNote({ title, content });
    }
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{id ? "Edit Note" : "Create Note"}</h2>
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
              {id ? "Update Note" : "Save Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEditNote;