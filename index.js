function addImages(n) {
  const container = document.querySelector("#slide-container");
  for (let index = 0; index < n; index += 1) {
    const div = document.createElement("div");
    div.classList.add("slide");
    container.append(div);
  }
}

function showIndex(n) {
  const imgs = document.querySelectorAll("div.slide");
  for (let index = 0; index < imgs.length; index += 1) {
    imgs[index].style.translate = `calc(50vw - ${50 + n * 100}%)`;
    imgs[index].style.scale = index === n ? 1 : 0.9;
    imgs[index].style.filter = index === n ? "blur(0)" : "blur(5px)";
  }
}

function slideIndex(n) {
  let index = 0;
  return (event) => {
    if (event.key === "ArrowLeft") {
      index = index !== 0 ? index - 1 : 0;
    }
    if (event.key === "ArrowRight") {
      index = index !== n ? index + 1 : n;
    }
    showIndex(index);
  };
}

addImages(4);
document.addEventListener("keydown", slideIndex(3));
showIndex(0);
