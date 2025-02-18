import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../api";

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<{ title: string; content: string } | null>(
    null
  );

  useEffect(() => {
    if (id) {
      console.log("Fetching note with id:", id); // Debugging step
      getNote(id).then((response) => {
        console.log("Note fetched:", response.data); // Debugging step
        setNote(response.data);
      }).catch((error) => {
        console.error("Error fetching note:", error); // Debugging step
      });
    }
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await deleteNote(id);
      navigate("/");
    }
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-gray-700"
        >
          X
        </button>
      </div>
      <p className="text-gray-700 mt-2">{note.content}</p>
      <div className="mt-4">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotePage;