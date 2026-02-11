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
const template = document.getElementById('article-template');

if (container && template) {
    // Clear container just in case
    container.innerHTML = '';

    articles.forEach(article => {
        // Clone the template content
        const clone = template.content.cloneNode(true);

        // Find elements inside the clone and inject data
        const img = clone.querySelector('.article-img');
        img.src = article.image;
        img.alt = article.title;

        clone.querySelector('.article-tag').textContent = article.tag;
        clone.querySelector('.article-category').textContent = article.category;
        clone.querySelector('.article-title').textContent = article.title;
        clone.querySelector('.article-desc').textContent = article.description;

        // Append the populated clone to the container
        container.appendChild(clone);
    });
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

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('newsletter-input');
    const subscribeBtn = document.getElementById('subscribe-btn');
    const errorMsg = document.getElementById('newsletter-error');

    // Simple Email Regex (Checks for text + @ + text + . + text)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (subscribeBtn && emailInput) {

        emailInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Stops the form from refreshing the page
                subscribeBtn.click(); // Programmatically clicks the button
            }
        });
        
        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();

            if (emailPattern.test(email)) {
                // SUCCESS CASE
                // 1. Clear errors
                emailInput.classList.remove('border-red-500');
                errorMsg.classList.add('hidden');
                
                // 2. Show success (You can replace this with a modal or toast)
                alert("Success! You have subscribed.");
                emailInput.value = ''; // Clear input

            } else {
                // ERROR CASE
                // 1. Make border red
                emailInput.classList.add('border-red-500');
                
                // 2. Show error message
                errorMsg.classList.remove('hidden');
            }
        });

        // Optional: Clear error when user starts typing again
        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('border-red-500')) {
                emailInput.classList.remove('border-red-500');
                errorMsg.classList.add('hidden');
            }
        });
    }
});
