// ===== EXTRAORDINARY PORTFOLIO JAVASCRIPT =====
// Enhanced functionality with glowing purple theme and Space Grotesk font

document.addEventListener("DOMContentLoaded", function () {
  // ===== DARK MODE FUNCTIONALITY =====
  function initializeDarkMode() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    const themeIcon = document.getElementById("theme-icon");

    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      if (themeIcon) themeIcon.className = "fa-solid fa-sun";
    }
  }

  window.toggleDarkMode = function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    const themeIcon = document.getElementById("theme-icon");

    // Update icon with smooth transition
    if (themeIcon) {
      themeIcon.style.transform = "scale(0)";
      setTimeout(() => {
        themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        themeIcon.style.transform = "scale(1)";
      }, 150);
    }

    // Save preference
    localStorage.setItem("darkMode", isDark);
  };

  // ===== ENHANCED TYPING ANIMATION =====
  function initializeTypingAnimation() {
    const typedTextElement = document.getElementById("typed-text");
    if (!typedTextElement) return;

    const textArray = [
      "WordPress Developer",
      "WordPress Expert", 
      "Web Developer",
      "Website Designer",
      "Freelancer",
      "WooCommerce Developer",
      "UI/UX Designer",
      "SEO Specialist",
    ];
    let textArrayIndex = 0;
    let charIndex = 0;

    function typeText() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextElement.textContent +=
          textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
      } else {
        setTimeout(eraseText, 2000);
      }
    }

    function eraseText() {
      if (charIndex > 0) {
        typedTextElement.textContent = textArray[textArrayIndex].substring(
          0,
          charIndex - 1
        );
        charIndex--;
        setTimeout(eraseText, 50);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(typeText, 500);
      }
    }

    // Start typing animation
    setTimeout(typeText, 1000);
  }

  // ===== ENHANCED COUNTER ANIMATION =====
  function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current;

      // Add counting animation with glowing effect
      if (progress < 1) {
        element.classList.add("counting");
        element.style.color = "var(--primary)";
        element.style.textShadow = "var(--primary-glow)";
        window.requestAnimationFrame(step);
      } else {
        element.classList.remove("counting");
        element.style.color = "var(--primary)";
        element.style.textShadow = "var(--primary-glow)";

        // Add completion effect
        element.style.transform = "scale(1.1)";
        setTimeout(() => {
          element.style.transform = "scale(1)";
        }, 300);
      }
    };
    window.requestAnimationFrame(step);
  }

  // ===== INTERSECTION OBSERVER FOR COUNTERS =====
  function initializeCounters() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".stat-number");
          counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute("data-count")) || 0;
            // Stagger the animations for visual impact
            setTimeout(() => {
              animateCounter(counter, 0, target, 2000);
            }, index * 200);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe stats container
    const statsContainer = document.querySelector(".stats-container");
    if (statsContainer) {
      statsObserver.observe(statsContainer);
    }
  }

  // ===== PORTFOLIO FILTER FUNCTIONALITY =====
  function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update active button with glowing animation
        filterButtons.forEach((b) => {
          b.classList.remove("active");
          b.style.transform = "scale(1)";
          b.style.boxShadow = "";
        });

        btn.classList.add("active");
        btn.style.transform = "scale(1.05)";
        btn.style.boxShadow = "var(--primary-glow-hover)";

        setTimeout(() => {
          btn.style.transform = "scale(1)";
        }, 200);

        // Enhanced filter with staggered animations
        const filter = btn.dataset.filter;
        const items = document.querySelectorAll(".portfolio-item");

        items.forEach((item, index) => {
          if (filter === "all" || item.dataset.category.includes(filter)) {
            item.style.display = "block";
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";

            // Stagger the fade-in animation
            setTimeout(() => {
              item.style.transition = "all 0.5s ease-out";
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, index * 100);
          } else {
            item.style.transition = "all 0.3s ease-out";
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // ===== SMOOTH SCROLLING =====
  function initializeSmoothScrolling() {
    document
      .querySelectorAll('a[href^="#"]:not(.nav-link)')
      .forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });

            // Add glow animation to target section
            target.style.animation = "glow 0.6s ease-out";
            setTimeout(() => {
              target.style.animation = "";
            }, 600);
          }
        });
      });
  }

  // ===== ENHANCED NAVBAR SCROLL EFFECT =====
  function initializeNavbarEffects() {
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
      const currentScrollY = window.scrollY;
      const navbar = document.querySelector(".navbar");

      if (!navbar) return;

      // Enhanced navbar background based on scroll
      if (currentScrollY > 50) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(139, 92, 246, 0.2)";
        navbar.style.backdropFilter = "blur(20px)";
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "0 2px 10px rgba(139, 92, 246, 0.1)";
        navbar.style.backdropFilter = "blur(16px)";
      }

      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }

      lastScrollY = currentScrollY;

      // Dark mode navbar adjustments
      if (document.body.classList.contains("dark-mode")) {
        if (currentScrollY > 50) {
          navbar.style.background = "rgba(15, 23, 42, 0.98)";
          navbar.style.boxShadow = "0 2px 20px rgba(139, 92, 246, 0.3)";
        } else {
          navbar.style.background = "rgba(15, 23, 42, 0.95)";
          navbar.style.boxShadow = "0 2px 10px rgba(139, 92, 246, 0.2)";
        }
      }

      // Back to top button
      const backToTopBtn = document.getElementById("backToTop");
      if (backToTopBtn) {
        if (currentScrollY > 300) {
          backToTopBtn.classList.add("show");
        } else {
          backToTopBtn.classList.remove("show");
        }
      }

      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });
  }

  // ===== ACTIVE NAVIGATION SCROLL SPY =====
  function initializeScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll("section[id]");

    if (navLinks.length === 0 || sections.length === 0) return;

    // Define section groups - sections that should activate the same nav item
    const sectionGroups = {
      about: ["about", "wordpress", "stats-container"], // WordPress and stats go under About
      pricing: ["pricing"],
      services: ["services"],
      portfolio: ["portfolio"],
      testimonials: ["testimonials"],
      contact: ["contact"],
    };

    function updateActiveNav() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Special case: if near bottom of page, activate contact section
      if (scrollY + windowHeight >= docHeight - 100) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const lastNavLink = document.querySelector(
          '.nav-link[href="#contact"]'
        );
        if (lastNavLink) lastNavLink.classList.add("active");
        return;
      }

      // Find current section in view
      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150; // Offset for navbar height
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute("id");
        }
      });

      // Map current section to nav item using section groups
      let activeNavItem = "";
      for (const [navItem, sectionList] of Object.entries(sectionGroups)) {
        if (sectionList.includes(currentSection)) {
          activeNavItem = navItem;
          break;
        }
      }

      // Update active nav link
      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href").substring(1); // Remove # symbol
        if (href === activeNavItem) {
          link.classList.add("active");
        }
      });

      // Handle special case for home section at top
      if (scrollY < 100) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) homeLink.classList.add("active");
      }
    }

    // Add click handlers for nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all nav links
        navLinks.forEach((navLink) => navLink.classList.remove("active"));

        // Add active class to clicked link
        this.classList.add("active");

        // Smooth scroll to target section
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Add scroll listener for spy functionality
    let isScrolling = false;
    window.addEventListener("scroll", function () {
      if (!isScrolling) {
        window.requestAnimationFrame(function () {
          updateActiveNav();
          isScrolling = false;
        });
        isScrolling = true;
      }
    });

    // Initialize on page load
    updateActiveNav();
  }

  // ===== ENHANCED PORTFOLIO HOVER EFFECTS =====
  function initializePortfolioEffects() {
    document.querySelectorAll(".portfolio-item").forEach((item) => {
      const img = item.querySelector("img");

      item.addEventListener("mouseenter", function () {
        this.style.overflowY = "auto";
        this.style.boxShadow = "var(--primary-glow-hover)";
        this.style.borderColor = "var(--primary)";

        // Enhanced image animation
        if (img) {
          img.style.transition = "transform 0.5s ease-out";
          img.style.transform = "translateY(-30%) scale(1.05)";
        }
      });

      item.addEventListener("mouseleave", function () {
        this.style.overflowY = "hidden";
        this.style.boxShadow = "";
        this.style.borderColor = "transparent";
        this.scrollTop = 0;

        // Reset image position
        if (img) {
          img.style.transform = "translateY(0) scale(1)";
        }
      });

      // Enhanced scroll effect for portfolio items
      item.addEventListener("scroll", function () {
        if (img) {
          const scrollPercent =
            this.scrollTop / (this.scrollHeight - this.clientHeight);
          const translateY = scrollPercent * 40;
          img.style.transform = `translateY(-${translateY}%) scale(1.05)`;
        }
      });
    });
  }

  // ===== ENHANCED FORM FUNCTIONALITY =====
  function initializeContactForm() {
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Enhanced loading state
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        submitBtn.style.transform = "scale(0.95)";
        submitBtn.style.boxShadow = "var(--primary-glow)";

        // Add form glow effect
        this.style.boxShadow = "var(--primary-glow-hover)";
        this.style.borderColor = "var(--primary)";

        // Simulate form submission with enhanced feedback
        setTimeout(() => {
          submitBtn.innerHTML =
            '<i class="fas fa-check me-2"></i>Message Sent!';
          submitBtn.style.background = "var(--primary)";
          submitBtn.style.transform = "scale(1.05)";
          submitBtn.style.boxShadow = "var(--primary-glow-strong)";

          // Show success animation
          this.style.animation = "glow 0.6s ease-out";

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = "";
            submitBtn.style.transform = "scale(1)";
            submitBtn.style.boxShadow = "";
            this.style.animation = "";
            this.style.boxShadow = "";
            this.style.borderColor = "";
            this.reset();
          }, 2000);
        }, 1500);
      });
    }
  }

  // ===== ENHANCED PARALLAX EFFECT =====
  function initializeParallaxEffects() {
    let parallaxTicking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector(".hero-section");
      const parallaxSpeed = 0.3;

      // Removed hero section parallax effect to prevent unwanted scrolling animation
      // if (heroSection && scrolled < heroSection.offsetHeight) {
      //   heroSection.style.transform = `translateY(${
      //     scrolled * parallaxSpeed
      //   }px)`;
      // }

      // Parallax for background shapes with glowing effect
      const shapes = document.querySelectorAll(".hero-shape");
      shapes.forEach((shape, index) => {
        const speed = 0.1 + index * 0.05;
        const rotation = scrolled * 0.02;
        shape.style.transform = `translateY(${
          scrolled * speed
        }px) rotate(${rotation}deg)`;
        shape.style.boxShadow = `var(--primary-glow)`;
      });

      parallaxTicking = false;
    }

    window.addEventListener("scroll", function () {
      if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
      }
    });
  }

  // ===== ENHANCED TECH STACK TOOLTIPS =====
  function initializeTechStackEffects() {
    document.querySelectorAll(".tech-icon").forEach((icon) => {
      const tooltip = icon.getAttribute("data-tooltip");
      if (tooltip) {
        icon.title = tooltip;

        // Enhanced hover effect with glow
        icon.addEventListener("mouseenter", function () {
          this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          this.style.transform = "translateY(-5px) scale(1.1) rotate(5deg)";
          this.style.filter = "drop-shadow(var(--primary-glow-hover))";
          this.style.color = "var(--primary)";
        });

        icon.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0) scale(1) rotate(0deg)";
          this.style.filter = "drop-shadow(var(--primary-glow))";
          this.style.color = "";
        });
      }
    });
  }

  // ===== ENHANCED CARD ANIMATIONS =====
  function initializeCardAnimations() {
    // Pricing cards
    document.querySelectorAll(".pricing-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
        this.style.boxShadow = "var(--primary-glow-hover)";
        this.style.borderColor = "var(--primary)";
      });

      card.addEventListener("mouseleave", function () {
        if (!this.classList.contains("featured")) {
          this.style.transform = "translateY(0) scale(1)";
        } else {
          this.style.transform = "translateY(0) scale(1.05)";
        }
        this.style.boxShadow = "";
        this.style.borderColor = "";
      });
    });

    // Service cards
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px)";
        this.style.boxShadow = "var(--primary-glow-hover)";
        this.style.borderColor = "var(--primary)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "";
        this.style.borderColor = "";
      });
    });

    // Testimonial cards
    document.querySelectorAll(".testimonial-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
        this.style.boxShadow = "var(--primary-glow-hover)";
        this.style.borderColor = "var(--primary)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "";
        this.style.borderColor = "";
      });
    });
  }

  // ===== BACK TO TOP FUNCTIONALITY =====
  function initializeBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        // Add glow animation
        this.style.transform = "scale(0.8)";
        this.style.boxShadow = "var(--primary-glow-strong)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
          this.style.boxShadow = "var(--primary-glow)";
        }, 150);
      });
    }
  }

  // ===== FLOATING ELEMENTS =====
  function initializeFloatingElements() {
    const whatsappChat = document.querySelector(".whatsapp-chat");
    if (whatsappChat) {
      whatsappChat.addEventListener("click", function () {
        this.style.transform = "scale(0.9)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);
      });
    }

    const floatingContact = document.querySelector(".floating-contact");
    if (floatingContact) {
      floatingContact.addEventListener("click", function () {
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }

        this.style.transform = "translateX(-50%) scale(0.9)";
        setTimeout(() => {
          this.style.transform = "translateX(-50%) scale(1)";
        }, 150);
      });
    }
  }

  // ===== SECTION ANIMATIONS ON SCROLL =====
  function initializeSectionAnimations() {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.8s ease-out";
            entry.target.style.opacity = "1";

            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll(
              ".glass-card, .pricing-card, .testimonial-card, .service-card"
            );
            children.forEach((child, index) => {
              child.style.opacity = "0";
              child.style.transform = "translateY(20px)";
              setTimeout(() => {
                child.style.transition = "all 0.6s ease-out";
                child.style.opacity = "1";
                child.style.transform = "translateY(0)";
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    // Initialize all sections with initial opacity
    document.querySelectorAll("section").forEach((section) => {
      section.style.opacity = "0";
      sectionObserver.observe(section);
    });

    // Ensure first section is visible
    const firstSection = document.querySelector(".hero-section");
    if (firstSection) {
      firstSection.style.opacity = "1";
    }
  }

  // ===== MOBILE TOUCH INTERACTIONS =====
  function initializeMobileInteractions() {
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener(
      "touchstart",
      function (e) {
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      function (e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > swipeThreshold) {
        const floatingContact = document.querySelector(".floating-contact");
        if (floatingContact) {
          if (diff > 0) {
            // Swipe up - show floating contact button
            floatingContact.style.transform = "translateX(-50%) translateY(0)";
            floatingContact.style.opacity = "1";
          } else {
            // Swipe down - hide floating contact button
            floatingContact.style.transform =
              "translateX(-50%) translateY(100px)";
            floatingContact.style.opacity = "0";
          }
        }
      }
    }
  }

  // ===== ACCESSIBILITY ENHANCEMENTS =====
  function initializeAccessibility() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        document.body.classList.add("using-keyboard");
      }

      if (e.key === "Escape") {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    });

    document.addEventListener("mousedown", function () {
      document.body.classList.remove("using-keyboard");
    });
  }

  // ===== INITIALIZE ALL FUNCTIONS =====
  initializeDarkMode();
  initializeTypingAnimation();
  initializeCounters();
  initializePortfolioFilters();
  initializeSmoothScrolling();
  initializeNavbarEffects();
  initializeScrollSpy();
  initializePortfolioEffects();
  initializeContactForm();
  initializeParallaxEffects();
  initializeTechStackEffects();
  initializeCardAnimations();
  initializeBackToTop();
  initializeFloatingElements();
  initializeSectionAnimations();
  initializeMobileInteractions();
  initializeAccessibility();

  // ===== ENHANCED PORTFOLIO IMAGE SCROLL =====
  function initializePortfolioImageScroll() {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach((item) => {
      const img = item.querySelector(".portfolio-image img");
      if (!img) return;

      // Add smooth scroll behavior
      item.addEventListener("mouseenter", function () {
        // Calculate if image is larger than container
        const container = this.querySelector(".portfolio-image");
        const containerHeight = container.offsetHeight;

        // Load image to get natural dimensions
        const tempImg = new Image();
        tempImg.onload = function () {
          const aspectRatio = tempImg.naturalWidth / tempImg.naturalHeight;
          const scaledHeight = container.offsetWidth / aspectRatio;

          if (scaledHeight > containerHeight) {
            // Image is taller than container, enable scroll
            img.style.transform = `translateY(calc(-100% + ${containerHeight}px)) scale(1.02)`;
            img.style.transition = "transform 3s ease-in-out";
          } else {
            // Image fits in container, just scale
            img.style.transform = "scale(1.1)";
            img.style.transition = "transform 0.8s ease-in-out";
          }
        };
        tempImg.src = img.src;
      });

      item.addEventListener("mouseleave", function () {
        img.style.transform = "translateY(0) scale(1)";
        img.style.transition = "transform 0.8s ease-in-out";
      });
    });
  }

  // ===== BUTTON TEXT VISIBILITY FIX =====
  function fixButtonTextVisibility() {
    // Force button text visibility
    const buttons = document.querySelectorAll(
      '.btn-modern, .btn-primary, .btn-outline, button[type="submit"]'
    );

    buttons.forEach((button) => {
      // Ensure text is visible
      button.style.color = button.classList.contains("btn-outline")
        ? "var(--primary)"
        : "white";

      // Add event listeners to maintain color
      button.addEventListener("mouseenter", function () {
        if (this.classList.contains("btn-outline")) {
          this.style.color = "white";
        } else {
          this.style.color = "white";
        }
      });

      button.addEventListener("mouseleave", function () {
        if (this.classList.contains("btn-outline")) {
          this.style.color = "var(--primary)";
        } else {
          this.style.color = "white";
        }
      });
    });
  }

  // Add to initialization
  initializePortfolioImageScroll();
  fixButtonTextVisibility();

  // Add navbar transition
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  console.log("🚀 Extraordinary Purple Portfolio Loaded Successfully!");
  console.log("✨ Space Grotesk font and glowing purple theme active!");
  console.log("🎯 All animations and interactions ready!");
  console.log("📷 Enhanced portfolio image scroll active!");
});

// ===== ERROR HANDLING =====
window.addEventListener("error", function (e) {
  console.warn("Non-critical error handled gracefully:", e.error);
  return true;
});

// ===== PERFORMANCE MONITORING =====
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(() => {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`🎯 Page loaded in ${loadTime}ms with extraordinary design!`);
    }, 0);
  });
}
