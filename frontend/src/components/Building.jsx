import React from "react";
import "../styles/Note.css";
import "../styles/Building.css";
import Material from "./Material";

function Building({ building, onDelete }) {
  const materials = building.producted_materials;
  console.log(materials);
  return (
    <div className="building-container">
      <p className="building-name">{building.name}</p>
      <p className="building-image">
        <img src={building.image} />
      </p>
      <p className="building-price">
        Produkcja:
        {materials.map((material) => (
          <Material material={material} />
        ))}
      </p>
    </div>
  );
}

export default Building;
