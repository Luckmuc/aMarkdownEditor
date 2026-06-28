const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const exportbutton = document.getElementById("export-as-md");
const importbutton = document.getElementById("import-as-md");
const importfile = document.getElementById("import-md");

editor.value = "";
preview.textContent = "";

function previewUpdate() {
  const text = editor.value;
  const html = renderMarkdown(text);
  preview.innerHTML = html;
}


function renderMarkdown(text) {
    const lines = text.split("\n");
    let html = "";
    let inList = false;
    let inOrderedList = false;

    for (const line of lines) {
        if (line.startsWith("- ")) {
            if (!inList) {
                html += "<ul>";
                inList = true;
            }
            const itemText = line.slice(2);
            html += `<li>${inlineDesigns(itemText)}</li>`;
            continue;
        }

        if (/^\d+\.\s/.test(line)) {
            if (!inOrderedList) {
                html += "<ol>";
                inOrderedList = true;
            }
            const itemText = line.replace(/^\d+\.\s/, "");
            html += `<li>${inlineDesigns(itemText)}</li>`;
            continue;
        }

        if (inList) {
            html += "</ul>";
            inList = false;
        }
        if (inOrderedList) {
            html += "</ol>";
            inOrderedList = false;
        }

        if (line.startsWith("### ")) {
            html += `<h3>${inlineDesigns(line.slice(4))}</h3>`;
        } else if (line.startsWith("## ")) {
            html += `<h2>${inlineDesigns(line.slice(3))}</h2>`;
        } else if (line.startsWith("# ")) {
            html += `<h1>${inlineDesigns(line.slice(2))}</h1>`;
        } else if (line.trim() === "") {
            html += "<br />";
        } else {
            html += `<p>${inlineDesigns(line)}</p>`;
        }
    }

    if (inList) {
        html += "</ul>";
    }
    if (inOrderedList) {
        html += "</ol>";
    }

    return html;
}

function inlineDesigns(text) {
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");    // tf does this do, inline suggestions doing whatever but it lowk seems to work
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    return text;
}

function ExportasMarkdown() {
    const text = editor.value;
    const blob = new Blob([text], {type: "text/markdown"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click()

    URL.revokeObjectURL(url);
}

importfile.addEventListener("change", async () => {
    const file = importfile.files[0];
    if (!file) return;

    const content = await file.text();
    editor.value = content;
    previewUpdate();
})

editor.addEventListener("input", previewUpdate);
editor.addEventListener("input", renderMarkdown);
exportbutton.addEventListener("click", ExportasMarkdown);
importbutton.addEventListener("click", () => importfile.click());


previewUpdate();
