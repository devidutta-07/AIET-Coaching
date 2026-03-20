// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger
    const spans = hamburger.querySelectorAll("span")
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(8px, 8px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll("a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      const spans = hamburger.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    })
  })
}

// ===== Testimonials Auto-Loop Slider =====
const testimonialsSlider = document.querySelector(".testimonials-slider")

if (testimonialsSlider) {
  let scrollPosition = 0
  const scrollAmount = 350
  const autoScrollInterval = 5000 // Auto-scroll every 5 seconds

  // Auto-scroll testimonials
  setInterval(() => {
    scrollPosition += scrollAmount

    // Reset to beginning when reaching the end
    if (scrollPosition >= testimonialsSlider.scrollWidth - testimonialsSlider.clientWidth) {
      scrollPosition = 0
    }

    testimonialsSlider.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })
  }, autoScrollInterval)
}

function trackEvent(eventName, eventData = {}) {
  const gtag = window.gtag // Declare gtag variable
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventData)
  }
}

// Track form submissions
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    trackEvent("form_submission", {
      form_name: "contact_form",
      subject: subject,
    })

    // Create mailto link
    const mailtoLink = `mailto:aietclasses@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    )}`

    // Open email client
    window.location.href = mailtoLink

    // Show success message
    alert("Thank you for your message! Your email client will open to send the message.")

    // Reset form
    contactForm.reset()
  })
}

document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
  button.addEventListener("click", function () {
    const buttonText = this.textContent.trim()
    trackEvent("button_click", {
      button_text: buttonText,
      button_type: this.className,
    })
  })
})

document.querySelectorAll(".course-card").forEach((card) => {
  card.addEventListener("click", function () {
    const courseTitle = this.querySelector("h3").textContent
    trackEvent("course_card_click", {
      course_name: courseTitle,
    })
  })
})

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    const linkText = this.textContent.trim()
    trackEvent("navigation_click", {
      nav_item: linkText,
    })
  })
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

window.addEventListener("scroll", () => {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const sectionId = link.getAttribute("href").substring(1)
    const section = document.getElementById(sectionId)

    if (section) {
      const sectionTop = section.offsetTop - 100
      const sectionBottom = sectionTop + section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        navLinks.forEach((l) => l.classList.remove("active"))
        link.classList.add("active")
      }
    }
  })
})

window.addEventListener("load", () => {
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks[0].classList.add("active")
})

// ===== AIET Redesign Animations =====

// Initialize AOS (Animate on Scroll)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100
  });
}

// Particles layer removed as per Hologram Face design specifications


// Counter Animation Logic for Stats section
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 200;

      const updateCount = () => {
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 15);
        } else {
          // ensure it hits the exact target
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }
});

// Navbar Glassmorphism scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(10, 10, 15, 0.85)";
      navbar.style.boxShadow = "var(--shadow-primary)";
    } else {
      navbar.style.background = "var(--glass-bg)";
      navbar.style.boxShadow = "none";
    }
  }
});

