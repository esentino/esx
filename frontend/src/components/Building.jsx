import React from "react";
import "../styles/Note.css";
import "../styles/Building.css";

function Building({ building, onDelete }) {
  return (
    <div className="building-container">
      <p className="building-name">{building.name}</p>
      <p className="building-image">
        <img src={building.image} />
      </p>
    </div>
  );
}

export default Building;
