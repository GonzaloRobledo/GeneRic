export const filterProperties = (propertiesFilter,filterBy) => {
    let filter = [];
    if(filterBy == "rent" || filterBy=="buy"){
        filter = propertiesFilter.filter(el=>el.type==filterBy);
    }else{
        if(filterBy == "featured"){
            filter = propertiesFilter.filter(el=>el.featured==true);
        }else{
            filter = propertiesFilter.filter(el=>el.price <= 1250000);
        }
    }
    return filter;
}