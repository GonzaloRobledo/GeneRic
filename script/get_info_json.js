export let properties, barrios;

export const getInfoJson = async (url) => {
    try{
        let res = await fetch(url);
        if(!res.ok) throw res;
        let json = await res.json();

        properties = json.properties;
        barrios = json.barrios;
    }catch(err){
        alert("ERROR en getInfoJson");
    }
}