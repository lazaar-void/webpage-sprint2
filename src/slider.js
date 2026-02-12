// slider.js

class TextSlider {
  constructor(data) {
    this.data = data;
    this.currentIndex = 0;

    // SÉLECTION : On récupère les éléments une seule fois
    this.dom = {
      container: document.getElementById("slider-content"),
      text: document.getElementById("slider-text"),
      title: document.getElementById("slider-title"),
      subtitle: document.getElementById("slider-subtitle"),
      prevBtn: document.getElementById("prev-btn"),
      nextBtn: document.getElementById("next-btn"),
    };

    // On lance les écouteurs et l'affichage initial
    this.init();
  }

  init() {
    // Si des éléments manquent, on arrête tout pour éviter les bugs
    if (!this.dom.container || !this.dom.text) return;

    this.updateContent();

    this.addEventListeners();
  }

  updateContent() {
    const item = this.data[this.currentIndex];

    // MANIPULATION : On change seulement le TEXTE, pas le HTML
    // Cela préserve vos classes Tailwind et icones s'il y en avait
    this.dom.text.textContent = `"${item.text}"`;
    this.dom.title.textContent = item.title;
    this.dom.subtitle.textContent = item.subtitle;
  }

  animateTransition() {
    // 1. Fade Out
    this.dom.container.style.opacity = "0";

    setTimeout(() => {
      // 2. Mise à jour du texte pendant que c'est invisible
      this.updateContent();

      // 3. Fade In
      this.dom.container.style.opacity = "1";
    }, 300); // Doit correspondre à duration-300 de Tailwind
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.data.length;
    this.animateTransition();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.data.length) % this.data.length;
    this.animateTransition();
  }

  addEventListeners() {
    if (this.dom.nextBtn) {
      this.dom.nextBtn.addEventListener("click", () => this.next());
    }
    if (this.dom.prevBtn) {
      this.dom.prevBtn.addEventListener("click", () => this.prev());
    }
  }
}

// --- DONNÉES & INITIALISATION ---

const sliderData = [
  {
    text: "Le design est l'intelligence rendue visible.",
    title: "Alina Wheeler",
    subtitle: "Auteure et Consultante",
  },
  {
    text: "La simplicité est la sophistication suprême.",
    title: "Léonard de Vinci",
    subtitle: "Artiste et Ingénieur",
  },
  {
    text: "Faites-le simple, mais significatif.",
    title: "Don Draper",
    subtitle: "Personnage Fictif",
  },
];

// On démarre le plugin une fois que la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  new TextSlider(sliderData);
});
