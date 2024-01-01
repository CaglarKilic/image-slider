function addImages(n) {
  const container = document.querySelector("#slide-container");
  for (let index = 0; index < n; index += 1) {
    const div = document.createElement("div");
    div.classList.add("slide");
    container.append(div);
  }
}

function addNavigationDots(n) {
  const div = document.querySelector("#navigation-dots");
  for (let index = 0; index < n; index += 1) {
    const elem = document.createElement("input");
    elem.type = "radio";
    elem.name = "image";
    elem.setAttribute("data-index", index);
    div.append(elem);
  }
}

let timeoutId;
function updateRadio(index) {
  const radios = document.querySelectorAll("input");
  radios[index].checked = true;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    // eslint-disable-next-line no-use-before-define
    showIndex((index + 1) % 4);
  }, 5000);
}

function hideArrow(index, n) {
  const prev = document.querySelector("#previous");
  const next = document.querySelector("#next");

  prev.classList.remove("hidden");
  next.classList.remove("hidden");

  if (index === 0) {
    prev.classList.add("hidden");
  }
  if (index === n - 1) {
    next.classList.add("hidden");
  }
}

function showIndex(n) {
  const imgs = document.querySelectorAll("div.slide");
  for (let index = 0; index < imgs.length; index += 1) {
    imgs[index].style.translate = `calc(50vw - ${50 + n * 100}%)`;
    imgs[index].style.scale = index === n ? 1 : 0.9;
    imgs[index].style.filter = index === n ? "blur(0)" : "blur(5px)";
  }

  updateRadio(n);
  hideArrow(n, imgs.length);
}

function slideIndex(n) {
  let index = 0;
  return (event) => {
    index = parseInt(document.querySelector("input:checked").dataset.index, 10);
    if (event.key === "ArrowLeft") {
      index = index !== 0 ? index - 1 : 0;
    }
    if (event.key === "ArrowRight") {
      index = index !== n ? index + 1 : n;
    }
    showIndex(index);
  };
}

function navigateDots(e) {
  e.stopPropagation();
  const index = parseInt(e.target.dataset.index, 10);
  showIndex(index);
}

document.addEventListener("keydown", slideIndex(3));
document
  .querySelector("#previous")
  .addEventListener("click", () =>
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }))
  );
document
  .querySelector("#next")
  .addEventListener("click", () =>
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }))
  );
document
  .querySelector("#navigation-dots")
  .addEventListener("change", navigateDots);

addImages(4);
addNavigationDots(4);
showIndex(0);
hideArrow(0, 3);
