/* ===== PREMIUM GLOWING YELLOW PORTFOLIO - JAVASCRIPT ===== */

document.addEventListener("DOMContentLoaded", function () {
  /* ===== THEME VARIABLES ===== */
  const THEME_CONFIG = {
    colors: {
      primary: "#FFD700",
      primaryLight: "#FFEB3B",
      primaryDark: "#FFC107",
      secondary: "#FF8F00",
      accent: "#FFA726",
    },
    animations: {
      duration: 400,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  };

  /* ===== SMOOTH SCROLLING ===== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 90;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.backdropFilter = "blur(20px)";
      navbar.style.boxShadow = "0 4px 30px rgba(255, 215, 0, 0.2)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(255, 215, 0, 0.15)";
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  });

  /* ===== ACTIVE NAV LINK ===== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  /* ===== DARK MODE TOGGLE ===== */
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Load saved theme preference
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  updateThemeIcon(savedTheme === "dark");

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);
  });

  function updateThemeIcon(isDark) {
    if (themeIcon) {
      themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  }

  /* ===== TYPING ANIMATION ===== */
  const typedTextElement = document.getElementById("typed-text");
  const textArray = [
    "WordPress Development & ",
    "Premium Web Solutions & ",
    "E-commerce Excellence & ",
    "Digital Innovation & ",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = textArray[textIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
  }

  if (typedTextElement) {
    typeText();
  }

  /* ===== STATS COUNTER ===== */
  const statNumbers = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateStats();
      }
    });
  }, observerOptions);

  const statsContainer = document.querySelector(".stats-container");
  if (statsContainer) {
    statsObserver.observe(statsContainer);
  }

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      let count = 0;
      const increment = target / 100;
      const duration = 2000;
      const stepTime = duration / 100;

      const counter = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(count);
        }

        // Add glow effect during counting
        stat.style.textShadow = `0 0 20px ${THEME_CONFIG.colors.primary}`;
      }, stepTime);
    });
  }

  /* ===== PORTFOLIO FILTER ===== */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const categories = item.getAttribute("data-category") || "";

        if (filterValue === "all" || categories.includes(filterValue)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.transform = "scale(1)";
            item.style.opacity = "1";
          }, 100);
        } else {
          item.style.transform = "scale(0.8)";
          item.style.opacity = "0";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  /* ===== BACK TO TOP BUTTON ===== */
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* ===== ENHANCED CARD ANIMATIONS ===== */
  const cards = document.querySelectorAll(
    ".glass-card, .service-card, .pricing-card, .testimonial-card, .portfolio-item"
  );

  const cardObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
          entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  cards.forEach((card) => {
    cardObserver.observe(card);

    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px) scale(1.02)";
      this.style.boxShadow = `0 20px 50px rgba(255, 215, 0, 0.3)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 8px 32px rgba(255, 215, 0, 0.15)";
    });
  });

  /* ===== TECH STACK HOVER EFFECTS ===== */
  const techIcons = document.querySelectorAll(".tech-icon, .tech-icon-img");

  techIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      // Add individual glow colors for each tech
      const techClass = Array.from(this.classList).find((cls) =>
        ["html", "css", "js", "php", "wordpress", "react", "tailwind"].includes(
          cls
        )
      );

      const glowColors = {
        html: "#E34F26",
        css: "#1572B6",
        js: "#F7DF1E",
        php: "#777BB4",
        wordpress: "#21759B",
        react: "#61DAFB",
        tailwind: "#06B6D4",
      };

      if (techClass && glowColors[techClass]) {
        this.style.filter = `drop-shadow(0 0 20px ${glowColors[techClass]}) brightness(1.3)`;
      }
    });

    icon.addEventListener("mouseleave", function () {
      this.style.filter = `drop-shadow(0 0 12px ${THEME_CONFIG.colors.primary})`;
    });
  });

  /* ===== FORM ENHANCEMENTS ===== */
  const formInputs = document.querySelectorAll(".form-control, .modern-input");

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.borderColor = THEME_CONFIG.colors.primary;
      this.style.boxShadow = `0 0 20px rgba(255, 215, 0, 0.3)`;
      this.parentElement.style.transform = "translateY(-2px)";
    });

    input.addEventListener("blur", function () {
      this.style.borderColor = "rgba(255, 215, 0, 0.3)";
      this.style.boxShadow = "none";
      this.parentElement.style.transform = "translateY(0)";
    });
  });

  /* ===== PRICING CARD ENHANCEMENTS ===== */
  const pricingCards = document.querySelectorAll(".pricing-card");

  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("featured")) {
        this.style.transform = "translateY(-15px) scale(1.03)";
        this.style.boxShadow = `0 25px 60px rgba(255, 215, 0, 0.4)`;
      }
    });

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("featured")) {
        this.style.transform = "translateY(0) scale(1)";
        this.style.boxShadow = "0 8px 32px rgba(255, 215, 0, 0.15)";
      }
    });
  });

  /* ===== PORTFOLIO IMAGE SCROLL EFFECT ===== */
  const portfolioImages = document.querySelectorAll(".portfolio-image img");

  portfolioImages.forEach((img) => {
    const portfolioItem = img.closest(".portfolio-item");

    portfolioItem.addEventListener("mouseenter", function () {
      // Smooth scroll effect for tall images
      if (img.naturalHeight > img.clientHeight) {
        img.style.transform = "translateY(-30%) scale(1.05)";
        img.style.transition = "transform 3s ease-in-out";
      }
    });

    portfolioItem.addEventListener("mouseleave", function () {
      img.style.transform = "translateY(0) scale(1)";
      img.style.transition = "transform 0.6s ease";
    });
  });

  /* ===== TESTIMONIAL ENHANCED ANIMATIONS ===== */
  const testimonialCards = document.querySelectorAll(".testimonial-card");

  testimonialCards.forEach((card) => {
    const quote = card.querySelector(".fa-quote-left");

    card.addEventListener("mouseenter", function () {
      if (quote) {
        quote.style.transform = "scale(1.2) rotate(10deg)";
        quote.style.color = THEME_CONFIG.colors.primary;
      }
    });

    card.addEventListener("mouseleave", function () {
      if (quote) {
        quote.style.transform = "scale(1) rotate(0deg)";
      }
    });
  });

  /* ===== SOCIAL LINKS ENHANCED EFFECTS ===== */
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.1)";
      this.style.boxShadow = `0 15px 40px rgba(255, 215, 0, 0.4)`;
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 4px 20px rgba(255, 215, 0, 0.15)";
    });
  });

  /* ===== CONTACT ICONS PULSE EFFECT ===== */
  const contactIcons = document.querySelectorAll(".contact-icon");

  contactIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.animation = "pulse 0.6s ease-in-out infinite";
      this.style.boxShadow = `0 0 30px rgba(255, 215, 0, 0.6)`;
    });

    icon.addEventListener("mouseleave", function () {
      this.style.animation = "none";
      this.style.boxShadow = `0 0 15px rgba(255, 215, 0, 0.5)`;
    });
  });

  /* ===== ENHANCED BUTTON RIPPLE EFFECT ===== */
  const buttons = document.querySelectorAll(
    ".btn-modern, .btn-primary, .btn-outline"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  /* ===== PERFORMANCE OPTIMIZATIONS ===== */
  // Lazy loading for images
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  /* ===== SCROLL PROGRESS INDICATOR ===== */
  function updateScrollProgress() {
    const scrollProgress =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    document.documentElement.style.setProperty(
      "--scroll-progress",
      scrollProgress + "%"
    );
  }

  window.addEventListener("scroll", updateScrollProgress);
  updateScrollProgress();

  /* ===== ENHANCED LOADING ANIMATIONS ===== */
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all animatable elements
  const animateElements = document.querySelectorAll(
    "section, .glass-card, .service-card, .pricing-card, .portfolio-item, .testimonial-card"
  );
  animateElements.forEach((el) => observer.observe(el));

  /* ===== CONSOLE STYLING ===== */
  console.log(
    "%c🚀 Premium Glowing Yellow Portfolio Loaded! ✨",
    "color: #FFD700; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #FFD700;"
  );
  console.log(
    "%cDeveloped by Sowrav Hasan",
    "color: #FF8F00; font-size: 12px;"
  );
});

/* ===== CSS ANIMATIONS FOR JS ===== */
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes ripple {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        100% {
            opacity: 0;
            transform: scale(2);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.6);
        pointer-events: none;
        animation: ripple 0.6s linear;
    }

    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }

    .loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }

    /* Scroll progress bar */
    html::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: var(--scroll-progress, 0%);
        height: 4px;
        background: linear-gradient(90deg, #FFD700, #FF8F00);
        z-index: 10000;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }
`;
document.head.appendChild(style);
