// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Send email function
function sendEmail() {
    // Open Gmail compose in browser
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=adhenaufalpp@gmail.com', '_blank');
}

function animateShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        const amplitude = 20 + (index * 10);
        let time = 0;

        function animate() {
            time += speed;
            const x = Math.sin(time * 0.01) * amplitude;
            const y = Math.cos(time * 0.008) * amplitude;
            shape.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(animate);
        }
        animate();   
    });
}

// Particle animation
function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.3 + (index * 0.1);
        let time = 0;

        function animate() {
            time += speed;
            const x = Math.sin(time * 0.02 + index) * 50;
            const y = Math.cos(time * 0.015 + index) * 50;
            particle.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.experience-image-slider').forEach(sliderWrapper => {
        const images = Array.from(sliderWrapper.querySelectorAll('.slider-image'));
        const prevButton = sliderWrapper.querySelector('.prev-button');
        const nextButton = sliderWrapper.querySelector('.next-button');
        let currentIndex = 0;

        if (!images.length || !prevButton || !nextButton) return;

        if (images.length > 1) {
            const showImage = (index) => {
                images.forEach((img, i) => {
                    if (i === index) {
                        img.classList.add('active');
                        img.style.display = 'block';
                    } else {
                        img.classList.remove('active');
                        img.style.display = 'none';
                    }
                });
            };

            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                showImage(currentIndex);
            });

            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                showImage(currentIndex);
            });

            showImage(currentIndex);

            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        } else {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            if (images[0]) {
                images[0].classList.add('active');
                images[0].style.display = 'block';
            }
        }
    });

    animateShapes();
    animateParticles();
});
