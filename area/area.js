console.log("✅ area.js loaded!");

document.querySelectorAll(".area-container").forEach((container) => {
  const cards = container.querySelectorAll(".area-card");

  if (cards.length <= 1) {
    // 카드가 1개 이하일 경우: 스크롤 없애고 가운데 정렬
    container.style.overflowX = "visible";
    container.style.justifyContent = "flex-start"; // 항상 왼쪽 시작
  } else {
    // 카드가 2개 이상일 경우: 스크롤 유지하고 왼쪽 정렬
    container.style.overflowX = "auto";
    container.style.justifyContent = "flex-start";
  }
});

// 초기엔 모든 섹션 숨김
document
  .querySelectorAll("section")
  .forEach((sec) => sec.classList.remove("active"));

document.querySelectorAll(".region-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const region = btn.dataset.region;
    const activeSection = document.querySelector("section.active");
    const target = document.querySelector(`section[data-region="${region}"]`);

    // 1️⃣ 열린 상태 + 같은 지역 클릭 -> 닫기
    if (activeSection === target) {
      activeSection.classList.remove("active");
      activeSection.style.maxHeight = "0";
      activeSection.style.padding = "0 20px";

      return;
    }

    // 2️⃣ 열린 상태 + 다른 지역 클릭 -> 슬라이딩 없이 교체
    if (activeSection && activeSection !== target) {
      activeSection.classList.remove("active");
      activeSection.style.transition = "none";
      activeSection.style.maxHeight = "0";
      activeSection.style.padding = "0 20px";

      target.classList.add("active");
      target.style.transition = "none";
      target.style.maxHeight = target.scrollHeight + "px";
      target.style.padding = "20px";

      // 트랜지션 재적용
      setTimeout(() => {
        activeSection.style.transition =
          "max-height 0.4s ease, padding 0.4s ease";
        target.style.transition = "max-height 0.4s ease, padding 0.4s ease";
      }, 50);

      // 열리는 섹션으로 스크롤 이동
      // target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // 3️⃣ 닫힌 상태 + 지역 클릭 -> 슬라이딩으로 열기
    if (target && !target.classList.contains("active")) {
      target.classList.add("active");
      const scrollHeight = target.scrollHeight;
      target.style.maxHeight = scrollHeight + "px";
      target.style.padding = "20px";

      // 트랜지션 끝난 뒤에 스크롤 이동
      // target.addEventListener("transitionend", function handler(event) {
      // max-height 트랜지션에서만 실행
      //   if (event.propertyName === "max-height") {
      //     target.scrollIntoView({ behavior: "smooth", block: "start" });
      //     target.removeEventListener("transitionend", handler);
      //   }
      // });
    }
  });
});

// 버튼 반응형
function updateRegionButtonPositions() {
  const mapImage = document.querySelector(".map-image");
  const buttons = document.querySelectorAll(".region-btn");

  const imgWidth = mapImage.clientWidth;
  const imgHeight = mapImage.clientHeight;

  buttons.forEach((btn) => {
    const x = parseFloat(btn.dataset.x) * imgWidth;
    const y = parseFloat(btn.dataset.y) * imgHeight;
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
  });
}

// 이미지 로드 후 위치 설정
const mapImage = document.querySelector(".map-image");
// if (mapImage.complete) {
//   updateRegionButtonPositions();
// } else {
//   mapImage.onload = updateRegionButtonPositions;
// }

if (mapImage) {
  if (mapImage.complete) {
    updateRegionButtonPositions();
  } else {
    mapImage.addEventListener("load", updateRegionButtonPositions);
  }
}

// 화면 리사이즈 시 위치 업데이트
window.addEventListener("resize", updateRegionButtonPositions);
