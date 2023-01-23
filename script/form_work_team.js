export const formWorkTeam = (ubication) => {
    const $div = document.createElement("div");
    $div.classList.add("form-cv");
    $div.innerHTML = `
            <form>
                <i class="fa-solid fa-circle-xmark close-cv"></i>
                <label for="cv" id="drop-box">Arraste o seleccione su cv</label>
                <input class="none" type="file" id="cv">
            </form>
    `
    ubication.insertAdjacentElement("beforeend",$div);
}