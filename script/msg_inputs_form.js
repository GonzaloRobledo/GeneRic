export const msgInputsForm = (patterns) => {
    patterns.forEach(el=>{
        const $div = document.createElement("div")
        el.insertAdjacentElement("afterend",$div);
    })
}