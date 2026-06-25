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
    let html ="";
    let inlist = false;

    for (const line of lines) {
        if (line.startsWith("- ")) {
            if (!inlist) {
                html += "<ul>";
                inlist = true;
            }
            html += `<li>${parseInline(line.slice(2))}</li>`;
            continue;
        }
    }

    if (inlist) {
        html += "</ul>";
        inlist = false;
    }

    const htmllines = lines.map(line => {

        if (line.startsWith("# ")) {
            const content = inlineDesigns(line.slice(2));
            return `<h1>${content}</h1>`
        }

        if (line.startsWith("## ")) {
            const content = inlineDesigns(line.slice(3));
            return `<h2>${content}</h2>`
        }

        if (line.startsWith("### ")) {
            const content = inlineDesigns(line.slice(4));
            return `<h3>${content}</h3>`
        }

        if (line.trim() === "") {
            return "<br />";
        }

        return `<p>${inlineDesigns(line)}</p>`;
    });
    return htmllines.join("\n");
}

function inlineDesigns(text) {
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");    // tf does this do, inline suggestions doing whatever but it lowk seems to work
    return text;
}

editor.addEventListener("input", previewUpdate);
editor.addEventListener("input", renderMarkdown);

previewUpdate();
