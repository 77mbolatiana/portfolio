window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("done");
  }, 2000);
});

const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mouseX = 0,
  mouseY = 0,
  ringX = 0,
  ringY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

document
  .querySelectorAll("a, button, .project-card, .about-card, .tool-tag")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "16px";
      cursor.style.height = "16px";
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(201,168,76,0.8)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(201,168,76,0.5)";
    });
  });

const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
});

const revealEls = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => obs.observe(el));

const skillItems = document.querySelectorAll(".skill-item");
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        const fill = e.target.querySelector(".skill-fill");
        const width = e.target.dataset.width;
        setTimeout(() => (fill.style.width = width + "%"), 200);
        skillObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);
skillItems.forEach((el) => skillObs.observe(el));

const sections = document.querySelectorAll("[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + current ? "var(--gold)" : "";
  });
});

// Theme toggle (light / dark)
const themeToggle = document.getElementById("themeToggle");
function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
}
try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) applyTheme(savedTheme);
  else {
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark");
  }
} catch (e) {}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });
}
