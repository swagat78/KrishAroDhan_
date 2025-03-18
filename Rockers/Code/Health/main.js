// Main JavaScript file for shared functionality across all pages

document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation toggle
    const setupMobileNav = () => {
      const header = document.querySelector("header")
      const nav = document.querySelector("nav")
  
      // Create mobile menu button if it doesn't exist
      if (!document.querySelector(".mobile-menu-btn")) {
        const mobileMenuBtn = document.createElement("button")
        mobileMenuBtn.classList.add("mobile-menu-btn")
        mobileMenuBtn.setAttribute("aria-label", "Toggle navigation menu")
        mobileMenuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `
  
        // Insert before nav
        header.insertBefore(mobileMenuBtn, nav)
  
        // Add event listener
        mobileMenuBtn.addEventListener("click", () => {
          nav.classList.toggle("nav-open")
          mobileMenuBtn.classList.toggle("menu-open")
  
          // Toggle aria-expanded
          const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true" || false
          mobileMenuBtn.setAttribute("aria-expanded", !isExpanded)
        })
      }
    }
  
    // Handle FAQ accordions
    const setupFaqAccordions = () => {
      const faqItems = document.querySelectorAll(".faq-item")
  
      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question")
        const answer = item.querySelector(".faq-answer")
        const toggle = item.querySelector(".faq-toggle")
  
        if (question && answer && toggle) {
          question.addEventListener("click", () => {
            // Close all other items
            faqItems.forEach((otherItem) => {
              if (otherItem !== item && otherItem.classList.contains("active")) {
                otherItem.classList.remove("active")
                otherItem.querySelector(".faq-answer").style.maxHeight = null
              }
            })
  
            // Toggle current item
            item.classList.toggle("active")
  
            if (item.classList.contains("active")) {
              answer.style.maxHeight = answer.scrollHeight + "px"
            } else {
              answer.style.maxHeight = null
            }
          })
        }
      })
    }
  
    // Handle contact form submission
    const setupContactForm = () => {
      const contactForm = document.getElementById("contact-form")
  
      if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault()
  
          // Get form data
          const formData = new FormData(contactForm)
          const formValues = Object.fromEntries(formData.entries())
  
          // Simulate form submission
          const submitButton = contactForm.querySelector('button[type="submit"]')
          const originalText = submitButton.innerHTML
  
          submitButton.disabled = true
          submitButton.innerHTML = `
            <div class="spinner-small"></div>
            <span>Sending...</span>
          `
  
          // Simulate API call
          setTimeout(() => {
            // Show success message
            const successMessage = document.createElement("div")
            successMessage.classList.add("form-success")
            successMessage.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p>Thank you for your message! We'll get back to you soon.</p>
            `
  
            // Replace form with success message
            contactForm.parentNode.replaceChild(successMessage, contactForm)
  
            // Log form data (in a real app, this would be sent to a server)
            console.log("Form submitted:", formValues)
          }, 1500)
        })
      }
    }
  
    // Handle newsletter form submission
    const setupNewsletterForm = () => {
      const newsletterForm = document.getElementById("newsletter-form")
  
      if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
          e.preventDefault()
  
          // Get email
          const emailInput = newsletterForm.querySelector('input[type="email"]')
          const email = emailInput.value
  
          // Simulate form submission
          const submitButton = newsletterForm.querySelector('button[type="submit"]')
          const originalText = submitButton.textContent
  
          submitButton.disabled = true
          submitButton.textContent = "Subscribing..."
  
          // Simulate API call
          setTimeout(() => {
            // Show success message
            emailInput.value = ""
            submitButton.disabled = false
            submitButton.textContent = originalText
  
            // Create and show toast notification
            const toast = document.createElement("div")
            toast.classList.add("toast", "toast-success")
            toast.innerHTML = `
              <div class="toast-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p>Successfully subscribed to the newsletter!</p>
              </div>
              <button class="toast-close" aria-label="Close notification">×</button>
            `
  
            document.body.appendChild(toast)
  
            // Add close button functionality
            const closeBtn = toast.querySelector(".toast-close")
            closeBtn.addEventListener("click", () => {
              toast.classList.add("toast-hiding")
              setTimeout(() => {
                document.body.removeChild(toast)
              }, 300)
            })
  
            // Auto remove after 5 seconds
            setTimeout(() => {
              if (document.body.contains(toast)) {
                toast.classList.add("toast-hiding")
                setTimeout(() => {
                  if (document.body.contains(toast)) {
                    document.body.removeChild(toast)
                  }
                }, 300)
              }
            }, 5000)
  
            // Log email (in a real app, this would be sent to a server)
            console.log("Newsletter subscription:", email)
          }, 1000)
        })
      }
    }
  
    // Initialize all common functionality
    setupMobileNav()
    setupFaqAccordions()
    setupContactForm()
    setupNewsletterForm()
  
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
  
        if (href !== "#") {
          e.preventDefault()
  
          const targetElement = document.querySelector(href)
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }
      })
    })
  })
  
  