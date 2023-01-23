export const loadAllBarrios = (barrios,min,max,ul) => {
    let info = "";
    for(let i=min;i<max;i++){
        info += `
            <li data-barrio=${barrios[i].id}>
                <img src=${barrios[i].img}>
                <p>${barrios[i].name}</p>
                <span class="none">${barrios[i].description}</span>
            </li>
        `
    }
    ul.innerHTML = info;
}