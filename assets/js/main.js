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
  // ❌ No uses token si solo quieres repos públicos
  // const token = "ghp_xxx";

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
      const fillerNeeded = (cols - (repos.length % cols)) % cols;

      for (let repo of repos) {
        const col = document.createElement("div");
        col.className = "col d-flex justify-content-center";

        const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/preview.png`;

   console.log(imageUrl);
        col.innerHTML = `
          <div class="repo-card p-2 text-center">
            <img src="${imageUrl}" alt="${repo.name}" 
                 onerror="this.style.display='none'" 
                 style="width:200px;height:120px;object-fit:cover;border-radius:12px;">
            <h6 class="mt-2">${repo.name}</h6>
            
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