//Hace que al seleccionar una opción del submenú se desplace de forma delicada hacía el contenido 

const links = document.querySelectorAll("nav a"); // incluye todos los links del menú
const sections = document.querySelectorAll(".menu-content");

links.forEach(link => {
  link.addEventListener("click", function(e) {
    // Solo aplicamos si es un enlace interno (que empieza con #)
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
        targetSection.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }
    }
  });
});


//Controla el carrusel, miniaturas y el modasl

// Carrusel
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

// Miniaturas -> panel grande
document.querySelectorAll('.carousel-item').forEach(item => {
  const mainImg = item.querySelector('.main-img');
  const mainVideo = item.querySelector('.main-video');

  item.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (thumb.tagName === 'IMG') {
        // Mostrar imagen
        mainImg.src = thumb.src;
        mainImg.style.display = 'block';
        mainVideo.style.display = 'none';
        mainVideo.pause();
      } else if (thumb.tagName === 'VIDEO') {
        // Mostrar video
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


//Le da sombra al header-->

  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });




//Adaptado a móvil

let lastScrollY = window.scrollY;
const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

// Detectar scroll en PC y móvil
window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // Bajando → ocultar
    header.classList.add("hidden");
  } else {
    // Subiendo → mostrar
    header.classList.remove("hidden");
  }
  lastScrollY = window.scrollY;
});

// Detectar si toca arriba (para móvil)
window.addEventListener("touchstart", (e) => {
  if (window.scrollY <= 0) {
    header.classList.remove("hidden");
  }
});

// Detectar movimiento del mouse arriba (solo PC)
document.addEventListener("mousemove", (e) => {
  if (e.clientY < 50) {
    header.classList.remove("hidden");
  }
});

// Toggle menú hamburguesa en móvil
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Submenú desplegable en móvil
document.querySelectorAll("nav ul li.dropdown > a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const parent = link.parentElement;
    parent.classList.toggle("active");
  });
});

