import React from "react";

function PriceMaterial({ material, onDelete }) {
  return (
    <div>
      {material.count}
      <img src={material.image} />
    </div>
  );
}
export default PriceMaterial;
