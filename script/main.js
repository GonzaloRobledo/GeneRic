import { getInfoJson } from "./get_info_json.js";
import { showNav } from "./show_nav.js"
import { barrios } from "./get_info_json.js";
import { properties } from "./get_info_json.js";
import { filterPropFeat } from "./filter_prop_feat.js";
import { renderProperties } from "./render_properties.js";
import { loadAllBarrios } from "./load_all_barrios.js";
import { contactForm, resetForm } from "./contact_form.js";
import { msgInputsForm } from "./msg_inputs_form.js";
import { sliderProperties } from "./slider_properties.js";
import { filterForType } from "./filter_for_type.js";
import { filterSearchHeader } from "./filter_search_header.js";
import { showInfoProperty } from "./properties/show_info_property.js";
import { formWorkTeam } from "./form_work_team.js";
import { sendCv } from "./send_cv.js";

let propsFeatured, position;
const $ulFeatured = document.getElementById("list-selection");
const $ulBarrios = document.getElementById("list-barrios");
const $patterns = document.querySelectorAll("[data-pattern]");

document.addEventListener("DOMContentLoaded", async e=>{
    await getInfoJson('./assets/properties.json'); //Espero que los datos de los barrios y propiedades se guarden en sus respectivas variables
    propsFeatured = filterForType(properties,"buy"); //Filtro primero el boton seleccionado por defecto (en este caso buy)
    propsFeatured = filterPropFeat(propsFeatured); //Ahora de esos que se filtraron de tipo buy, filtro los que son destacados
    renderProperties(propsFeatured,0,4,$ulFeatured); //Renderizo solo los 4 primeros (si hay menos de 4, los que haya) 
    loadAllBarrios(barrios,0,4,$ulBarrios); //Cargo las 4 primeras fotos y nombres de los barrios
    msgInputsForm($patterns); //Agrego los div a los input para luego validar y que salte un msg
    localStorage.removeItem("filterProp");
    localStorage.setItem("nameFilter","");
    sessionStorage.clear();
})

document.addEventListener("click", e=>{
    if(e.target.matches(".btn-nav")) showNav(); //Al hacer click en el boton que posee la clase .btn-nav se despliega o se cierra la navegacion

    if(e.target.matches("[data-direction]")){ //Un slider para ver las imagenes de las casas al tocar las flechas
        const id = e.target.closest("li").dataset.property;
        position = sessionStorage.getItem(`position-slider-${id}`);
        if(position==null) position = 0;
        const property = properties.filter(el=>el.id==id)[0];
        if(property.img.length>1){
            const direction = e.target.dataset.direction;
            sliderProperties(property, direction, position,e.target.closest("li"));
        } 
    }

    if(e.target.matches("[data-typemain]")){//Si toco algun selector que tenga la clase data-typemain, lo activo, desactivo el otro y luego filtro por tipo y por destacado (igual que en DOMContentLoad solo que ahora al evento click)
        const selected = document.querySelector(".selected-type-main");
        selected.classList.remove("selected-type-main");
        e.target.classList.add("selected-type-main");
        propsFeatured = filterForType(properties,e.target.dataset.typemain);
        propsFeatured = filterPropFeat(propsFeatured);
        renderProperties(propsFeatured,0,4,$ulFeatured);
    }
    if(e.target.matches("[data-typeheader]")){
        const selected = document.querySelector(".selected-type-header");
        selected.classList.remove("selected-type-header");
        e.target.classList.add("selected-type-header");
    }

    if(e.target.matches("#list-barrios li *")){ //Si toco click en alguna de las fotos de los barrios se me oculta el nombre y se me muestra una breve descripcion del mismo
        const $description = e.target.closest("li").querySelector("span");
        const $name = e.target.closest("li").querySelector("p");
        $description.classList.toggle("none");
        $name.classList.toggle("none");
    }

    if(e.target.matches(".close-msg-contact")){
        const $sectionContact = document.querySelector(".section-contact-form");
        const $formSend = document.querySelector(".form-send");
        $sectionContact.removeChild($formSend);
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

    if(e.target.matches(".toContact") || e.target.matches(".isPart")) showNav();

    if(e.target.matches("#is-part")){ //Averiguar como hacer la parte del drag and drop en otro archivo y reutilizarlo
        formWorkTeam(e.target.parentNode);

        const $dropBox = document.getElementById("drop-box");

        $dropBox.addEventListener("dragover", e=>{
            e.preventDefault();
            $dropBox.classList.add("drag-over");
            $dropBox.textContent="Suelte el archivo"
        })
        $dropBox.addEventListener("dragleave", e => {
            e.preventDefault();
            $dropBox.classList.remove("drag-over");
            $dropBox.textContent = "Arrastre o seleccione su cv"
        })
        $dropBox.addEventListener("drop", e=>{
            e.preventDefault();
            sendCv(e.dataTransfer.files[0],$dropBox);
        })
    }
    
    if(e.target.matches("#btn-send-cv")) alert("CV ENVIADO! :)");

    if(e.target.matches("#btn-send-cv") || e.target.matches(".close-cv")){
        const $section = e.target.closest(".section-team-work");
        const $divForm = e.target.closest(".form-cv");
        $section.removeChild($divForm);
    }

})

document.addEventListener("keyup",e=>{
    if(e.target.matches("[data-pattern]")) contactForm(e.target); //Al tocar un elemento de formulario que tenga el atributo data-pattern se ejecuta contactForm para verificar que sea valido o no lo que se escribio 
})

document.addEventListener("submit", e=>{
    e.preventDefault();
    if(e.target.matches("#search-form")){
        const info = e.target.search.value.toLowerCase();
        const type = document.querySelector(".selected-type-header").dataset.typeheader;
        const filter = filterSearchHeader(properties,info,type);
        if(filter.length != 0){
            localStorage.setItem("filterProp", JSON.stringify(filter));
            localStorage.setItem("nameFilter", e.target.search.value);
            location.href = "./pages/properties.html";
        }else{
            alert("NO SE ENCONTRÓ");
        }
    }

    if(e.target.matches("#contact-form")){ //Mensaje de envio de formulario (en caso de enviarlo a algun lugar el dia de mañana tener en cuenta que primero tienen que enviarse los datos (poner un loader) y luego se abre el cartel)
        resetForm(e.target);
        const $div = document.createElement("div");
        $div.classList.add("form-send");
        $div.innerHTML = `
                <div>
                    <i class="fa-sharp fa-solid fa-circle-check"></i>
                    <p>Formulario enviado con exito! Muchas gracias</p>
                    <button class="close-msg-contact">Close</button>
                </div>
        `
        e.target.insertAdjacentElement("afterend",$div);
    }
})

document.addEventListener("change", e=>{
    if(e.target.matches("#cv")){
        const $dropBox = document.getElementById("drop-box");
        sendCv(e.target.files[0],$dropBox);
    }
})