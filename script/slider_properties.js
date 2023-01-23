export const sliderProperties = (property,direction,position,targetFather) => {
    const $imgProperty = targetFather.querySelector("#img-property");
    if(direction=="left"){
        position==0 ? position=property.img.length-1 : position--;
        $imgProperty.setAttribute("src",property.img[position]);
    }else{
        position==property.img.length-1 ? position=0 : position++;
        $imgProperty.setAttribute("src",property.img[position]);
    }
    sessionStorage.setItem(`position-slider-${property.id}`,position);
}