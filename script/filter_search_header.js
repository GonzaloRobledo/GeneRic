import { barrios } from "./get_info_json.js"

export const filterSearchHeader = (properties,info,type) => {
    const filter = properties.filter(prop=> {
        const barrio = barrios.filter(barrio => barrio.id == prop.barrioId)[0];
        if(prop.street.toLowerCase().includes(info) || barrio.name.toLowerCase().includes(info)) return prop;
    })
    return filter;
}