import { barrios } from "../get_info_json.js";

export const showInfoProperty = (properties,id,ubication) => {
    const prop = properties.filter(el=>el.id==id)[0];
    const barrio = barrios.filter(el=>el.id == prop.barrioId)[0];
    const $div = document.createElement("div");
    $div.classList.add("info-property");
    $div.innerHTML = `
        <div>
            <img src=${prop.img[0]} alt=${prop.street}>
            <i class="fa-solid fa-circle-xmark close-info"></i>
            <p><span>Zone:</span> ${barrio.name}</p>
            <p><span>Street:</span> ${prop.street}</p>
            <p><span>Description:</span> ${prop.description}</p>
            <p><span>Price:</span> $${prop.price}</p>
            <button>Contacto</button>
        </div>
    `
    ubication.insertAdjacentElement("afterend",$div);
}