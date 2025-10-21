// Navigation 
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");
  const hamburger = document.querySelector(".hamburger");
  const navLinksContainer = document.querySelector(".nav-links");
  const timeDisplay = document.querySelector('[data-testid="test-user-time"]');
  const avatarUpload = document.getElementById("avatar-upload");
  const avatar = document.getElementById("avatar");

  // Update time display for Stage 0 requirement
  function updateTime() {
    timeDisplay.textContent = Date.now();
  }

  updateTime();

  setInterval(updateTime, 1000);

  // Avatar upload functionality
  avatarUpload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        avatar.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Page navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Show selected page
      const pageId = this.getAttribute("data-page");
      pages.forEach((page) => {
        page.classList.remove("active");
        if (page.id === pageId) {
          page.classList.add("active");
        }
      });

      if (navLinksContainer.classList.contains("active")) {
        navLinksContainer.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
    navLinksContainer.classList.toggle("active");
  });

  // Contact form validation
  const contactForm = document.getElementById("contact-form");
  const successMessage = document.querySelector(".success-message");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset previous states
    resetValidation();

    // Get form values
    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    // Validate name
    if (name === "") {
      showError("name-error", "Please enter your full name");
      isValid = false;
    }

    // Validate email
    if (email === "") {
      showError("email-error", "Please enter your email address");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("email-error", "Please enter a valid email address");
      isValid = false;
    }

    // Validate subject
    if (subject === "") {
      showError("subject-error", "Please enter a subject");
      isValid = false;
    }

    // Validate message
    if (message === "") {
      showError("message-error", "Please enter a message");
      isValid = false;
    } else if (message.length < 10) {
      showError("message-error", "Message must be at least 10 characters");
      isValid = false;
    }

    // If form is valid, show success message
    if (isValid) {
      successMessage.style.display = "block";
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    }
  });

  // Helper functions for form validation
  function resetValidation() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => {
      msg.style.display = "none";
    });
    successMessage.style.display = "none";
  }

  function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
