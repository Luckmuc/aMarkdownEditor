const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

editor.value = "";
preview.textContent = "";

function previewUpdate() {
    const text = editor.value;
    const html = renderMarkdown(text)
    preview.innerHTML = html;
}

function renderMarkdown() {
    return text;
}

editor.addEventListener("input", previewUpdate);

previewUpdate();

