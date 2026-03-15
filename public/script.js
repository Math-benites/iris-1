const screens = document.querySelectorAll("[data-screen]");
const nextButtons = document.querySelectorAll("[data-next]");

const countDays = document.getElementById("countDays");
const countHours = document.getElementById("countHours");
const countMinutes = document.getElementById("countMinutes");
const countSeconds = document.getElementById("countSeconds");
const heroTitle = document.getElementById("heroTitle");

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicTitle = document.getElementById("musicTitle");
const musicSubtitle = document.getElementById("musicSubtitle");

const galleryImage = document.getElementById("galleryImage");
const galleryCounter = document.getElementById("galleryCounter");
const galleryFrame = document.getElementById("galleryFrame");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");

const appConfig = window.APP_CONFIG ?? {};
const lovedOneName = appConfig.lovedOneName?.trim() || "Iris";
const birthdayMonth = Number.parseInt(appConfig.birthdayMonth, 10) || 3;
const birthdayDay = Number.parseInt(appConfig.birthdayDay, 10) || 19;

const musicFile = "./music/x_-_we_fell_in_love_in_october_(mp3.pm).mp3";

const galleryPhotos = [
  "IMG-20240922-WA0032.webp",
  "IMG-20240928-WA0027.webp",
  "IMG-20240929-WA0006.webp",
  "IMG-20241011-WA0008.webp",
  "IMG-20241013-WA0003.webp",
  "IMG-20241013-WA0006.webp",
  "IMG-20241103-WA0007.webp",
  "IMG-20241113-WA0023.webp",
  "IMG-20241115-WA0000.webp",
  "IMG-20241115-WA0006.webp",
  "IMG-20241117-WA0014.webp",
  "IMG-20241206-WA0007.webp",
  "IMG-20241216-WA0025.webp",
  "IMG-20241218-WA0005.webp",
  "IMG-20250101-WA0003.webp",
  "IMG-20250101-WA0005.webp",
  "IMG-20250220-WA0031.webp",
  "IMG-20250301-WA0037.webp",
  "IMG-20250316-WA0004.webp",
  "IMG-20250418-WA0008.webp",
  "IMG-20250425-WA0008.webp",
  "IMG-20250511-WA0004.webp",
  "IMG-20250527-WA0006.webp",
  "IMG-20250527-WA0007.webp",
  "IMG-20250605-WA0003.webp",
  "IMG-20250607-WA0007.webp",
  "IMG-20250612-WA0002.webp",
  "IMG-20250620-WA0011.webp",
  "IMG-20250620-WA0016.webp",
  "IMG-20250817-WA0014.webp",
  "IMG-20250919-WA0004.webp",
  "IMG-20250919-WA0007.webp",
  "IMG-20250927-WA0000.webp",
  "IMG-20250927-WA0001.webp",
  "IMG-20251019-WA0002.webp",
  "IMG-20251028-WA0016.webp",
  "IMG-20251121-WA0024.webp",
  "IMG-20251121-WA0037.webp",
  "IMG-20251122-WA0019.webp",
  "IMG-20251122-WA0023.webp",
  "IMG-20251123-WA0010.webp",
  "IMG-20251219-WA0039.webp",
  "IMG-20251219-WA0053.webp",
  "IMG-20251228-WA0031.webp",
  "IMG-20251229-WA0026.webp",
  "IMG-20251231-WA0007.webp",
  "IMG-20260104-WA0001.webp",
  "IMG-20260116-WA0001.webp",
];

let galleryIndex = 0;

function showScreen(screenName) {
  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === screenName);
  });
}

function setupWizard() {
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showScreen(button.dataset.next);
    });
  });
}

function getBirthdayTarget(now = new Date()) {
  return new Date(now.getFullYear(), birthdayMonth - 1, birthdayDay, 0, 0, 0, 0);
}

function updateCountdown() {
  const now = new Date();
  const birthday = getBirthdayTarget(now);

  if (now >= birthday) {
    heroTitle.textContent = `Hoje é seu dia, ${lovedOneName}`;
    showScreen("intro");
    return true;
  }

  const diffMs = birthday.getTime() - now.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countDays.textContent = String(days).padStart(2, "0");
  countHours.textContent = String(hours).padStart(2, "0");
  countMinutes.textContent = String(minutes).padStart(2, "0");
  countSeconds.textContent = String(seconds).padStart(2, "0");

  showScreen("countdown");
  return false;
}

function setupEntryScreen() {
  const isBirthdayOrAfter = updateCountdown();

  if (!isBirthdayOrAfter) {
    window.setInterval(updateCountdown, 1000);
  }
}

function setupMusicCard() {
  if (!bgMusic || !musicToggle || !musicTitle || !musicSubtitle) {
    return;
  }

  bgMusic.src = musicFile;
  bgMusic.loop = true;
  musicTitle.textContent = "we fell in love in october";
  musicSubtitle.textContent = "girl in red";

  musicToggle.addEventListener("click", async () => {
    if (!bgMusic.getAttribute("src")) {
      window.alert("Ainda não existe uma música configurada no projeto.");
      return;
    }

    if (bgMusic.paused) {
      await bgMusic.play();
      musicToggle.textContent = "❚❚";
      return;
    }

    bgMusic.pause();
    musicToggle.textContent = "►";
  });
}

function renderGallery() {
  if (!galleryImage || galleryPhotos.length === 0) {
    return;
  }

  const photo = galleryPhotos[galleryIndex];
  galleryImage.src = `./photos/${photo}`;
  galleryImage.alt = `Nossa foto ${galleryIndex + 1}`;
  galleryCounter.textContent = `${galleryIndex + 1} / ${galleryPhotos.length}`;
}

function goToPreviousPhoto() {
  galleryIndex = (galleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
  renderGallery();
}

function goToNextPhoto() {
  galleryIndex = (galleryIndex + 1) % galleryPhotos.length;
  renderGallery();
}

function setupGallery() {
  if (!galleryImage || !galleryPrev || !galleryNext || galleryPhotos.length === 0) {
    return;
  }

  renderGallery();

  galleryPrev.addEventListener("click", goToPreviousPhoto);
  galleryNext.addEventListener("click", goToNextPhoto);

  galleryFrame?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      goToPreviousPhoto();
    }

    if (event.key === "ArrowRight") {
      goToNextPhoto();
    }
  });
}

setupWizard();
setupEntryScreen();
setupGallery();
setupMusicCard();
