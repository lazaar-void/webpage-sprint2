document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Logic (Unchanged) ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex'); 
        });
    }

    // --- UPDATED Testimonial Slider Logic ---
    const testimonials = [
        {
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            subtitle: "Lorem Ipsum is",
            description: "It Is A Long Established Fact That A Read"
        },
        {
            text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            subtitle: "Why do we use it?",
            description: "The Point of Using Lorem Ipsum Is That It Has"
        },
        {
            text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
            subtitle: "Where does it come from?",
            description: "It Comes From Sections 1.10.32 and 1.10.33"
        }
    ];

    let currentIndex = 0;
    const contentDiv = document.getElementById('slider-content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function updateSlider() {
        if (!contentDiv) return;

        // Fade out
        contentDiv.style.opacity = '0';
        
        setTimeout(() => {
            // Update HTML to match the new design structure
            contentDiv.innerHTML = `
                <p class="text-xl md:text-2xl text-slate-700 italic leading-relaxed dark:text-gray-300 font-serif">
                    "${testimonials[currentIndex].text}"
                </p>

                <div class="mt-8 space-y-1">
                    <p class="text-pink-500 font-medium text-lg dark:text-pink-400">
                        ${testimonials[currentIndex].subtitle}
                    </p>
                    <p class="text-slate-900 font-medium text-lg dark:text-white">
                        ${testimonials[currentIndex].description}
                    </p>
                </div>
            `;
            // Fade in
            contentDiv.style.opacity = '1';
        }, 300); // Matches the duration-300 CSS class
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateSlider();
        });
    }
});

// --- Article Render Logic (Unchanged) ---
const articles = [
  {
    category: "Technology",
    title: "The Future of AI",
    description: "Artificial Intelligence is evolving rapidly. Here is what you need to know about the latest GPT models.",
    image: "https://placehold.co/600x400", 
    tag: "Trending"
  },
  {
    category: "Design",
    title: "Minimalism in 2024",
    description: "Why less is more, and how whitespace allows your content to breathe in modern web design.",
    image: "https://placehold.co/600x400",
    tag: "Hot Topic"
  },
  {
    category: "Coding",
    title: "Tailwind vs Bootstrap",
    description: "A deep dive into utility-first CSS frameworks and why they are taking over the frontend world.",
    image: "https://placehold.co/600x400",
    tag: "New"
  },
  {
    category: "New Trends",
    title: "New Post Title",
    description: "Discover the latest trends shaping the industry in 2024.",
    image: "https://placehold.co/600x400",
    tag: "Fresh"
  }
];

const container = document.getElementById('articles-container');

if (container) {
    const articlesHTML = articles.map(article => `
      <article class="bg-white shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col h-full overflow-hidden dark:bg-gray-700 dark:border-gray-600">
        
        <div class="h-48 bg-gray-200 w-full object-cover relative group shrink-0 dark:bg-gray-600">
            <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover">
            
            <span class="absolute -bottom-3 left-6 bg-brand-pink text-white text-xs font-bold px-3 py-1 uppercase tracking-wide shadow-sm dark:bg-pink-900 dark:text-gray-300">
                ${article.tag}
            </span>
        </div>

        <div class="p-6 pt-8 flex flex-col grow">
            
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                ${article.category}
            </h4>

            <h3 class="text-xl font-bold text-brand-dark mb-3 leading-tight dark:text-gray-300">
                ${article.title}
            </h3>

            <p class="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-5 dark:text-gray-400">
                ${article.description}
            </p>

            <a href="#" class="mt-auto inline-block text-brand-dark font-bold text-sm border-b-2 border-brand-pink pb-0.5 hover:text-brand-pink transition-colors w-max dark:text-gray-300 dark:border-gray-300">
                Read the Post
            </a>

        </div>
      </article>
    `).join('');
    
    container.innerHTML = articlesHTML;
}

// --- Theme Toggle Logic (Unchanged) ---
const toggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}