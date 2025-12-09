function revealDistricts() {
  const districts = document.querySelectorAll(".district");

  districts.forEach((district) => {
    const rect = district.getBoundingClientRect();

    if (
      rect.top < window.innerHeight * 0.5 &&
      rect.bottom > window.innerHeight * 0.7
    ) {
      district.classList.add("show");
    } else {
      district.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealDistricts);
window.addEventListener("resize", revealDistricts);
window.addEventListener("load", revealDistricts);
