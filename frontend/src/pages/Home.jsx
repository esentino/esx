import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import Building from "../components/Building";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getNotes();
    getBuildings();
  }, []);

  const getNotes = () => {
    api
      .get("api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };
  const getBuildings = () => {
    api
      .get("api/buildings/")
      .then((res) => res.data)
      .then((data) => setBuildings(data))
      .catch((err) => alert(err));
  };

  const deleteNode = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!.");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h2>Buildings</h2>
      {buildings.map((building) => (
        <Building building={building} key={building.id} />
      ))}
    </div>
  );
}

export default Home;
