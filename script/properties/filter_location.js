import { barrios } from "../get_info_json.js";

export const filterLocation = (properties,value) => {
    let filter = properties.filter(prop=> {
        const barrio = barrios.filter(barrio=>barrio.id==prop.barrioId)[0];
        if(barrio.name.toLowerCase().includes(value)) return prop;
    })
    return filter;
}