// ===== ENHANCED PORTFOLIO JAVASCRIPT =====
// Modern, comprehensive JavaScript functionality for enhanced user experience

// ===== ENHANCED DARK MODE FUNCTIONALITY =====
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  const themeIcon = document.getElementById("theme-icon");

  // Update icon with smooth transition
  themeIcon.style.transform = "scale(0)";
  setTimeout(() => {
    if (isDark) {
      themeIcon.className = "fa-solid fa-sun";
    } else {
      themeIcon.className = "fa-solid fa-moon";
    }
    themeIcon.style.transform = "scale(1)";
  }, 150);

  // Save preference with animation feedback
  localStorage.setItem("darkMode", isDark);

  // Provide visual feedback
  const body = document.body;
  body.style.transition = "all 0.3s ease-out";
}

// Load dark mode preference on page load
document.addEventListener("DOMContentLoaded", function () {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  const themeIcon = document.getElementById("theme-icon");

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    if (themeIcon) themeIcon.className = "fa-solid fa-sun";
  }
});

// ===== ENHANCED ANIMATED COUNTER FUNCTIONALITY =====
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current;

    // Add counting animation with visual feedback
    if (progress < 1) {
      element.classList.add("counting");
      element.style.color = "var(--primary)";
      window.requestAnimationFrame(step);
    } else {
      element.classList.remove("counting");
      element.style.color = "";

      // Add completion effect with scale animation
      element.style.transform = "scale(1.1)";
      element.style.color = "var(--accent)";
      setTimeout(() => {
        element.style.transform = "scale(1)";
        element.style.color = "";
      }, 300);
    }
  };
  window.requestAnimationFrame(step);
}

// Enhanced Intersection Observer for counter animation
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
        // Stagger the animations for better visual impact
        setTimeout(() => {
          animateCounter(counter, 0, target, 2000);
        }, index * 200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// ===== ENHANCED PORTFOLIO FILTER FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button with enhanced animation
      filterButtons.forEach((b) => {
        b.classList.remove("active");
        b.style.transform = "scale(1)";
        b.style.boxShadow = "";
      });

      btn.classList.add("active");
      btn.style.transform = "scale(1.05)";
      btn.style.boxShadow = "0 4px 15px rgba(99, 102, 241, 0.3)";

      setTimeout(() => {
        btn.style.transform = "scale(1)";
      }, 200);

      // Enhanced filter with staggered animations
      const filter = btn.dataset.filter;
      const items = document.querySelectorAll(".portfolio-item");

      // First hide all items with fade out
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
});

// ===== ENHANCED SMOOTH SCROLLING =====
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Add pulse animation to target section
        target.style.animation = "pulse 0.6s ease-out";
        setTimeout(() => {
          target.style.animation = "";
        }, 600);
      }
    });
  });
});

// ===== ENHANCED NAVBAR SCROLL EFFECT =====
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
  const currentScrollY = window.scrollY;
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  // Enhanced navbar background based on scroll
  if (currentScrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
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
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.95)";
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

// ===== ENHANCED TYPING ANIMATION =====
const typedTextElement = document.getElementById("typed-text");
const textArray = [
  "WordPress Expert",
  "Web Developer",
  "UI/UX Designer",
  "Problem Solver",
  "Digital Innovator",
];
let textArrayIndex = 0;
let charIndex = 0;

function typeText() {
  if (!typedTextElement) return;

  if (charIndex < textArray[textArrayIndex].length) {
    typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100);
  } else {
    setTimeout(eraseText, 2000);
  }
}

function eraseText() {
  if (!typedTextElement) return;

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

// ===== BACK TO TOP FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Add click animation
      this.style.transform = "scale(0.8)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  }
});

