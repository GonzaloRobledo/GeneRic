const orderData = (data) => {
    let min,aux;
    for(let i=0;i<data.length-1;i++){
        min=i;
        for(let j=i+1;j<data.length;j++) if(data[j].price<data[min].price) min=j;

        if(min!=i){
            aux = data[i];
            data[i] = data[min];
            data[min] = aux;
        }
    }
    return data;
}

export const orderProperties = (properties,order) => {
    let dataOrder;
    if(order!="prominent"){
        dataOrder = order=="min" ? orderData([...properties]) : orderData([...properties]).reverse();
    }else{
        let filterReco = properties.filter(el=>el.featured==true);
        let filterNotReco = properties.filter(el=>el.featured==false);
        dataOrder = [...filterReco,...filterNotReco];
    }
    
    return dataOrder;
}