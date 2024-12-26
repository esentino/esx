import React from "react";

function ProductionMaterial({ material, onDelete }) {
  return (
    <div>
      {material.production_speed}
      <img src={material.image} /> na minutę
    </div>
  );
}
export default ProductionMaterial;
