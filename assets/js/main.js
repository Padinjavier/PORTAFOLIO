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

// nav 
const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

const currentTheme = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", currentTheme);
toggleBtn.innerHTML = currentTheme === "light"
    ? "<i class='bi bi-moon-fill'></i>"
    : "<i class='bi bi-brightness-low-fill'></i>";

toggleBtn.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    toggleBtn.innerHTML = newTheme === "light"
        ? "<i class='bi bi-moon-fill'></i>"
        : "<i class='bi bi-brightness-low-fill'></i>";
});

// Detecta tema SO al inicio
if (!localStorage.getItem("theme")) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", prefersDark ? "dark" : "light");
}



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
                        <div class="img-wrapper">      
                            <img src="${imageUrl}" alt="${repo.name}" 
                                onerror="this.onerror=null;this.src='${fallbackImage}'" 
                                style="width:100%;max-width:350px;height:200px;object-fit:cover;border-radius:12px;">
                            <i class="bi bi-eye-fill view-image"></i>
                        </div>
                        <h6 class="mt-2">${repo.name}</h6>
                        <p class="text-muted">${repo.description || "Sin descripción"}</p>
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

    // 🔹 Modal
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImage");

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("view-image")) {
            const img = e.target.previousElementSibling;
            modalImg.src = img.src;
            modal.style.display = "flex";
        }
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
// End proyectos



document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.classList.toggle('active');
    });
});

// ===================== CARGA DE DATOS DINÁMICOS =====================

document.addEventListener("DOMContentLoaded", async () => {
    const contEdu = document.getElementById("educacion");
    const contCursos = document.getElementById("cursos");
    const contCert = document.getElementById("certificaciones");
    const contExp = document.querySelector(".timeline");

    try {
        const response = await fetch("assets/js/datos.json");
        const data = await response.json();

        const educacion = data.filter(i => i.tipo === "EDUCACION" && i.activo === "SI");
        const cursos = data.filter(i => i.tipo === "CURSO" && i.activo === "SI");
        const certificaciones = data.filter(i => i.tipo === "CERTIFICACION" && i.activo === "SI");
        const experiencia = data.filter(i => i.tipo === "EXPERIENCIA" && i.activo === "SI");

        const ordenar = arr => arr.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        ordenar(educacion); ordenar(cursos); ordenar(certificaciones); ordenar(experiencia);

        // ===================== EDUCACIÓN =====================
        educacion.forEach(edu => {
            const col = document.createElement("div");
            col.className = "col-md-6";

            const iconHTML = getIconHTML(edu);

            col.innerHTML = `
        <div class="edu-card">
          <div class="edu-icon">${iconHTML}</div>
          <div class="edu-info">
            <h5 class="mb-1">${edu.nombre_curso}</h5>
            <small class="text-muted">${edu.entidad} — ${new Date(edu.fecha).getFullYear()}</small>
          </div>
        </div>
      `;
            contEdu.appendChild(col);
        });

        // ===================== CURSOS =====================
        cursos.forEach(curso => {
            const col = document.createElement("div");
            col.className = "col-lg-4 col-md-6";

            const iconHTML = getIconHTML(curso);

            col.innerHTML = `
        <div class="curso-card">
          ${iconHTML}
          <div>${curso.nombre_curso}</div>
          <small class="text-muted d-block mt-1">${curso.entidad} — ${new Date(curso.fecha).getFullYear()}</small>
        </div>
      `;
            contCursos.appendChild(col);
        });

        // ===================== CERTIFICACIONES =====================
        certificaciones.forEach(cert => {
            const col = document.createElement("div");
            col.className = "col-lg-4 col-md-6";

            const iconHTML = getIconHTML(cert);

            col.innerHTML = `
        <div class="cert-card">
          ${iconHTML}
          <div>${cert.nombre_curso}</div>
          <small class="text-white d-block mt-1">${cert.entidad} — ${new Date(cert.fecha).getFullYear()}</small>
        </div>
      `;
            contCert.appendChild(col);
        });

        // ===================== EXPERIENCIA =====================
        experiencia.forEach(exp => {
            const item = document.createElement("div");
            item.className = "timeline-item";

            const iconHTML = getIconHTML(exp);

            item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card glass animate-in ms-2">
          <div class="timeline-meta">
            <span class="company" style="display:flex; align-items:center; gap:0.5rem;">
              ${iconHTML}${exp.entidad}
            </span>
            <span class="dates">${new Date(exp.fecha).getFullYear()}</span>
          </div>
          <h5 class="mb-2">${exp.nombre_curso}</h5>
          <p class="mb-0">${exp.icono}</p>
        </div>
      `;
            contExp.appendChild(item);
        });

    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
});

// Herramientas interactivas
function createParticles(container) {
    container.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const angle = (i / 12) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.animationDelay = `${i * 0.05}s`;
        container.appendChild(particle);
    }
}

document.querySelectorAll('.tool-card').forEach(card => {
    const particlesContainer = card.querySelector('.particles');
    
    card.addEventListener('click', () => {
        const wasActive = card.classList.contains('active');
        
        document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('active'));
        
        if (!wasActive) {
            card.classList.add('active');
            createParticles(particlesContainer);
        }
    });
});

// ===================== FUNCIÓN GLOBAL =====================
function getIconHTML(item) {
    // Prioridad 1: si tiene <i>, úsalo
    if (item.icono && item.icono.includes("<i")) {
        return item.icono;
    }
    // Prioridad 2: si tiene img, genera <img>
    if (item.img) {
        return `<img src="${item.img}" alt="${item.entidad}" class="logo-entidad">`;
    }
    // Prioridad 3: fallback genérico
    return `<i class="bi bi-building"></i>`;
}
