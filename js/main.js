

// ===== HEADER SCROLL =====
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 100);
  });
})();

// ===== MOBILE MENU =====
(function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const menuIcon = document.getElementById('menu-icon');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuIcon.className = 'fas fa-bars';
    });
  });
})();

// ===== SMOOTH SCROLL for anchor links =====
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// ===== INTERSECTION OBSERVER ANIMATIONS =====
(function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-80px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Stagger children observer
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.stagger-item');
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('visible'), i * 80);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-80px 0px' });

  document.querySelectorAll('.stagger-children').forEach(el => staggerObserver.observe(el));
})();

// ===== IMAGE SLIDER (vanilla) =====
function createSlider(containerEl, images, folder) {
  if (!images || images.length === 0) return;
  containerEl.classList.add('experience-image-slider');

  const sliderInner = document.createElement('div');
  sliderInner.className = 'slider-container';

  images.forEach((img, i) => {
    const image = document.createElement('img');
    image.src = `img/${img}`;
    image.alt = `slide ${i + 1}`;
    image.className = 'slider-image' + (i === 0 ? ' active' : '');
    sliderInner.appendChild(image);
  });

  containerEl.appendChild(sliderInner);

  if (images.length > 1) {
    let current = 0;
    const allImages = sliderInner.querySelectorAll('.slider-image');

    const prevBtn = document.createElement('button');
    prevBtn.className = 'prev-button';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'next-button';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

    function goTo(idx) {
      allImages[current].classList.remove('active');
      current = (idx + allImages.length) % allImages.length;
      allImages[current].classList.add('active');
    }

    prevBtn.addEventListener('click', (e) => { e.preventDefault(); goTo(current - 1); });
    nextBtn.addEventListener('click', (e) => { e.preventDefault(); goTo(current + 1); });

    containerEl.appendChild(prevBtn);
    containerEl.appendChild(nextBtn);
  }
}

// ===== RENDER PROJECTS =====
(function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  projectsList.forEach((project, i) => {
    const card = document.createElement('div');
    card.className = 'project-card stagger-item';

    // Image / Slider area
    const imageDiv = document.createElement('div');
    imageDiv.className = 'project-image';

    if (project.sliderImages && project.sliderImages.length > 0) {
      createSlider(imageDiv, project.sliderImages);
    }

    // Content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'project-content';
    contentDiv.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.shortDesc}</p>
      <a href="project-detail.html?id=${project.id}" class="project-link">Look Details →</a>
    `;

    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    grid.appendChild(card);
  });
})();

// ===== RENDER EXPERIENCE =====
(function renderExperience() {
  const list = document.getElementById('experience-list');
  if (!list) return;

  experiences.forEach((exp, i) => {
    const item = document.createElement('div');
    item.className = 'experience-item animate-on-scroll';
    item.style.transitionDelay = `${i * 0.1}s`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'experience-content';

    // Info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'experience-info';
    infoDiv.innerHTML = `
      <div class="experience-date">${exp.date}</div>
      <h3 class="experience-title"><i class="${exp.icon}"></i> ${exp.title}</h3>
      <div class="experience-company">${exp.company}</div>
      <p>${exp.description}</p>
    `;

    // Slider
    const sliderDiv = document.createElement('div');
    createSlider(sliderDiv, exp.images);

    contentDiv.appendChild(infoDiv);
    contentDiv.appendChild(sliderDiv);
    item.appendChild(contentDiv);
    list.appendChild(item);
  });

  // Re-observe experience items for scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-60px 0px' });

  list.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
})();

// ===== EMAIL CARD =====
(function initEmail() {
  const emailCard = document.getElementById('email-card');
  if (emailCard) {
    emailCard.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=adhenaufalpp@gmail.com', '_blank');
    });
  }
})();

// ===== FOOTER YEAR =====
(function setYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
