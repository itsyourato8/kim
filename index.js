document.addEventListener("DOMContentLoaded", () => {
  initRollingPreview();
});

/* ---------------------------------------------------------
   1) 상단 "다가오는 공연 미리보기" — 무한 롤링 슬라이더
---------------------------------------------------------- */
function initRollingPreview() {
  const track = document.querySelector(".rolling-track");
  if (!track) return;

  const performances = [
    { image: "image/band1.jpeg" },
    { image: "image/jazz2.jpeg" },
    { image: "image/band3.jpeg" },
    { image: "image/jazz4.jpeg" },
    { image: "image/per8.jpeg" },
    { image: "image/per3.png" },
    { image: "image/jazz1.jpeg" },
    { image: "image/per7.jpeg" },
    { image: "image/per2.png" },
  ];

  const list = [...performances, ...performances];

  list.forEach((perf) => {
    const card = document.createElement("div");
    card.className = "preview-card";

    const img = document.createElement("img");
    img.src = perf.image;
    img.alt = "performance-image";

    card.appendChild(img);
    track.appendChild(card);
  });
}

/* ---------------------------------------------------------
   2) account.html 포스터 카드 로드
---------------------------------------------------------- */
fetch("account/account.html")
  .then((response) => response.text())
  .then((htmlText) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;

    const cards = tempDiv.querySelectorAll(".poster-card");
    const container = document.querySelector(".poster-list-container");

    cards.forEach((card) => {
      const img = card.querySelector("img");
      if (img) {
        const filename = img.src.split("image/")[1]; // dj3.jpg
        img.src = "image/" + filename; // its/image/dj3.jpg (상대경로 안전)
      }
      container.appendChild(card);
    });

    initPosterSlider(".poster-list-container");
  })
  .catch((err) => console.error("Error loading account.html:", err));

function initPosterSlider(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const cards = container.querySelectorAll(".poster-card");
  if (!cards.length) return;

  let index = 0;

  container.style.display = "flex";
  container.style.transition = "transform 0.5s ease";

  const moveDistance =
    cards[0].offsetWidth + parseInt(getComputedStyle(container).gap || 0) - 0.3;

  setInterval(() => {
    index = (index + 1) % cards.length;
    container.style.transform = `translateX(-${index * moveDistance}px)`;
  }, 3000);
}

/* ---------------------------------------------------------
   3) 공연장 카드 로드
---------------------------------------------------------- */
fetch("area/area.html")
  .then((response) => response.text())
  .then((htmlText) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;

    const cards = tempDiv.querySelectorAll(".area-card");
    const container = document.querySelector(".area-list-container");

    cards.forEach((card) => {
      const img = card.querySelector("img");
      if (img) {
        const filename = img.src.split("image/")[1];
        img.src = "image/" + filename;
      }
      container.appendChild(card);
    });

    initAreaSlider(".area-list-container");
  })
  .catch((err) => console.error("Error loading area.html:", err));

function initAreaSlider(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const cards = container.querySelectorAll(".area-card");
  if (!cards.length) return;

  let index = 0;

  container.style.display = "flex";
  container.style.transition = "transform 0.5s ease";

  const moveDistance =
    cards[0].offsetWidth + parseInt(getComputedStyle(container).gap || 0) - 0.3;

  setInterval(() => {
    index = (index + 1) % cards.length;
    container.style.transform = `translateX(-${index * moveDistance}px)`;
  }, 3000);
}
