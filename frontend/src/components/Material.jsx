import React from "react";

function Material({material, onDelete}){
    return (
        <div>
            {material.production_speed}<img src={material.image} /> na minutę
        </div>
    )
}
export default Material;
