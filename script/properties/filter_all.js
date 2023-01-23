import { renderProperties } from "../render_properties.js";
import { filterProperties } from "./filter_properties.js"
import { orderProperties } from "./order_properties.js";
import { filterLocation } from "./filter_location.js";

export const filterAll = (properties) => {
    const $listProperties = document.getElementById("list-selection");

    const $inputLocation = document.getElementById("input-location");
    const $listOrder = document.getElementById("list-order");
    const $listFilter = document.getElementById("list-filter");
    const $h2Filter = document.querySelector(".list-filter p");
    const $h2Order = document.querySelector(".list-order p");
   
    let propertiesFilter = [...properties];
    //Filter Location
    if($inputLocation.value!="") propertiesFilter = filterLocation(propertiesFilter,$inputLocation.value.toLowerCase());
    //Filter properties
    if($listFilter.dataset.on!="remove" && $listFilter.dataset.on!=undefined){
        propertiesFilter = filterProperties(propertiesFilter, $listFilter.dataset.on);
        $h2Filter.textContent = $listFilter.dataset.on;
    }else{
        $h2Filter.textContent = "Filtrar";
    };
    //Order properties
    if($listOrder.dataset.on!="remove" && $listOrder.dataset.on!=undefined){
        propertiesFilter = orderProperties(propertiesFilter, $listOrder.dataset.on);
        $h2Order.textContent = $listOrder.dataset.on;
    }else{
        $h2Order.textContent = "Order for...";
    }
    
    renderProperties(propertiesFilter,0,propertiesFilter.length,$listProperties);
}