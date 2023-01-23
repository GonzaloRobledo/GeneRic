import { getInfoJson } from "../get_info_json.js";
import { properties } from "../get_info_json.js";
import { renderProperties } from "../render_properties.js";
import { showNav } from "../show_nav.js";
import { sliderProperties } from "../slider_properties.js";
import { filterAll } from "./filter_all.js";
import { filterProperties } from "./filter_properties.js";
import { showInfoProperty } from "./show_info_property.js";

const $listProperties = document.getElementById("list-selection");
let propertiesFilter;
const $listOrder = document.getElementById("list-order");
const $listFilter = document.getElementById("list-filter");
const $inputLocation = document.getElementById("input-location"); 
let position=0;

document.addEventListener("DOMContentLoaded",async e=>{
    await getInfoJson('../assets/properties.json');
    const filterOn = JSON.parse(localStorage.getItem("filterProp")); //Nos fijamos si hay un filtro pendiente que vino del index
    const nameFilter = localStorage.getItem("nameFilter"); //Guardamos el nombre del filtro, si no hay viene con ""
    filterOn!=null ? propertiesFilter = [...filterOn] : propertiesFilter = [...properties]; //Si hay filtro pendiente entonces lo guardamos en propertiesFilter, sino guardamos todas las properties en propertiesFilter.
    $inputLocation.value = nameFilter; //Le ponemos el valor que tiene nameFilter al input de busqueda de location
    renderProperties(propertiesFilter,0,propertiesFilter.length,$listProperties); //Renderizamos las properties con lo que haya guardado propertiesFilter (lo ya filtrado o todas las properties)
    sessionStorage.clear();
})

document.addEventListener("click", e=>{
    if(e.target.matches(".btn-nav")) showNav();

    if(e.target.matches("[data-direction]")){
        const id = e.target.closest("li").dataset.property;
        position = sessionStorage.getItem(`position-slider-${id}`);
        if(position==null) position = 0;
        const property = properties.filter(el=>el.id==id)[0];
        if(property.img.length>1){
            const direction = e.target.dataset.direction;
            sliderProperties(property, direction, position,e.target.closest("li"));
        }  
    }

    if(e.target.matches(".list-order") || e.target.matches(".list-order *")) $listOrder.classList.toggle("visible"); 

    if(e.target.matches(".list-filter") || e.target.matches(".list-filter *")) $listFilter.classList.toggle("visible");

    if(e.target.matches("#list-filter li") || e.target.matches("#list-order li")){
        $listFilter.classList.remove("visible");
        $listOrder.classList.remove("visible");
        e.target.parentNode.dataset.on = e.target.dataset.filter==undefined ? e.target.dataset.order : e.target.dataset.filter;
        filterAll(propertiesFilter);
    }

    if(e.target.matches(".btn-info-property")){
        const $li = e.target.closest("li");
        const id = $li.dataset.property;
        showInfoProperty(properties,id,$li);
    }

    if(e.target.matches(".close-info")){
        const $toDel = e.target.closest(".info-property");
        const $to = e.target.closest("ul");
        $to.removeChild($toDel);
    }
})

document.addEventListener("keyup", e=>{
    if(e.target.matches("#input-location") && e.keyCode==13) filterAll(properties);

    if(e.target.matches("#input-location")) if(e.target.value=="") filterAll(properties);
})
