// ----------------- SCROLL SUAVE Y SECCIÓN ACTIVA -----------------
const links = document.querySelectorAll("nav a"); // todos los links del menú
const sections = document.querySelectorAll(".menu-content");

links.forEach(link => {
  link.addEventListener("click", function(e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Elimina clase active de todas las secciones
        sections.forEach(sec => sec.classList.remove("active"));

        // Añade clase active a la sección seleccionada
        targetSection.classList.add("active");

        // Scroll suave hacia la sección
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // ----------------- CERRAR MENÚ EN MÓVIL -----------------
      const parentLi = link.parentElement;
      if (!parentLi.classList.contains("dropdown")) {
        nav.classList.remove("active");
      }
    }
  });
});

// ----------------- CARRUSEL -----------------
const track = document.querySelector(".carousel-track");
const items = Array.from(track.children);
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let currentIndex = 0;

function updateCarousel() {
  const width = items[0].getBoundingClientRect().width + 20;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < items.length - 1) { 
    currentIndex++; 
    updateCarousel(); 
  }
});
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) { 
    currentIndex--; 
    updateCarousel(); 
  }
});

// ----------------- MINIATURAS / PANEL GRANDE -----------------
document.querySelectorAll('.carousel-item').forEach(item => {
  const mainImg = item.querySelector('.main-img');
  const mainVideo = item.querySelector('.main-video');

  item.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (thumb.tagName === 'IMG') {
        mainImg.src = thumb.src;
        mainImg.style.display = 'block';
        mainVideo.style.display = 'none';
        mainVideo.pause();
      } else if (thumb.tagName === 'VIDEO') {
        const videoSrc = thumb.querySelector('source').src;
        mainVideo.querySelector('source').src = videoSrc;
        mainVideo.load();
        mainVideo.style.display = 'block';
        mainImg.style.display = 'none';
        mainVideo.play();
      }
    });
  });
});

// ----------------- SOMBRA HEADER -----------------
window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ----------------- HEADER OCULTAR / MOSTRAR -----------------
let lastScrollY = window.scrollY;
const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    header.classList.add("hidden"); // bajando → ocultar
  } else {
    header.classList.remove("hidden"); // subiendo → mostrar
  }

  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
    document.querySelectorAll("nav ul li.dropdown").forEach(drop => {
      drop.classList.remove("active");
    });
  }
  
  lastScrollY = window.scrollY;
});

window.addEventListener("touchstart", () => {
  if (window.scrollY <= 0) header.classList.remove("hidden");
});

document.addEventListener("mousemove", (e) => {
  if (e.clientY < 50) header.classList.remove("hidden");
});

// ----------------- MENÚ HAMBURGUESA -----------------
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Submenú desplegable en móvil
document.querySelectorAll("nav ul li.dropdown > a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();       // evitar comportamiento por defecto
    e.stopPropagation();      // que no afecte nav principal
    const submenu = link.nextElementSibling; // el ul.submenu
    if(submenu) submenu.classList.toggle("active"); // mostrar/ocultar
  });
});






