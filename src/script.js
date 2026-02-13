document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Mobile Menu Logic
  // ==========================================
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");

      const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", !isExpanded);
    });
  }

  // ==========================================
  // 2. Theme Toggle Logic (Consolidated)
  // ==========================================
  const themeToggleBtns = document.querySelectorAll(".theme-toggle");
  const htmlElement = document.documentElement;

  // Check saved preference on load
  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    htmlElement.classList.add("dark");
  } else {
    htmlElement.classList.remove("dark");
  }

  // Define toggle function
  const handleThemeToggle = () => {
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // Attach to all buttons
  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", handleThemeToggle);
  });

  // ==========================================
  // 4. Article Rendering Logic (Static + Load More)
  // ==========================================
  const articlesContainer = document.getElementById("articles-container");
  const articleTemplate = document.getElementById("article-template");
  const loadMoreBtn = document.getElementById("load-more-btn");
  let apiPage = 1;
  const MAX_PAGES = 3;

  // Initial Static Articles
  const initialArticles = [
    {
      category: "Technology",
      title: "The Future of AI",
      description:
        "Artificial Intelligence is evolving rapidly. Here is what you need to know about the latest GPT models.",
      image: "./resources/5-webp.webp",
      tag: "Trending",
    },
    {
      category: "Design",
      title: "Minimalism in 2024",
      description:
        "Why less is more, and how whitespace allows your content to breathe in modern web design.",
      image: "./resources/image-webp.webp",
      tag: "Hot Topic",
    },
    {
      category: "Coding",
      title: "Tailwind vs Bootstrap",
      description:
        "A deep dive into utility-first CSS frameworks and why they are taking over the frontend world.",
      image: "./resources/5-webp.webp",
      tag: "New",
    },
    {
      category: "New Trends",
      title: "New Post Title",
      description: "Discover the latest trends shaping the industry in 2024.",
      image: "./resources/image-webp.webp",
      tag: "Fresh",
    },
  ];

  // Helper Function to Render Articles
  function renderArticles(list) {
    if (!articlesContainer || !articleTemplate) return;

    list.forEach((article) => {
      const clone = articleTemplate.content.cloneNode(true);

      const img = clone.querySelector(".article-img");
      // Handle both local images and API placeholder logic
      img.src =
        article.image || `https://placehold.co/600x400?text=Post+${article.id}`;
      img.alt = article.title;

      clone.querySelector(".article-tag").textContent = article.tag || "New";
      clone.querySelector(".article-category").textContent =
        article.category || "General";
      clone.querySelector(".article-title").textContent = article.title;
      clone.querySelector(".article-desc").textContent =
        article.description || article.body; // API uses 'body', local uses 'description'

      articlesContainer.appendChild(clone);
    });
  }

  // Render Initial Articles
  renderArticles(initialArticles);

  // Fetch and Render More Articles on Button Click from API (REFACTORED FOR ERROR HANDLING)
  const ArticleConfig = {
    state: {
      currentPage: 1,
    },
    settings: {
      maxPages: 3,
      itemsPerPage: 3, // Remplace le '3' en dur
      apiUrl: "https://jsonplaceholder.typicode.com/posts",
      loadingText: "Chargement...",
      errorText: "Erreur de chargement",
      endText: "Plus d'articles",
    },
    dom: {
      btn: document.getElementById("load-more-btn"),
    },
  };

  // 2. LOGIQUE PRINCIPALE
  if (ArticleConfig.dom.btn) {
    ArticleConfig.dom.btn.addEventListener("click", () => {
      const { state, settings, dom } = ArticleConfig;
      const originalText = dom.btn.innerText;

      // UI : État de chargement
      dom.btn.innerText = settings.loadingText;
      dom.btn.disabled = true;

      // Construction dynamique de l'URL
      const url = `${settings.apiUrl}?_limit=${settings.itemsPerPage}&_page=${state.currentPage}`;

      fetch(url)
        .then((response) => {
          // CORRECTION : Vérification du statut HTTP (200-299)
          if (!response.ok) {
            // On lance une erreur pour passer directement au bloc .catch()
            throw new Error(`Erreur HTTP ! statut: ${response.status}`);
          }
          return response.json();
        })
        .then((posts) => {
          // 1. Rendu des articles
          if (posts.length > 0) {
            renderArticles(posts); // Fonction supposée existante
            state.currentPage++; // On incrémente la page APRES le succès
          }

          // 2. VÉRIFICATION DES LIMITES (Plus de valeurs en dur)
          const isMaxPagesReached = state.currentPage > settings.maxPages;
          const isEndOfList = posts.length < settings.itemsPerPage;

          if (isMaxPagesReached || isEndOfList) {
            disableLoadMoreButton(dom.btn, settings.endText);
          } else {
            // Reset du bouton
            dom.btn.innerText = originalText;
            dom.btn.disabled = false;
          }
        })
        .catch((error) => {
          console.error("Problème avec l'opération fetch :", error);

          // Gestion d'erreur visuelle pour l'utilisateur
          dom.btn.innerText = settings.errorText;
          dom.btn.classList.add("bg-red-500", "text-white"); // Exemple de style d'erreur

          // Optionnel : Réactiver le bouton après quelques secondes pour réessayer
          setTimeout(() => {
            dom.btn.disabled = false;
            dom.btn.innerText = originalText;
            dom.btn.classList.remove("bg-red-500", "text-white");
          }, 3000);
        });
    });
  }

  // 3. FONCTION UTILITAIRE (Pour garder le code principal propre)
  function disableLoadMoreButton(btn, text) {
    btn.innerText = text;
    btn.disabled = true;
    // Ajout des classes Tailwind pour l'état désactivé
    btn.classList.add(
      "bg-gray-300",
      "border-gray-300",
      "text-gray-500",
      "cursor-not-allowed",
    );
    btn.classList.remove(
      "hover:bg-brand-pink",
      "hover:text-white",
      "hover:-translate-y-1",
    );
  }

  // ==========================================
  // 5. Newsletter Validation Logic (Refactorisé)
  // ==========================================

  (() => {
    // IIFE pour isoler les variables et éviter les conflits
    const emailInput = document.getElementById("newsletter-input");
    const subscribeBtn = document.getElementById("subscribe-btn");
    const errorMsg = document.getElementById("newsletter-error");

    // Regex standard pour validation email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Fonction réutilisable pour gérer l'interface
    // state: 'error' | 'success' | 'reset'
    // message: Le texte à afficher (optionnel)
    const setNewsletterState = (state, message = "") => {
      if (!emailInput || !errorMsg) return;

      if (state === "error") {
        emailInput.classList.add("border-red-500", "focus:border-red-500"); // Ajout style erreur
        emailInput.classList.remove("border-gray-300"); // Retrait style par défaut si nécessaire
        errorMsg.textContent = message;
        errorMsg.classList.remove("hidden");
      } else {
        // Cas 'reset' ou 'success' : on nettoie
        emailInput.classList.remove("border-red-500", "focus:border-red-500");
        emailInput.classList.add("border-gray-300");
        errorMsg.classList.add("hidden");
      }
    };

    if (subscribeBtn && emailInput) {
      // 1. Validation au clic
      subscribeBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche le rechargement si c'est dans un <form>
        const email = emailInput.value.trim();

        if (!email) {
          setNewsletterState("error", "L'adresse email est requise.");
          return;
        }

        if (!emailPattern.test(email)) {
          setNewsletterState("error", "Format d'email invalide.");
          return;
        }

        // Succès
        setNewsletterState("success");
        emailInput.value = "";
        alert("Merci ! Vous êtes inscrit.");
      });

      // 2. Reset visuel quand l'utilisateur tape
      emailInput.addEventListener("input", () => {
        // On ne reset que si une erreur est actuellement affichée pour éviter des calculs inutiles
        if (!errorMsg.classList.contains("hidden")) {
          setNewsletterState("reset");
        }
      });

      // 3. Support de la touche Entrée
      emailInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          subscribeBtn.click();
        }
      });
    }
  })();

  // ==========================================
  // 6. Accordion Logic (using for FontAwesome)
  // ==========================================
  const accordionBtns = document.querySelectorAll(".accordion-btn");

  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;

      // TARGET THE ICON HERE (Changed 'svg' to 'i')
      const icon = btn.querySelector("i");

      // Check if open
      const isOpen =
        content.style.maxHeight && content.style.maxHeight !== "0px";

      // Close others
      accordionBtns.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.nextElementSibling.style.maxHeight = "0px";
          // Reset other icons
          otherBtn.querySelector("i").classList.remove("rotate-180");
        }
      });

      // Toggle current
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add("rotate-180");
      } else {
        content.style.maxHeight = "0px";
        icon.classList.remove("rotate-180");
      }

      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !isExpanded);
    });
  });
});
