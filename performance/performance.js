document.querySelectorAll("section").forEach((section) => {
  const detailBox = section.querySelector(".poster-detail");
  const cards = section.querySelectorAll(".poster-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // 줄바꿈(\n)을 <br>로 변환
      const formattedDesc = desc.replace(/\n/g, "<br>");

      detailBox.innerHTML = `
        <h3>${item.title}</h3>
        <p>${formattedDesc}</p>
      `;
      detailBox.classList.add("open");
    });
  });
});

function renderPerformance(sectionId, data) {
  const container = document.querySelector(`#${sectionId} .poster-container`);
  const detailBox = document.querySelector(`#${sectionId} .poster-detail`);

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "poster-card";
    card.dataset.title = item.title;
    card.dataset.desc = item.desc;

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title} 공연 포스터" />
      <p>${item.title}</p>
    `;

    card.addEventListener("click", () => {
      // 이미 열려 있고 같은 카드면 닫기
      if (
        detailBox.classList.contains("open") &&
        detailBox.dataset.currentCard === item.title
      ) {
        detailBox.classList.remove("open");
        detailBox.style.maxHeight = null;
        detailBox.style.padding = "0 20px";
        detailBox.dataset.currentCard = null;
        return;
      }

      const formattedDesc = item.desc.replace(/\n/g, "<br>");
      detailBox.innerHTML = `
        <h3>${item.title}</h3>
        <p>${formattedDesc}</p>
      `;
      detailBox.classList.add("open");

      // 내용 높이에 맞춰 maxHeight 조정
      const scrollHeight = detailBox.scrollHeight;
      detailBox.style.maxHeight = scrollHeight + 20 + "px";
      detailBox.style.padding = "20px";

      // 어떤 카드가 열려 있는지 저장
      detailBox.dataset.currentCard = item.title;
    });

    container.appendChild(card);
  });
}

// fetch를 이용해서 JSON 파일 불러오기
fetch("../performance/data/hiphop.json")
  .then((res) => res.json())
  .then((data) => renderPerformance("hiphop-performance", data));

fetch("../performance/data/jazz.json")
  .then((res) => res.json())
  .then((data) => renderPerformance("jazz-performance", data));

fetch("../performance/data/band.json")
  .then((res) => res.json())
  .then((data) => renderPerformance("band-performance", data));
