document.addEventListener('DOMContentLoaded', () => {

    const perPage = 9;
    let currentPage = 1;

    const tileContainer = document.getElementById("blogTiles");
    const paginationContainer = document.getElementById("pagination");
    const sidebarList = document.getElementById("sidebarList");
    const blogDetailContainer = document.getElementById("blogDetail");
    const homeSection = document.getElementById("home");
    const randomBlogBtn = document.getElementById("randomBlogBtn");
    const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
    const sidebar = document.getElementById("sidebar");

    function displayTiles() {
        if (!tileContainer) return;
        
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        tileContainer.innerHTML = blogs.slice(start, end).map((blog, index) => `
            <div class="tile" data-blog-index="${start + index}">
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
            </div>
        `).join("");
        renderPagination();
    }

    function showBlog(index) {
        if (!homeSection || !blogDetailContainer) return;

        homeSection.style.display = "none";
        blogDetailContainer.innerHTML = `
            <article>
                <h1>${blogs[index].title}</h1>
                <div>${blogs[index].description}</div>
                <button id="backToHomeBtn">← Back to Home</button>
            </article>
        `;
        blogDetailContainer.style.display = "block";
    }

    function goHome() {
        if (!homeSection || !blogDetailContainer) return;
        blogDetailContainer.style.display = "none";
        homeSection.style.display = "block";
    }

    function renderPagination() {
        if (!paginationContainer) return;

        const totalPages = Math.ceil(blogs.length / perPage);
        paginationContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.dataset.page = i;
            paginationContainer.appendChild(pageButton);
        }
    }

    // --- Event Listeners ---

    // For tiles and sidebar items
    document.body.addEventListener('click', (e) => {
        // Show blog from tile click
        if (e.target.closest('.tile')) {
            const index = e.target.closest('.tile').dataset.blogIndex;
            showBlog(index);
        }
        // Show blog from sidebar click
        if (e.target.closest('.sidebar-link')) {
            e.preventDefault();
            const index = e.target.closest('.sidebar-link').dataset.blogIndex;
            showBlog(index);
        }
        // Go back home
        if (e.target.id === 'backToHomeBtn') {
            goHome();
        }
        // Handle pagination
        if (e.target.closest('.pagination button')) {
            currentPage = e.target.dataset.page;
            displayTiles();
            window.scrollTo(0, 0);
        }
    });

    // Random blog button
    if (randomBlogBtn) {
        randomBlogBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * blogs.length);
            showBlog(randomIndex);
        });
    }
    
    // Sidebar toggle
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

    // --- Initial Load ---
    
    // Populate sidebar
    if (sidebarList) {
        blogs.forEach((blog, index) => {
            sidebarList.innerHTML += `<li><a href="#" class="sidebar-link" data-blog-index="${index}">${blog.title}</a></li>`;
        });
    }

    // Display initial tiles
    displayTiles();
});