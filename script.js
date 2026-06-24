const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

editor.value = "";
preview.textContent = "";

function previewUpdate() {
    const text = editor.value;
    const html = renderMarkdown(text)
    preview.innerHTML = html;
}

function renderMarkdown(text) {

    const lines = text.split("\n");

    const htmllines = lines.map(line => {

        if (line.startsWith("# ")) {
            const content = line.slice(2);
            return `<h1>${content}</h1>`
        }

        if (line.startsWith("## ")) {
            const content = line.slice(3);
            return `<h2>${content}</h2>`
        }

        if (line.startsWith("### ")) {
            const content = line.slice(4);
            return `<h3>${content}</h3>`
        }

        if (line.trim() === "") {
            return "";
        }

        return `<p>${line}</p>`;
    });

    return htmllines.join("\n");
}

editor.addEventListener("input", previewUpdate);
editor.addEventListener("input", renderMarkdown);

previewUpdate();