// ===== ENHANCED PORTFOLIO HOVER EFFECTS =====
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const img = item.querySelector("img");

    item.addEventListener("mouseenter", function () {
      this.style.overflowY = "auto";
      // Enhanced image animation with smooth transition
      if (img) {
        img.style.transition = "transform 0.5s ease-out";
        img.style.transform = "translateY(-50%) scale(1.1)";
      }
    });

    item.addEventListener("mouseleave", function () {
      this.style.overflowY = "hidden";
      this.scrollTop = 0;
      // Reset image position with smooth transition
      if (img) {
        img.style.transform = "translateY(0) scale(1)";
      }
    });

    // Enhanced scroll effect for portfolio items
    item.addEventListener("scroll", function () {
      if (img) {
        const scrollPercent =
          this.scrollTop / (this.scrollHeight - this.clientHeight);
        const translateY = scrollPercent * 30; // Adjust this value for scroll speed
        img.style.transform = `translateY(-${translateY}%) scale(1.1)`;
      }
    });
  });
});

// ===== ENHANCED FORM FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Enhanced loading state with animation
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      submitBtn.disabled = true;
      submitBtn.style.transform = "scale(0.95)";

      // Add form submission animation
      this.style.filter = "brightness(0.9)";

      // Simulate form submission with enhanced feedback
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        submitBtn.style.background = "var(--accent)";
        submitBtn.style.transform = "scale(1.05)";

        // Show success animation
        this.style.animation = "pulse 0.6s ease-out";
        this.style.filter = "";

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
          submitBtn.style.transform = "scale(1)";
          this.style.animation = "";
          this.reset();

          // Add completion effect
          this.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0.3)";
          setTimeout(() => {
            this.style.boxShadow = "";
          }, 1000);
        }, 2000);
      }, 1500);
    });
  }
});

// ===== ENHANCED PARALLAX EFFECT =====
let parallaxTicking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector(".hero-section");
  const parallaxSpeed = 0.3;

  if (heroSection && scrolled < heroSection.offsetHeight) {
    heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }

  // Parallax for background shapes with different speeds
  const shapes = document.querySelectorAll(
    ".hero-shape-1, .hero-shape-2, .hero-shape-3"
  );
  shapes.forEach((shape, index) => {
    const speed = 0.1 + index * 0.05;
    const rotation = scrolled * 0.02;
    shape.style.transform = `translateY(${
      scrolled * speed
    }px) rotate(${rotation}deg)`;
  });

  parallaxTicking = false;
}

window.addEventListener("scroll", function () {
  if (!parallaxTicking) {
    requestAnimationFrame(updateParallax);
    parallaxTicking = true;
  }
});

// ===== ENHANCED TECH STACK TOOLTIPS =====
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".tech-icon").forEach((icon) => {
    const tooltip = icon.getAttribute("data-tooltip");
    if (tooltip) {
      icon.title = tooltip;

      // Enhanced hover effect with rotation and glow
      icon.addEventListener("mouseenter", function () {
        this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        this.style.transform = "translateY(-5px) scale(1.1) rotate(5deg)";
        this.style.boxShadow = "0 10px 20px rgba(99, 102, 241, 0.3)";
        this.style.filter = "brightness(1.1)";
      });

      icon.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1) rotate(0deg)";
        this.style.boxShadow = "";
        this.style.filter = "";
      });
    }
  });
});

// ===== ENHANCED SECTION ANIMATIONS ON SCROLL =====
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

// ===== ENHANCED ACCESSIBILITY =====
document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    document.body.classList.add("using-keyboard");
  }

  // Enhanced keyboard navigation
  if (e.key === "Escape") {
    // Close any open modals or reset states
    const activeElement = document.activeElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur();
    }

    // Reset any active states
    document.querySelectorAll(".active").forEach((el) => {
      if (!el.classList.contains("nav-link")) {
        el.classList.remove("active");
      }
    });
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("using-keyboard");
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Enhanced lazy loading with intersection observer
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }

          // Add fade-in effect
          img.style.opacity = "0";
          img.style.transition = "opacity 0.5s ease-out";
          setTimeout(() => {
            img.style.opacity = "1";
          }, 100);

          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px",
    }
  );

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  });
}

