import { useEffect, useState } from "react";
import { getNotes } from "../api";
import { Link } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getNotes().then((response) => setNotes(response.data));
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <Link
        to="/create"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create Note
      </Link>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="border p-4 rounded shadow">
            <Link to={`/note/${note.id}`} className="text-lg font-semibold">
              {note.title}
            </Link>
            <p className="text-gray-600">{note.content.substring(0, 50)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