// ===== Holographic AI Face (Canvas 2D Engine) =====
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("hero-ai-face-canvas");
  const wrapper = document.getElementById("hero-lottie-wrapper"); // Reusing the wrapper ID

  if (!canvas || !wrapper) return;

  const ctx = canvas.getContext("2d");
  let width, height;

  // Responsive Scaling
  function resize() {
    width = wrapper.clientWidth;
    height = wrapper.clientHeight;
    // Handle High DPI displays for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener("resize", resize);
  resize();

  let time = 0;
  let eyeBlink = 1; // 1 = open, 0 = closed
  let isBlinking = false;
  let blinkTimer = 0;

  // Subtle Mouse Parallax
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function drawFace() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2 + mouseX * 15;
    const centerY = height / 2 + Math.sin(time * 0.05) * 8 + mouseY * 15; // Hovering
    const faceRadius = Math.min(width, height) * 0.35;

    // 1. Outer Holographic Scanning Ring
    ctx.strokeStyle = "rgba(0, 240, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 10]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, faceRadius * 1.15, time * 0.02, Math.PI * 2 + time * 0.02);
    ctx.stroke();

    // 2. Inner Face Shield Outline (Hexagonal AI feel)
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgba(138, 43, 226, 0.6)"; // Purple accent
    ctx.shadowColor = "rgba(138, 43, 226, 0.8)";
    ctx.shadowBlur = 15;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(centerX - faceRadius, centerY - faceRadius * 0.5);
    ctx.lineTo(centerX, centerY - faceRadius);
    ctx.lineTo(centerX + faceRadius, centerY - faceRadius * 0.5);
    ctx.lineTo(centerX + faceRadius, centerY + faceRadius * 0.5);
    ctx.lineTo(centerX, centerY + faceRadius);
    ctx.lineTo(centerX - faceRadius, centerY + faceRadius * 0.5);
    ctx.closePath();
    ctx.stroke();

    // 3. Scanning Data Line (Moves up and down face)
    const scanY = (Math.sin(time * 0.08) * 0.5 + 0.5) * faceRadius * 2 - faceRadius;
    ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
    ctx.shadowColor = "rgba(0, 240, 255, 0.6)";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - faceRadius * 0.8, centerY + scanY);
    ctx.lineTo(centerX + faceRadius * 0.8, centerY + scanY);
    ctx.stroke();

    // 4. Glowing Digital Eyes
    // Blink logic (Randomly trigger blink)
    blinkTimer++;
    if (blinkTimer > 180) {
      if (Math.random() > 0.8) isBlinking = true;
      blinkTimer = 0;
    }

    if (isBlinking) {
      eyeBlink -= 0.15;
      if (eyeBlink <= 0) {
        eyeBlink = 0;
        isBlinking = false;
      }
    } else if (eyeBlink < 1) {
      eyeBlink += 0.08;
    }

    ctx.fillStyle = "rgba(0, 240, 255, 0.9)";
    ctx.shadowColor = "rgba(0, 240, 255, 1)";
    ctx.shadowBlur = 20; // Intense neon glow

    const eyeWidth = faceRadius * 0.3;
    const eyeHeight = faceRadius * 0.12;
    const eyeGap = faceRadius * 0.35;
    const eyeY = centerY - faceRadius * 0.2;

    // Left Eye Rectangle
    ctx.beginPath();
    ctx.roundRect(centerX - eyeGap - eyeWidth / 2, eyeY - (eyeHeight * eyeBlink) / 2, eyeWidth, Math.max(2, eyeHeight * eyeBlink), 4);
    ctx.fill();

    // Right Eye Rectangle
    ctx.beginPath();
    ctx.roundRect(centerX + eyeGap - eyeWidth / 2, eyeY - (eyeHeight * eyeBlink) / 2, eyeWidth, Math.max(2, eyeHeight * eyeBlink), 4);
    ctx.fill();

    // 5. Audio/System Waveform (Mouth region)
    const mouthY = centerY + faceRadius * 0.45;
    const mouthWidth = faceRadius * 0.4;

    ctx.strokeStyle = "rgba(138, 43, 226, 0.8)";
    ctx.shadowColor = "rgba(138, 43, 226, 0.9)";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 3;

    ctx.beginPath();
    for (let i = 0; i <= 8; i++) {
      const x = centerX - mouthWidth / 2 + (mouthWidth / 8) * i;
      const baseHeight = (i === 0 || i === 8) ? 2 : (i % 2 === 0 ? 6 : 10);
      // Animate the height smoothly like an audio visualizer
      const dynamicHeight = Math.max(1, baseHeight + Math.sin(time * 0.15 + i) * 4);

      ctx.moveTo(x, mouthY - dynamicHeight / 2);
      ctx.lineTo(x, mouthY + dynamicHeight / 2);
    }
    ctx.stroke();

    // Clear shadow state for next loop iteration
    ctx.shadowBlur = 0;
  }

  // Master Render Loop
  function animate() {
    drawFace();
    time++;
    requestAnimationFrame(animate);
  }

  animate();
});
// ===== CHATBOT FUNCTIONALITY =====

const toggleBtn = document.getElementById("chatbot-toggle");
const chatBox = document.getElementById("chatbot-box");
const closeBtn = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("chatbot-send");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

// Open chat
toggleBtn.addEventListener("click", () => {
  chatBox.style.display = "flex";
  toggleBtn.style.display = "none";
});

// Close chat
closeBtn.addEventListener("click", () => {
  chatBox.style.display = "none";
  toggleBtn.style.display = "flex";
});

// Send message on button click
sendBtn.addEventListener("click", sendMessage);

// Send message on Enter key
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// ===== MAIN FUNCTION =====
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Add user message
  addMessage(text, "user");

  input.value = "";

  // Show typing
  const typing = addMessage("Typing...", "bot");

  try {
    const res = await fetch("https://your-api.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    typing.remove();

    addMessage(data.response, "bot");

  } catch (error) {
    typing.remove();
    addMessage("Error connecting to AI 😢", "bot");
  }
}

// ===== ADD MESSAGE FUNCTION =====
function addMessage(text, sender) {
  const msg = document.createElement("div");

  msg.classList.add(sender === "user" ? "user-message" : "bot-message");
  msg.innerText = text;

  messages.appendChild(msg);

  messages.scrollTop = messages.scrollHeight;

  return msg;
}