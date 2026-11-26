async function fetchTeas() {
    const statusEl = document.getElementById("status");
    const tdata = document.querySelector("#teas-table tbody");

    try {
        statusEl.textContent = "Load data...";
        const res = await fetch("/teas");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const teas = await res.json();
        tdata.innerHTML = "";

        for (const tea of teas) {
            const tr = document.createElement("tr");
            const tdId = document.createElement("td");
            tdId.textContent = tea.id;
            const tdName = document.createElement("td");
            tdName.textContent = tea.name;
            const tdCategory = document.createElement("td");
            tdCategory.textContent = tea.category;
            tr.append(tdId, tdName, tdCategory);
            tdata.appendChild(tr);
        }

        statusEl.textContent = "Data loaded";
    }
    catch (err) {
        console.log(err);
        statusEl.textContent = "Error while loading data!";
    }
}


window.addEventListener("DOMContentLoaded", fetchTeas);