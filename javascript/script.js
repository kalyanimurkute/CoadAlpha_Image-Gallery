let currentIndex = 0;
let images = [];

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filters button");
  const imageBoxes = document.querySelectorAll(".image-box img");

  images = Array.from(document.querySelectorAll(".image-box"))
    .map(box => box.querySelector('img'));

  imageBoxes.forEach((img, index) => {
    img.addEventListener("click", () => {
      updateVisibleImages();
      const visibleImages = images;
      currentIndex = visibleImages.indexOf(img);
      openLightbox(currentIndex);
    });
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterImages(button.dataset.filter);
    });
  });
});

function openLightbox(index) {
  const visibleImages = getVisibleImages();
  currentIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightbox.style.display = "block";
  lightboxImg.src = visibleImages[currentIndex].src;
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
  const visibleImages = getVisibleImages();
  if (visibleImages.length === 0) return;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = visibleImages.length - 1;
  if (currentIndex >= visibleImages.length) currentIndex = 0;

  document.getElementById("lightbox-img").src = visibleImages[currentIndex].src;
}

function filterImages(category) {
  const allBoxes = document.querySelectorAll(".image-box");
  allBoxes.forEach(box => {
    const matches = category === "all" || box.classList.contains(category);
    box.style.display = matches ? "block" : "none";
  });

  updateVisibleImages();
  closeLightbox(); // Optional: hide lightbox if filter changes
}

function getVisibleImages() {
  return Array.from(document.querySelectorAll(".image-box"))
    .filter(box => box.style.display !== "none")
    .map(box => box.querySelector("img"));
}

function updateVisibleImages() {
  images = getVisibleImages();
}
