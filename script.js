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

// ===== Contact Form Handling =====
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Create mailto link
    const mailtoLink = `mailto:biswalanil2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
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

// ===== Smooth Scroll for Navigation Links =====
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

// ===== Active Navigation Link =====
window.addEventListener("scroll", () => {
  const navLinks = document.querySelectorAll(".nav-menu a")
  navLinks.forEach((link) => {
    link.classList.remove("active")
  })

  // Add active class to current page link
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
})

// ===== Initialize Active Link on Page Load =====
window.addEventListener("load", () => {
  const navLinks = document.querySelectorAll(".nav-menu a")
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
})
