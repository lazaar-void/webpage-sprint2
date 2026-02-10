document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        // Toggle the hidden class to show/hide the menu
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex'); // Ensure it uses flexbox when visible
    });


    // --- Testimonial Slider Logic ---
    const testimonials = [
        {
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            author: "John Doe, CEO"
        },
        {
            text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            author: "Jane Smith, Designer"
        },
        {
            text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
            author: "Mike Johnson, Developer"
        }
    ];

    let currentIndex = 0;
    const contentDiv = document.getElementById('slider-content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function updateSlider() {
        // Simple fade effect
        contentDiv.style.opacity = '0';
        
        setTimeout(() => {
            contentDiv.innerHTML = `
                <p class="text-xl text-gray-600 italic leading-relaxed">
                    "${testimonials[currentIndex].text}"
                </p>
                <h4 class="font-bold text-brand-pink mt-6">- ${testimonials[currentIndex].author}</h4>
            `;
            contentDiv.style.opacity = '1';
        }, 200); // Wait for fade out before changing text
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    });
});

// 1. Your Data
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

// 2. The Render Function
const container = document.getElementById('articles-container');

const articlesHTML = articles.map(article => `
  <article class="bg-white shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col h-full overflow-hidden">
    
    <div class="h-48 bg-gray-200 w-full object-cover relative group shrink-0">
        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover">
        
        <span class="absolute -bottom-3 left-6 bg-brand-pink text-white text-xs font-bold px-3 py-1 uppercase tracking-wide shadow-sm">
            ${article.tag}
        </span>
    </div>

    <div class="p-6 pt-8 flex flex-col grow">
        
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            ${article.category}
        </h4>

        <h3 class="text-xl font-bold text-brand-dark mb-3 leading-tight">
            ${article.title}
        </h3>

        <p class="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-5">
            ${article.description}
        </p>

        <a href="#" class="mt-auto inline-block text-brand-dark font-bold text-sm border-b-2 border-brand-pink pb-0.5 hover:text-brand-pink transition-colors w-max">
            Read the Post
        </a>

    </div>
  </article>
`).join('');

// 3. Inject into DOM
container.innerHTML = articlesHTML;