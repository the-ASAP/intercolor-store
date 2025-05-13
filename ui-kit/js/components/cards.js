export function initCardGallery(root = document) {
  root.querySelectorAll(".card-gallery").forEach((gallery) => {
    const mainImg = gallery.querySelector(".card-wrapper__image");
    const navPrev = gallery.querySelector(".card-gallery__nav_prev");
    const navNext = gallery.querySelector(".card-gallery__nav_next");
    let idx = 0;
    const images = [
      "/ui-kit/assets/images/productImg1.png",
      "/ui-kit/assets/images/productImg2.png",
    ];

    function update() {
      const src = images[idx];
      mainImg.src = src;
    }

    navPrev.addEventListener("click", () => {
      if (idx > 0) idx--;
      update();
    });
    navNext.addEventListener("click", () => {
      if (idx < images.length - 1) idx++;
      update();
    });

    update();
  });
}
