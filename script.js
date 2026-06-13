const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".section-heading, .intro-band span, .card, .project, .about, .contact-content, .contact-form");
const cards = document.querySelectorAll(".card");
const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  menuToggle.classList.remove("open");
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
};

const updateActiveLink = () => {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
};

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = `${event.clientX - rect.left}px`;
    const y = `${event.clientY - rect.top}px`;

    card.style.setProperty("--mouse-x", x);
    card.style.setProperty("--mouse-y", y);
  });
});

if (hero && heroBg && !reduceMotion.matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;

    heroBg.style.setProperty("--hero-shift-x", `${x}px`);
    heroBg.style.setProperty("--hero-shift-y", `${y}px`);
  });

  hero.addEventListener("pointerleave", () => {
    heroBg.style.setProperty("--hero-shift-x", "0px");
    heroBg.style.setProperty("--hero-shift-y", "0px");
  });
}

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveLink();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    closeMenu();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thanks. Your project brief is ready for review.";
  contactForm.reset();
});

updateHeader();
updateActiveLink();