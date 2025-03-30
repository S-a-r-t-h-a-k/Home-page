document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
            document.body.classList.add('light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Toggle theme
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Initialize and set up event listeners
    initTheme();
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleTheme();
    }, {passive: false});

    // Lightbox functionality for logos
    document.querySelectorAll('.logo-item img').forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.justifyContent = 'center';
            lightbox.style.alignItems = 'center';
            lightbox.style.zIndex = '1000';
            
            const enlargedImg = new Image();
            enlargedImg.src = this.src;
            enlargedImg.style.maxHeight = '80vh';
            enlargedImg.style.maxWidth = '80vw';
            enlargedImg.style.objectFit = 'contain';
            
            lightbox.appendChild(enlargedImg);
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            document.body.appendChild(lightbox);
        });
    });
});