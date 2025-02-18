import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import CreateEditPage from "./pages/CreateEditPage";
import NotePage from "./pages/NotePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/notes/:id" element={<NotePage />} />
        <Route path="/create" element={<CreateEditPage />} />
        <Route path="/edit/:id" element={<CreateEditPage />} />
      </Routes>
    </Router>
  );
};

export default App;