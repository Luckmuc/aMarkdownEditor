const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

editor.value = "";

function previewUpdate() {
    const text = editor.value;

    preview.textContent = text;
}

editor.addEventListener("input", previewUpdate);

previewUpdate();





