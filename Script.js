/* =========================================================
   PROJECT DATA
   Edit or extend this array to add, remove, or update projects.
   Each project renders as one card in the #project-grid.
========================================================= */
const PROJECTS = [
  {
    title: "Sales Performance Dashboard",
    category: "Excel & Data",
    description: "An interactive Excel dashboard designed to organise sales data and present key performance indicators through charts and visual reporting.",
    tools: "Microsoft Excel",
    link: "#"
  },
  {
    title: "Data Cleaning & Analysis",
    category: "Excel & Data",
    description: "A practical dataset-cleaning project demonstrating structured data organisation, formulas, filtering, sorting, and basic analysis.",
    tools: "Microsoft Excel",
    link: "#"
  },
  {
    title: "Responsive Personal Website",
    category: "Web Development",
    description: "A responsive website demonstrating clean HTML structure, CSS styling, responsive layouts, and modern web design principles.",
    tools: "HTML · CSS",
    link: "#"
  },
  {
    title: "Interactive Web Project",
    category: "Web Development",
    description: "A practical JavaScript project demonstrating interaction, dynamic content, and front-end programming fundamentals.",
    tools: "HTML · CSS · JavaScript",
    link: "#"
  },
  {
    title: "AI Prompt Engineering Project",
    category: "AI",
    description: "A practical exploration of prompt design and AI-assisted workflows for improving productivity and information-based tasks.",
    tools: "AI Tools · Prompt Engineering",
    link: "#"
  },
  {
    title: "Cinematic Video Edit",
    category: "Video Editing",
    description: "A cinematic video project demonstrating pacing, visual storytelling, transitions, and colour treatment.",
    tools: "Video Editing Software",
    link: "#"
  },
  {
    title: "Photography Collection",
    category: "Photography",
    description: "A curated collection focused on composition, lighting, perspective, and visual storytelling.",
    tools: "Photography",
    link: "#"
  }
];

/* =========================================================
   RENDER PROJECT CARDS
========================================================= */
function renderProjects(filter = "all"){
  const grid = document.getElementById("project-grid");
  if(!grid) return;

  grid.innerHTML = "";

  const items = filter === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  items.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    card.innerHTML = `
      <div class="project-thumb" data-cat="${project.category}"></div>
      <div class="project-body">
        <span class="project-cat">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p class="project-tools">${project.tools}</p>
        <a class="project-link" href="${project.link}">View Project →</a>
      </div>
    `;
    grid.appendChild(card);
  });

  observeReveals();
}

/* =========================================================
   PROJECT FILTERING
========================================================= */
function initFilters(){
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      renderProjects(btn.dataset.filter);
    });
  });
}

/* =========================================================
   MOBILE NAV
========================================================= */
function initNav(){
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if(!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================================
   SCROLL REVEAL
========================================================= */
let revealObserver;

function observeReveals(){
  const targets = document.querySelectorAll(".reveal:not(.is-visible)");
  if(!("IntersectionObserver" in window)){
    targets.forEach(t => t.classList.add("is-visible"));
    return;
  }
  if(!revealObserver){
    revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  }
  targets.forEach(t => revealObserver.observe(t));
}

function markSectionsForReveal(){
  document.querySelectorAll(".section-head, .service-row, .quality-item, .process-step, .timeline-item")
    .forEach(el => el.classList.add("reveal"));
}

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  initNav();
  initFilters();
  markSectionsForReveal();
  renderProjects();
  observeReveals();
});
