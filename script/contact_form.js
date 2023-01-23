export const resetForm = (form) => {
    form.reset();
    const $div = form.querySelectorAll("div");
    $div.forEach(el=>{
        el.classList.remove("confirm","not-confirm");
        el.textContent = "";
        form.send.setAttribute("disabled","disabled");
        form.send.classList.add("disabled");
    })
}

const fillDivision = (div,error,msg) => {
    if(error==1){
        div.classList.add("not-confirm");
        div.classList.remove("confirm");
    }else{
        if(error==0){
            div.classList.add("confirm");
            div.classList.remove("not-confirm")
        }else{
            div.classList.remove("confirm");
            div.classList.remove("not-confirm")
        }
    }
    div.textContent = msg;
}

export const contactForm = (target) => {
    const cantRequireds = document.querySelectorAll("[data-pattern]").length;
    const $send = document.getElementById("send-contact-form");

    const pattern = new RegExp(target.dataset.pattern,"gi");
    const $divMsg = target.nextElementSibling;
    if(target.value!=""){
        pattern.test(target.value) ? fillDivision($divMsg,0,`The ${target.name} is valid :D`) : fillDivision($divMsg,1,target.dataset.msg);
    }else{
        fillDivision($divMsg,-1,"")
    }

    if(document.querySelectorAll(".confirm").length == cantRequireds){
        $send.removeAttribute("disabled");
        $send.classList.remove("disabled");
    }else{
        $send.setAttribute("disabled","disabled");
        $send.classList.add("disabled");
    }
}
