// AOS
AOS.init();

// Set the date we're counting down to
const countDownDate = new Date("Aug 27, 2025 16:00:00").getTime();

// Update the countdown every 1 second
const x = setInterval(function () {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the countdown date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result
  document.getElementById("days").querySelector("div:first-child").innerHTML =
    days.toString().padStart(2, "0");
  document.getElementById("hours").querySelector("div:first-child").innerHTML =
    hours.toString().padStart(2, "0");
  document
    .getElementById("minutes")
    .querySelector("div:first-child").innerHTML = minutes
    .toString()
    .padStart(2, "0");
  document
    .getElementById("seconds")
    .querySelector("div:first-child").innerHTML = seconds
    .toString()
    .padStart(2, "0");

  // If the countdown is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("days").querySelector("div:first-child").innerHTML =
      "00";
    document
      .getElementById("hours")
      .querySelector("div:first-child").innerHTML = "00";
    document
      .getElementById("minutes")
      .querySelector("div:first-child").innerHTML = "00";
    document
      .getElementById("seconds")
      .querySelector("div:first-child").innerHTML = "00";
  }
}, 1000);
// music
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("play-and-navigate");
  const audio = document.getElementById("wedding-music");
  const heroSection = document.getElementById("hero");

  // Set initial scroll position
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });

  // Store last scroll position
  let lastScrollTop = 0;
  let lastScrollLeft = 0;

  // Comprehensive scroll disable function
  function disableScroll(event) {
    event.preventDefault();
    event.stopPropagation();

    // Force maintain scroll position
    window.scrollTo({
      top: lastScrollTop,
      left: lastScrollLeft,
      behavior: "instant",
    });
  }

  // Handle different types of scroll events
  const scrollEvents = [
    { event: "scroll", handler: disableScroll, options: { passive: false } },
    { event: "wheel", handler: disableScroll, options: { passive: false } },
    { event: "touchmove", handler: disableScroll, options: { passive: false } },
    {
      event: "mousewheel",
      handler: disableScroll,
      options: { passive: false },
    }, // For older browsers
    {
      event: "DOMMouseScroll",
      handler: disableScroll,
      options: { passive: false },
    }, // For Firefox
  ];

  // Handle keyboard scrolling
  function handleKeyboard(event) {
    const scrollKeys = [
      "ArrowUp",
      "ArrowDown",
      "Space",
      "PageUp",
      "PageDown",
      "Home",
      "End",
    ];

    if (scrollKeys.includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // Apply CSS to prevent scrolling
  function applyScrollLock() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
  }

  // Remove CSS scroll lock
  function removeScrollLock() {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.height = "";
  }

  // Initialize scroll lock
  applyScrollLock();

  // Add all scroll event listeners
  scrollEvents.forEach(({ event, handler, options }) => {
    window.addEventListener(event, handler, options);
  });

  // Add keyboard event listener
  window.addEventListener("keydown", handleKeyboard, { passive: false });

  // Handle play button click
  playButton.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Remove all scroll event listeners
    scrollEvents.forEach(({ event, handler }) => {
      window.removeEventListener(event, handler);
    });

    // Remove keyboard event listener
    window.removeEventListener("keydown", handleKeyboard);

    // Remove CSS scroll lock
    removeScrollLock();

    // Play audio
    if (audio.paused) {
      audio
        .play()
        .catch((error) => console.error("Gagal memutar musik:", error));
    }

    // Scroll to hero section
    if (heroSection) {
      heroSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  });

  // Handle touchstart to prevent default scrolling on mobile
  window.addEventListener(
    "touchstart",
    function (event) {
      lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      lastScrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
    },
    { passive: true }
  );

  // Prevent pinch zoom scrolling
  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
  });

  // Cleanup on page unload
  window.addEventListener("unload", function () {
    removeScrollLock();
    scrollEvents.forEach(({ event, handler }) => {
      window.removeEventListener(event, handler);
    });
    window.removeEventListener("keydown", handleKeyboard);
  });
});

// My Form
window.addEventListener("load", function () {
  const form = document.getElementById("rsvpForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const spinner = document.getElementById("spinner");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Aktifkan loading state
    submitBtn.disabled = true;
    btnText.textContent = "Mengirim...";
    spinner.classList.remove("hidden");

    const data = new FormData(form);
    const action = e.target.action;

    fetch(action, {
      method: "POST",
      body: data,
    })
      .then(() => {
        alert("Kehadiran anda telah terkonfirmasi 😊");
        form.reset();
      })
      .catch(() => {
        alert("Terjadi kesalahan, silakan coba lagi.");
      })
      .finally(() => {
        // Kembalikan tombol ke normal
        submitBtn.disabled = false;
        btnText.textContent = "Kirim Konfirmasi";
        spinner.classList.add("hidden");
      });
  });
});
