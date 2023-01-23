export const sendCv = (file,$dropBox) => {
    $dropBox.classList.remove("drag-over");
    $dropBox.classList.add("drop");
    $dropBox.innerHTML = `Archivo: <span>${file.name}</span>`;
    const $buttonSend = document.createElement("button");
    $buttonSend.textContent = "Enviar cv"
    $buttonSend.id="btn-send-cv";
    $dropBox.insertAdjacentElement("beforeend",$buttonSend);
}