const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

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

    if (inList) {
      html += "</ul>";
      inList = false;
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

  return html;
}

function inlineDesigns(text) {
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");    // tf does this do, inline suggestions doing whatever but it lowk seems to work
    return text;
}

editor.addEventListener("input", previewUpdate);
editor.addEventListener("input", renderMarkdown);

previewUpdate();
