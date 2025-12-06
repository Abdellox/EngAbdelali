/**
 * CV Portfolio - Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const header = document.querySelector('#header');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      header.classList.toggle('mobile-nav-active');
    });
  }

  // Smooth scroll
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash !== '') {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
        }
      }
      if (header.classList.contains('mobile-nav-active')) {
        header.classList.remove('mobile-nav-active');
      }
    });
  });

  // Typewriter Effect
  const typedElement = document.getElementById('typed-text');
  if (typedElement) {
    const strings = ['Software Engineer', 'Full Stack Developer', 'Web Developer', 'Problem Solver'];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentString = strings[stringIndex];
      if (isDeleting) {
        typedElement.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedElement.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
      }
      let typeSpeed = isDeleting ? 50 : 100;
      if (!isDeleting && charIndex === currentString.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        typeSpeed = 500;
      }
      setTimeout(type, typeSpeed);
    }
    type();
  }

  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 1);
    } else {
      counter.innerText = target;
    }
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));

  // Skills Progress Bars
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('aria-valuenow') + '%';
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    skillsObserver.observe(skillsSection);
  }

  // Portfolio Filter
  const portfolioFilters = document.querySelectorAll('#portfolio-flters li');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      portfolioFilters.forEach(f => f.classList.remove('filter-active'));
      this.classList.add('filter-active');
      const filterValue = this.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Back to Top
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });
  
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const sentDiv = this.querySelector('.sent-message');
      if (sentDiv) {
        sentDiv.style.display = 'block';
        this.reset();
        setTimeout(() => sentDiv.style.display = 'none', 5000);
      }
    });
  }

  // Testimonials Carousel
  const testimonialsCarousel = document.querySelector('.testimonials-carousel');
  if (testimonialsCarousel) {
    const items = testimonialsCarousel.querySelectorAll('.testimonial-item');
    let current = 0;
    items.forEach((item, index) => {
      if (index !== 0) item.style.display = 'none';
    });
    setInterval(() => {
      items[current].style.display = 'none';
      current = (current + 1) % items.length;
      items[current].style.display = 'block';
    }, 5000);
  }

  // Active section highlighting
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      if (window.pageYOffset > sectionTop && window.pageYOffset <= sectionTop + section.offsetHeight) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
          link.parentElement.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.parentElement.classList.add('active');
          }
        });
      }
    });
  });

  console.log('CV Portfolio loaded - Pure Vanilla JS!');
});
