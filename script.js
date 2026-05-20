document.addEventListener('DOMContentLoaded', () => {

    // --- Loading Screen ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5s delay to show loader

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.innerWidth >= 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding slight delay to outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        // Hover effects for cursor
        const hoverElements = document.querySelectorAll('a, button, input, textarea, .portfolio-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- Particles.js Initialization ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFD700" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#FFD700", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // --- Typed.js Initialization ---
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Graphic Designer',
                'Video Editor',
                'Digital Marketer',
                'Camera Operator'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }

    // --- Navbar Scroll Effect & Back to Top ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        } else {
            backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    let menuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        if (menuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // --- Stats Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000;
                const step = targetValue / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < targetValue) {
                        target.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.innerText = targetValue;
                    }
                };
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Skill Progress Bars Animation ---
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                // Initial width is 0 due to utility class, we will animate it
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // --- Portfolio Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-gold', 'text-dark');
                b.classList.add('border-surfaceLighter', 'text-gray-400');
                b.classList.remove('border-gold', 'bg-gold/10', 'text-gold');
            });
            
            // Add active class to clicked
            btn.classList.add('active', 'bg-gold/10', 'text-gold', 'border-gold');
            btn.classList.remove('border-surfaceLighter', 'text-gray-400');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- Testimonial Slider ---
    const slider = document.querySelector('.testimonial-slider');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slider && dots.length > 0) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Make it draggable
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            updateActiveDot();
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                const slideWidth = slider.clientWidth;
                slider.scrollTo({
                    left: index * slideWidth,
                    behavior: 'smooth'
                });
                
                dots.forEach(d => {
                    d.classList.remove('active', 'bg-gold');
                    d.classList.add('bg-surfaceLighter');
                });
                dot.classList.add('active', 'bg-gold');
                dot.classList.remove('bg-surfaceLighter');
            });
        });

        // Update dot on scroll end
        const updateActiveDot = () => {
            const index = Math.round(slider.scrollLeft / slider.clientWidth);
            if(dots[index]) {
                dots.forEach(d => {
                    d.classList.remove('active', 'bg-gold');
                    d.classList.add('bg-surfaceLighter');
                });
                dots[index].classList.add('active', 'bg-gold');
                dots[index].classList.remove('bg-surfaceLighter');
            }
        };

        slider.addEventListener('scroll', () => {
            // Using a simple debounce for performance
            clearTimeout(slider.scrollTimeout);
            slider.scrollTimeout = setTimeout(updateActiveDot, 100);
        });
    }

    // --- GSAP Scroll Animations ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Elements
        gsap.from('.hero-content > *', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 1.5 // After loader
        });

        gsap.from('.hero-image-container', {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
            delay: 1.8
        });

        // Section Headings
        gsap.utils.toArray('.section-heading').forEach(heading => {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 80%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        // About Image
        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: '.about-image',
                start: 'top 75%',
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 75%',
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Service Cards Stagger
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '#services',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            clearProps: 'all'
        });

        // Timeline Items
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '#resume',
                start: 'top 80%',
            },
            x: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            clearProps: 'all'
        });

        // Contact Form
        gsap.from('.contact-info > *', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            clearProps: 'all'
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'all'
        });
    }

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxContent = document.getElementById('lightbox-content');

    if (lightbox) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img').src;
                const title = item.querySelector('h3').innerText;
                const category = item.querySelector('span').innerText;

                lightboxImg.src = img;
                lightboxTitle.innerText = title;
                lightboxCategory.innerText = category;

                lightbox.classList.remove('opacity-0', 'pointer-events-none');
                setTimeout(() => {
                    lightboxContent.classList.remove('scale-95');
                    lightboxContent.classList.add('scale-100');
                }, 50);
            });
        });

        const closeLightbox = () => {
            lightboxContent.classList.remove('scale-100');
            lightboxContent.classList.add('scale-95');
            setTimeout(() => {
                lightbox.classList.add('opacity-0', 'pointer-events-none');
            }, 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Set Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

});
