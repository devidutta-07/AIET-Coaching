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
    const mailtoLink = `mailto:aietclasses4@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
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
