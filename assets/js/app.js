const CONFIG_PATH = "config/site-content.json";

const elements = {
  brandLogo: document.getElementById("brandLogo"),
  brandName: document.getElementById("brandName"),
  hotlineBtn: document.getElementById("hotlineBtn"),
  heroTitle: document.getElementById("heroTitle"),
  heroSubtitle: document.getElementById("heroSubtitle"),
  heroImage: document.getElementById("heroImage"),
  stats: document.getElementById("stats"),
  projectGrid: document.getElementById("projectGrid"),
  serviceGrid: document.getElementById("serviceGrid"),
  blogGrid: document.getElementById("blogGrid"),
  testimonialQuote: document.getElementById("testimonialQuote"),
  testimonialName: document.getElementById("testimonialName"),
  testimonialRole: document.getElementById("testimonialRole"),
  testimonialAvatar: document.getElementById("testimonialAvatar"),
  contactMap: document.getElementById("contactMap"),
  contactInfo: document.getElementById("contactInfo"),
  projectSearch: document.getElementById("projectSearch"),
  typeFilter: document.getElementById("typeFilter"),
  searchBtn: document.getElementById("searchBtn"),
  contactForm: document.getElementById("contactForm"),
  year: document.getElementById("year")
};

let projectCache = [];

const html = {
  stat: (item) => `
    <article class="stat">
      <strong>${item.value}</strong>
      <span>${item.label}</span>
    </article>`,
  project: (p) => `
    <article class="card">
      <img src="${p.image}" alt="${p.name}" />
      <div class="card-body">
        <span class="tag">${p.status}</span>
        <h3>${p.name}</h3>
        <p>${p.location}</p>
        <div class="meta">
          <span><strong>Loại hình:</strong> ${p.type}</span>
          <span><strong>Giá:</strong> ${p.price}</span>
          <span><strong>Diện tích:</strong> ${p.area}</span>
        </div>
      </div>
    </article>`,
  service: (s) => `
    <article class="card">
      <img src="${s.image}" alt="${s.title}" />
      <div class="card-body">
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    </article>`,
  blog: (b) => `
    <article class="card">
      <img src="${b.image}" alt="${b.title}" />
      <div class="card-body">
        <small>${b.date}</small>
        <h3>${b.title}</h3>
      </div>
    </article>`
};

function renderProjects(projects) {
  elements.projectGrid.innerHTML = projects.map(html.project).join("");
}

function applyFilters() {
  const keyword = elements.projectSearch.value.trim().toLowerCase();
  const selectedType = elements.typeFilter.value;

  const filtered = projectCache.filter((p) => {
    const hitKeyword = !keyword || `${p.name} ${p.location}`.toLowerCase().includes(keyword);
    const hitType = selectedType === "all" || p.type === selectedType;
    return hitKeyword && hitType;
  });

  renderProjects(filtered);
}

async function init() {
  const response = await fetch(CONFIG_PATH);
  const data = await response.json();

  elements.brandLogo.src = data.brand.logo;
  elements.brandName.textContent = data.brand.name;
  elements.hotlineBtn.textContent = `Hotline: ${data.brand.hotline}`;

  elements.heroTitle.textContent = data.hero.title;
  elements.heroSubtitle.textContent = data.hero.subtitle;
  elements.heroImage.src = data.hero.image;

  elements.stats.innerHTML = data.stats.map(html.stat).join("");

  projectCache = data.projects;
  renderProjects(projectCache);

  elements.serviceGrid.innerHTML = data.services.map(html.service).join("");
  elements.blogGrid.innerHTML = data.blogs.map(html.blog).join("");

  elements.testimonialQuote.textContent = `“${data.testimonial.quote}”`;
  elements.testimonialName.textContent = data.testimonial.name;
  elements.testimonialRole.textContent = data.testimonial.role;
  elements.testimonialAvatar.src = data.testimonial.avatar;

  elements.contactMap.src = data.contact.map;
  elements.contactInfo.textContent = `${data.contact.address} · ${data.contact.email}`;

  elements.year.textContent = new Date().getFullYear();

  elements.searchBtn.addEventListener("click", applyFilters);
  elements.typeFilter.addEventListener("change", applyFilters);
  elements.projectSearch.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      applyFilters();
    }
  });

  elements.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(elements.contactForm);
    const userName = formData.get("name") || "Quý khách";
    alert(`Cảm ơn ${userName}! Chúng tôi sẽ liên hệ trong ít phút.`);
    elements.contactForm.reset();
  });
}

init().catch((error) => {
  console.error("Không thể tải nội dung website:", error);
  document.body.innerHTML = "<h2 style='font-family:Arial;padding:20px'>Lỗi tải dữ liệu website. Vui lòng kiểm tra file config/site-content.json.</h2>";
});
