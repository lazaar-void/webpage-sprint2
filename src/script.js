document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Menu Logic
    // ==========================================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex'); 
        });
    }

    // ==========================================
    // 2. Theme Toggle Logic (Consolidated)
    // ==========================================
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved preference on load
    if (localStorage.getItem("theme") === "dark" || 
       (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        htmlElement.classList.add("dark");
    } else {
        htmlElement.classList.remove("dark");
    }

    // Define toggle function
    const handleThemeToggle = () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Attach to all buttons
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', handleThemeToggle);
    });

    // ==========================================
    // 3. Testimonial Slider Logic
    // ==========================================
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

        contentDiv.style.opacity = '0';
        
        setTimeout(() => {
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
            contentDiv.style.opacity = '1';
        }, 300);
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

    // ==========================================
    // 4. Article Rendering Logic (Static + Load More)
    // ==========================================
    const articlesContainer = document.getElementById('articles-container');
    const articleTemplate = document.getElementById('article-template');
    const loadMoreBtn = document.getElementById('load-more-btn');
    let apiPage = 1;
    const MAX_PAGES = 3;

    // Initial Static Articles
    const initialArticles = [
        {
            category: "Technology",
            title: "The Future of AI",
            description: "Artificial Intelligence is evolving rapidly. Here is what you need to know about the latest GPT models.",
            image: "./resources/5-webp.webp", 
            tag: "Trending"
        },
        {
            category: "Design",
            title: "Minimalism in 2024",
            description: "Why less is more, and how whitespace allows your content to breathe in modern web design.",
            image: "./resources/image-webp.webp",
            tag: "Hot Topic"
        },
        {
            category: "Coding",
            title: "Tailwind vs Bootstrap",
            description: "A deep dive into utility-first CSS frameworks and why they are taking over the frontend world.",
            image: "./resources/5-webp.webp",
            tag: "New"
        },
        {
            category: "New Trends",
            title: "New Post Title",
            description: "Discover the latest trends shaping the industry in 2024.",
            image: "./resources/image-webp.webp",
            tag: "Fresh"
        }
    ];

    // Helper Function to Render Articles
    function renderArticles(list) {
        if (!articlesContainer || !articleTemplate) return;

        list.forEach(article => {
            const clone = articleTemplate.content.cloneNode(true);

            const img = clone.querySelector('.article-img');
            // Handle both local images and API placeholder logic
            img.src = article.image || `https://placehold.co/600x400?text=Post+${article.id}`;
            img.alt = article.title;

            clone.querySelector('.article-tag').textContent = article.tag || "New";
            clone.querySelector('.article-category').textContent = article.category || "General";
            clone.querySelector('.article-title').textContent = article.title;
            clone.querySelector('.article-desc').textContent = article.description || article.body; // API uses 'body', local uses 'description'

            articlesContainer.appendChild(clone);
        });
    }

    // Render Initial Articles
    renderArticles(initialArticles);

    // Load More Button Logic (Fetch from API)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const originalText = loadMoreBtn.innerText;
            loadMoreBtn.innerText = 'Loading...';
            loadMoreBtn.disabled = true;

            fetch(`https://jsonplaceholder.typicode.com/posts?_limit=3&_page=${apiPage}`)
                .then(response => response.json())
                .then(posts => {
                    // 1. Check if the API actually gave us data
                    if (posts.length > 0) {
                        renderArticles(posts);
                        apiPage++;
                    }

                    // 2. CHECK LIMIT: 
                    // Stop if we reached MAX_PAGES OR if API returned fewer items than requested (end of list)
                    if (apiPage > MAX_PAGES || posts.length < 3) {
                        loadMoreBtn.innerText = 'No More Articles';
                        loadMoreBtn.disabled = true;
                        loadMoreBtn.classList.add('bg-gray-300', 'border-gray-300', 'text-gray-500', 'cursor-not-allowed'); // Optional styling
                        loadMoreBtn.classList.remove('hover:bg-brand-pink', 'hover:text-white');
                    } else {
                        // Reset button if we are allowed to load more
                        loadMoreBtn.innerText = originalText;
                        loadMoreBtn.disabled = false;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    loadMoreBtn.innerText = 'Error loading';
                });
        });
    }

    // ==========================================
    // 5. Newsletter Validation Logic
    // ==========================================
    const emailInput = document.getElementById('newsletter-input');
    const subscribeBtn = document.getElementById('subscribe-btn');
    const errorMsg = document.getElementById('newsletter-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (subscribeBtn && emailInput) {
        // Trigger on Enter key
        emailInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                subscribeBtn.click();
            }
        });

        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();

            if (emailPattern.test(email)) {
                // Success
                emailInput.classList.remove('border-red-500');
                errorMsg.classList.add('hidden');
                alert("Success! You have subscribed.");
                emailInput.value = ''; 
            } else {
                // Error
                emailInput.classList.add('border-red-500');
                errorMsg.classList.remove('hidden');
            }
        });

        // Clear error on typing
        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('border-red-500')) {
                emailInput.classList.remove('border-red-500');
                errorMsg.classList.add('hidden');
            }
        });
    }

    // ==========================================
    // 6. Accordion Logic (using for FontAwesome)
    // ==========================================
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            
            // TARGET THE ICON HERE (Changed 'svg' to 'i')
            const icon = btn.querySelector('i'); 

            // Check if open
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

            // Close others
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.nextElementSibling.style.maxHeight = '0px';
                    // Reset other icons
                    otherBtn.querySelector('i').classList.remove('rotate-180');
                }
            });

            // Toggle current
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.add('rotate-180');
            } else {
                content.style.maxHeight = '0px';
                icon.classList.remove('rotate-180');
            }
        });
    });
});
