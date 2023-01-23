import { barrios } from "./get_info_json.js";

//A ESTA FUNCION LE LLEGAN LAS PROPIEDADES QUE QUEREMOS MOSTRAR, DESDE CUAL HASTA CUAL QUEREMOS MOSTRAR Y LA LISTA DONDE SE VAN A INSERTAR ESAS PROPIEDADES

export const renderProperties = (properties,min,max,ul) => {
    let info = "";

    if(max>properties.length) max=properties.length;

    for(let i=min;i<max;i++){
        info+=`<li data-property=${properties[i].id} data-barrioId=${properties[i].barrioId}>
                <div class="img-selection">
                    <img src=${properties[i].img[0]} alt=${properties[i].street} id="img-property">
                    <p class="in-selection">${properties[i].type}</p>
                    <div class="arrows-selection">
                        <i class="fa-solid fa-chevron-left" data-direction="left"></i>
                        <i class="fa-solid fa-chevron-right" data-direction="right"></i>
                    </div>
                    <div class="site-selection">
                        <h3>${properties[i].street}</h3>
                        <h3>${barrios.filter(el=>el.id==properties[i].barrioId)[0].name}</h3>
                    </div>
                </div>
                <div class="price-selection">
                    <p>$${properties[i].price}</p>
                    <p><span>Contacto:</span>${properties[i].contact}</p>
                    <button class="btn-info-property">View More</button>
                </div>
            </li>`
    }

    ul.innerHTML = info!="" ? info : `<h3 class="not-confirm">¡No se encontraron coincidencias!</h3>`;
}