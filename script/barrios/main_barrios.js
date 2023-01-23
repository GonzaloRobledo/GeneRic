import { getInfoJson } from "../get_info_json.js"
import { barrios } from "../get_info_json.js";
import { loadAllBarrios } from "../load_all_barrios.js";
import { showNav } from "../show_nav.js";

const $listBarrios = document.getElementById("list-barrios");
const $nav = document.getElementById("navegation");

document.addEventListener("DOMContentLoaded", async e=>{
    await getInfoJson("../assets/properties.json");
    loadAllBarrios(barrios,0,barrios.length,$listBarrios);
})

document.addEventListener("click", e => {
    if(e.target.matches(".btn-nav")) showNav($nav);

    if(e.target.matches("#list-barrios li *")){
        const $description = e.target.closest("li").querySelector("span");
        const $name = e.target.closest("li").querySelector("p");
        $description.classList.toggle("none");
        $name.classList.toggle("none");
    }
})
