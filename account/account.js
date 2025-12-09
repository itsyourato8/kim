function positionTitles() {
  const sections = document.querySelectorAll(".category-section");

  sections.forEach((section) => {
    const title = section.querySelector(".category-title");

    if (!title) return;

    // 섹션에 relative 필요
    section.style.position = "relative";

    let firstCard;

    // Magazine 섹션이면 .align-left 기준으로 잡기
    if (
      section.classList.contains("align-left") &&
      title.textContent.trim() === "Magazine"
    ) {
      firstCard = section.querySelector(".align-left");
    } else {
      firstCard = section.querySelector(".poster-card");
    }

    if (!firstCard) return;

    title.style.position = "absolute";
    // 카드 위쪽으로 80px 띄우기
    title.style.top = `${firstCard.offsetTop - 90}px`;
    // 카드 왼쪽 기준
    title.style.left = `${firstCard.offsetLeft}px`;
  });
}

function revealSections() {
  const sections = document.querySelectorAll(".fade-slide");

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (
      rect.top < window.innerHeight * 0.5 &&
      rect.bottom > window.innerHeight * 0.7
    ) {
      // 화면 안에 들어오면 show
      section.classList.add("show");
    } else {
      // 화면 밖으로 나가면 show 제거
      section.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("DOMContentLoaded", revealSections);

window.addEventListener("DOMContentLoaded", positionTitles);
window.addEventListener("resize", positionTitles);
