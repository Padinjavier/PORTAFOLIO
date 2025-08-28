// This file is intentionally left blank.
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".perfil-slider .perfil-img");
    let index = 0;

    setInterval(() => {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
    }, 3000); // cambia cada 3 segundos
});


document.addEventListener("DOMContentLoaded", () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});


// Proyectos
document.addEventListener("DOMContentLoaded", () => {
    const username = "Padinjavier";

    // 🔹 Lista de repos que SÍ quieres mostrar
    const reposPermitidos = [
        "API-RICK-AND-MORTY",
        "MediPie",
        "vivetuaventura",
        "market.v2",
        "market",
        "Portal_MDQ"
    ];

    // 🔹 Ruta de tu imagen fallback (sin rutas de C:)
    const fallbackImage = "./assets/images/proyectos/enproceso.png";

    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
        .then(async res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(async repos => {
            if (!Array.isArray(repos)) {
                console.error("La API no devolvió un array:", repos);
                return;
            }

            const container = document.getElementById("repos");
            const cols = 5;

            // 🔹 Filtrar solo los que estén en tu lista
            const reposFiltrados = repos.filter(repo =>
                reposPermitidos.includes(repo.name)
            );

            const fillerNeeded = (cols - (reposFiltrados.length % cols)) % cols;

            for (let repo of reposFiltrados) {
                const col = document.createElement("div");
                col.className = "col-md-4 d-flex justify-content-center"; // 👈 3 columnas

                const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/refs/heads/main/preview.png`;

                col.innerHTML = `
                    <div class="repo-card p-2 text-center card-proyect elevar-card">
                     <div>      
                        <img src="${imageUrl}" alt="${repo.name}" 
                            onerror="this.onerror=null;this.src='${fallbackImage}'" 
                            style="width:100%;max-width:350px;height:200px;object-fit:cover;border-radius:12px;">
                        <h6 class="mt-2">${repo.name}</h6>
                        <p class="text-muted">${repo.description || "Sin descripción"}</p>
                    </div>
                    <div>
                        <a href="${repo.html_url}" target="_blank">
                            <i class="bi bi-github fs-3"></i>
                        </a>
                    </div>
                    </div>
                    `;

                container.appendChild(col);
            }

            // 🔹 Rellenar espacios vacíos
            for (let i = 0; i < fillerNeeded; i++) {
                const col = document.createElement("div");
                col.className = "col d-flex justify-content-center";
                col.innerHTML = `<div class="repo-card" style="opacity:0;"></div>`;
                container.appendChild(col);
            }
        })
        .catch(err => console.error("Error al obtener repos:", err));
});
// End proyectos



document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.classList.toggle('active');
    });
});