// ===== ENHANCED MOBILE INTERACTIONS =====
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
    if (diff > 0) {
      // Swipe up - show floating contact button
      const floatingContact = document.querySelector(".floating-contact");
      if (floatingContact) {
        floatingContact.style.transform = "translateX(-50%) translateY(0)";
        floatingContact.style.opacity = "1";
      }
    } else {
      // Swipe down - hide floating contact button
      const floatingContact = document.querySelector(".floating-contact");
      if (floatingContact) {
        floatingContact.style.transform = "translateX(-50%) translateY(100px)";
        floatingContact.style.opacity = "0";
      }
    }
  }
}

// ===== ENHANCED PRICING CARD INTERACTIONS =====
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".pricing-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(99, 102, 241, 0.15)";

      // Add glow effect
      this.style.background =
        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "";
      this.style.background = "";
    });
  });
});

// ===== TESTIMONIAL CAROUSEL ENHANCEMENT =====
document.addEventListener("DOMContentLoaded", function () {
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
      this.style.filter = "brightness(1.05)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.filter = "";
    });
  });
});

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  // Initialize stats observer
  const statsContainer = document.querySelector(".stats-container");
  if (statsContainer) {
    statsObserver.observe(statsContainer);
  }

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

  // Add loading animation for cards
  const cards = document.querySelectorAll(
    ".glass-card, .pricing-card, .testimonial-card, .service-card"
  );
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
  });

  // Initialize typing animation
  if (typedTextElement) {
    setTimeout(typeText, 1000);
  }

  // Initialize floating elements
  const backToTop = document.getElementById("backToTop");
  const whatsappChat = document.querySelector(".whatsapp-chat");

  if (backToTop) {
    backToTop.style.transition = "all 0.3s ease-out";
  }

  if (whatsappChat) {
    whatsappChat.style.animation = "pulse 2s infinite";
  }

  // Add initial navbar transition
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  console.log("🚀 Enhanced Modern Portfolio Loaded Successfully!");
  console.log("✨ All animations and interactions are ready!");
  console.log("🎯 Performance optimizations active!");
});

// ===== ENHANCED ERROR HANDLING =====
window.addEventListener("error", function (e) {
  console.warn("Non-critical error handled gracefully:", e.error);
  // Prevent the error from breaking the user experience
  return true;
});

// ===== ENHANCED PERFORMANCE MONITORING =====
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(() => {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`🎯 Page loaded in ${loadTime}ms`);

      // Log performance metrics
      if (performance.getEntriesByType) {
        const navigationEntry = performance.getEntriesByType("navigation")[0];
        if (navigationEntry) {
          console.log(
            `📊 DOMContentLoaded: ${Math.round(
              navigationEntry.domContentLoadedEventEnd -
                navigationEntry.domContentLoadedEventStart
            )}ms`
          );
          console.log(
            `📊 Load Complete: ${Math.round(
              navigationEntry.loadEventEnd - navigationEntry.loadEventStart
            )}ms`
          );
        }
      }
    }, 0);
  });
}

// ===== ENHANCED FLOATING ELEMENTS =====
document.addEventListener("DOMContentLoaded", function () {
  // WhatsApp chat button functionality
  const whatsappChat = document.querySelector(".whatsapp-chat");
  if (whatsappChat) {
    whatsappChat.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  }

  // Mobile contact button functionality
  const floatingContact = document.querySelector(".floating-contact");
  if (floatingContact) {
    floatingContact.addEventListener("click", function () {
      // Scroll to contact section
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }

      // Add click animation
      this.style.transform = "translateX(-50%) scale(0.9)";
      setTimeout(() => {
        this.style.transform = "translateX(-50%) scale(1)";
      }, 150);
    });
  }
});
