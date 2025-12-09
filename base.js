document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------
     1) Navbar 불러오기
  -------------------------------------------------- */
  const navbarContainer = document.getElementById("navbar");

  if (navbarContainer) {
    fetch("../navbar/navbar.html") // 🔥 한 단계 위 폴더 기준
      .then((res) => res.text())
      .then((html) => {
        navbarContainer.innerHTML = html;

        // navbar.js 동적 로드 (중복 방지)
        if (!document.getElementById("navbar-script")) {
          const script = document.createElement("script");
          script.src = "../navbar/navbar.js"; // 🔥 경로 수정
          script.id = "navbar-script";
          document.body.appendChild(script);
        }
      })
      .catch((err) => console.error("Navbar load error:", err));
  }

  /* -------------------------------------------------
     2) Footer 불러오기
  -------------------------------------------------- */
  const footerContainer = document.getElementById("footer");

  if (footerContainer) {
    fetch("../footer/footer.html") // 🔥 한 단계 위 폴더 기준
      .then((res) => res.text())
      .then((html) => {
        footerContainer.innerHTML = html;
      })
      .catch((err) => console.error("Footer load error:", err));
  }
});
