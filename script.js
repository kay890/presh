// =======================
// 🔔 Popup Tag System
// =======================
function showPopup(
  message,
  targetElement,
  bgColor = "#fff",
  textColor = "#000"
) {
  const popup = document.getElementById("popupTag");
  if (!popup || !targetElement) return;

  popup.textContent = message;
  popup.style.setProperty("--popup-bg", bgColor);
  popup.style.setProperty("--popup-text", textColor);

  const rect = targetElement.getBoundingClientRect();
  popup.style.top = `${rect.top - 40}px`;
  popup.style.left = `${rect.left + rect.width / 2}px`;
  popup.style.transform = "translateX(-50%)";

  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

// Popup triggers
document.querySelector(".explore-btn")?.addEventListener("click", function () {
  showPopup("Under development", this, "#fff", "#000");
});

document
  .querySelector(".creation-button")
  ?.addEventListener("click", function () {
    showPopup("Coming soon!", this, "#000", "#fff");
  });

document.querySelector(".tag-icon")?.addEventListener("click", function () {
  showPopup("amirekay's team", this, "green", "#fff");
});

// =======================
// 💬 Message Modal System
// =======================
const messageBtn = document.querySelector(".message-btn");
const messageModal = document.getElementById("messageModal");
const modalCancel = document.getElementById("modalCancel");

messageBtn?.addEventListener("click", () => {
  messageModal?.classList.add("show");
});

modalCancel?.addEventListener("click", () => {
  messageModal?.classList.remove("show");
});

// =======================
// 🖼️ Auto-Scrolling Gallery
// =======================
const creationLibrary = document.querySelector(".creation-library");
let scrollSpeed = 2;
let scrollInterval;

function initializeScroll() {
  if (creationLibrary) creationLibrary.scrollLeft = 0;
}

function startAutoScroll() {
  if (!creationLibrary) return;

  scrollInterval = setInterval(() => {
    creationLibrary.scrollLeft += scrollSpeed;

    if (
      creationLibrary.scrollLeft + creationLibrary.clientWidth >=
      creationLibrary.scrollWidth
    ) {
      creationLibrary.scrollLeft = 0;
    }
  }, 16);
}

// Hover pause
creationLibrary?.addEventListener("mouseenter", () =>
  clearInterval(scrollInterval)
);
creationLibrary?.addEventListener("mouseleave", () => startAutoScroll());

// Start scroll
initializeScroll();
startAutoScroll();

// =======================
// 🎯 Scroll-Triggered Animations
// =======================
const animatedElements = document.querySelectorAll(".scroll-animate");

function handleScrollAnimation() {
  animatedElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

// =======================
// 🔄 Scroll Direction Detection
// =======================
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;
  const direction = currentScroll > lastScrollTop ? "down" : "up";
  document.body.setAttribute("data-scroll-direction", direction);
  lastScrollTop = Math.max(currentScroll, 0);
});

const messageForm = document.getElementById("messageForm");
const modalConfirmation = document.getElementById("modalConfirmation");
const confirmationCancel = document.getElementById("confirmationCancel");

messageForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect inputs
  const nameInput = messageForm.querySelector(".modal-input[type='text']");
  const emailInput = messageForm.querySelector(".modal-input[type='email']");
  const codeSelect = messageForm.querySelector(".country-code");
  const phoneInput = messageForm.querySelector(".phone-number");
  const messageTextarea = messageForm.querySelector(".modal-textarea");

  // Reset borders
  [nameInput, emailInput, phoneInput, messageTextarea].forEach((el) => {
    el.style.border = "none";
  });

  // Validation check
  let hasError = false;

  if (!nameInput.value.trim()) {
    nameInput.style.border = "2px solid red";
    hasError = true;
  }

  if (!emailInput.value.trim()) {
    emailInput.style.border = "2px solid red";
    hasError = true;
  }

  if (!phoneInput.value.trim()) {
    phoneInput.style.border = "2px solid red";
    hasError = true;
  }

  if (!messageTextarea.value.trim()) {
    messageTextarea.style.border = "2px solid red";
    hasError = true;
  }

  if (hasError) return;

  // Simulate sending
  const fullPhone = `${codeSelect.value} ${phoneInput.value}`;
  console.log("Sending message:", {
    name: nameInput.value,
    email: emailInput.value,
    phone: fullPhone,
    message: messageTextarea.value,
  });

  // Swap content
  messageForm.classList.add("hidden");
  modalConfirmation.classList.add("show");
});

// Cancel confirmation
confirmationCancel?.addEventListener("click", () => {
  modalConfirmation.classList.remove("show");
  messageForm.classList.remove("hidden");

  // Optional: reset form
  messageForm.reset();
});
