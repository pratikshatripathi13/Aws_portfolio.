document.addEventListener('DOMContentLoaded', () => {
    /* ═══════════════════════════════════════════════
       1. PRELOADER
    ═══════════════════════════════════════════════ */
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); // Wait for transition
        }, 1200); // Artificial delay for premium feel
    }

    /* ═══════════════════════════════════════════════
       2. CUSTOM CURSOR
    ═══════════════════════════════════════════════ */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        // Position variables
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;

        // Listen for mouse moves
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot moves instantly
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Smooth outline animation loop (LERP)
        const animateCursor = () => {
            // Speed of the trailing effect (0.15 = smooth, 1 = instant)
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            // Apply to outline using transform for hardware acceleration
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effect for links and buttons
        const interactables = document.querySelectorAll('a, button, .btn-custom, .social-btn, .image-border, .filter-btn');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hovering');
                cursorDot.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hovering');
                cursorDot.classList.remove('hovering');
            });
        });
    }

    /* ═══════════════════════════════════════════════
       3. THEME TOGGLE
    ═══════════════════════════════════════════════ */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            
            // Save preference
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            
            // Update Icon
            themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        });
    }

    /* ═══════════════════════════════════════════════
       4. PROJECT FILTERING
    ═══════════════════════════════════════════════ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.featured-project');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (filterValue === 'all') {
                    project.style.display = 'grid';
                    setTimeout(() => project.style.opacity = '1', 50);
                } else if (project.getAttribute('data-category').includes(filterValue)) {
                    project.style.display = 'grid';
                    setTimeout(() => project.style.opacity = '1', 50);
                } else {
                    project.style.opacity = '0';
                    setTimeout(() => project.style.display = 'none', 300);
                }
            });
        });
    });

    /* ═══════════════════════════════════════════════
       5. AVATAR SPEECH BUBBLE LOGIC
    ═══════════════════════════════════════════════ */
    const speechBubble = document.getElementById('avatar-speech');
    
    if (speechBubble) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            
            if (scrollPos > 300 && scrollPos < 1200) {
                speechBubble.innerHTML = "I specialize in cloud computing and data analytics.";
            } else if (scrollPos >= 1200) {
                speechBubble.innerHTML = "Here's more about my background and skills!";
            } else {
                speechBubble.innerHTML = "Welcome to my digital workspace! 👋";
            }
        });
    }

});
