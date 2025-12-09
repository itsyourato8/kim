// navbar.js
fetch("../navbar/navbar.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("navbar").innerHTML = html;

    // 현재 페이지에 맞게 active 클래스 추가
    const navLinks = document.querySelectorAll("#navbar nav ul li a");
    const currentPath = window.location.pathname; // /schedule/schedule.html
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  });
