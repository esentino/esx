import "../styles/Note.css";
import "../styles/Building.css";
import ProductionMaterial from "./ProductionMaterial";
import PriceMaterial from "./PriceMaterial";

function Building({ building, onDelete }) {
  return (
    <div className="building-container">
      <p className="building-name">{building.name}</p>
      <p className="building-image">
        <img src={building.image} />
      </p>
      <div className="building-price">
        Zakup:
        {building.building_materials.map((material) => (
          <PriceMaterial material={material} key={material.id} />
        ))}
      </div>
      <div className="building-production">
        Produkcja:
        {building.producted_materials.map((material) => (
          <ProductionMaterial material={material} key={material.id} />
        ))}
      </div>
    </div>
  );
}

export default Building;
