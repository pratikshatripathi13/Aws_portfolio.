document.addEventListener('DOMContentLoaded', () => {
    /* ═══════════════════════════════════════════════
       1. SPLASH SCREEN (PATH CHOICE)
    ═══════════════════════════════════════════════ */
    const splashScreen = document.getElementById('splash-screen');
    
    // Global path choice function
    window.choosePath = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('portfolio-theme', 'dark');
        }
        
        splashScreen.classList.add('hidden');
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    };

    /* Auto-dismiss DISABLED for review - Always show splash on load */
    /*
    if (localStorage.getItem('portfolio-theme')) {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved === 'light') document.body.classList.add('light-theme');
        splashScreen.style.display = 'none';
    }
    */
    
    // Smooth transition from saved theme if needed
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light') document.body.classList.add('light-theme');

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
       4. RESUME DROPDOWN TOGGLE
    ═══════════════════════════════════════════════ */
    const resumeBtn = document.querySelector('.btn-resume');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (resumeBtn && dropdownContent) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownContent.classList.toggle('show-dropdown');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!resumeBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.classList.remove('show-dropdown');
            }
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

    /* ═══════════════════════════════════════════════
       6. ROLE FADE ANIMATION (Instead of Typewriter)
    ═══════════════════════════════════════════════ */
    const typingText = document.getElementById('typing-text');
    const roles = ["Software Development", "Data Analysis", "AI Systems", "Cloud Engineering"];
    let roleIndex = 0;

    function nextRole() {
        if (!typingText) return;
        
        typingText.style.opacity = '0';
        
        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            typingText.textContent = roles[roleIndex];
            typingText.style.opacity = '1';
        }, 600);
    }

    if (typingText) {
        typingText.textContent = roles[0];
        setInterval(nextRole, 3000);
    }

});

function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = document.getElementById('submitBtn');
    if (!btn) return;
    
    const originalText = btn.innerHTML;

    // 1. Show Loading State
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" style="margin-left:8px;"></i>';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    // 2. Prepare Form Data
    const formData = new FormData(form);

    // 3. Real Submission to Formspree
    fetch('https://formspree.io/f/xeepqgjz', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // UI feedback for success
            btn.innerHTML = 'Message Sent Successfully! <i class="fas fa-check-circle" style="margin-left:8px;"></i>';
            btn.style.background = '#22c55e'; // Success Green
            btn.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.4)';
            btn.style.opacity = '1';
            form.reset();
        } else {
            throw new Error('Submission failed');
        }
    }).catch(error => {
        btn.innerHTML = 'Send Failed. Try again! <i class="fas fa-exclamation-triangle" style="margin-left:8px;"></i>';
        btn.style.background = '#ef4444'; // Error Red
    }).finally(() => {
        btn.disabled = false;
        // Reset button after a few seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'var(--gradient-primary)';
            btn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        }, 4000);
    });
}
