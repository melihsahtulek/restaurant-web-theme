/* BURGER MENU */

const burger = document.querySelector(".burger");
const nav = document.getElementsByTagName("nav")[0];

burger.addEventListener("click", () => {
  let control = burger.getAttribute("data-isopen") === "true" ? true : false;
  if (!control) {
    burger.setAttribute("data-isOpen", "true");
    nav.style.top = "100px";
  } else {
    burger.setAttribute("data-isOpen", "false");
    nav.style.top = "-100%";
  }
});

/* FIX ALL IMAGE DRAG-SELECT */

Array.from(document.getElementsByTagName("img")).forEach((img) => {
  img.setAttribute("draggable", "false");
});

/* MENU DESKTOP SCROLL MOVE */

const items = document.querySelectorAll(".itemFlex");
let controlArray = [];

items.forEach((item, index) => {
  item.addEventListener("mousedown", (e) => mouseDown(e, item, index));
  item.addEventListener("mouseup", (e) => mouseUp(e, item, index));
  item.addEventListener("mousemove", (e) => mouseMove(e, item, index));
  item.addEventListener("mouseleave", (e) => mouseLeave(e, item, index));
  controlArray.push({ id: index, start: 0, stop: 0, moveEvent: false });
});

const mouseDown = (e, item, index) => {
  item.style.cursor = "grabbing";
  controlArray[index]["moveEvent"] = true;
  controlArray[index]["start"] = e.clientX;
};

const mouseMove = (e, item, index) => {
  if (controlArray[index]["moveEvent"]) {
    item.scrollLeft = controlArray[index]["start"] - e.clientX + controlArray[index]["stop"];
  }
};

const mouseUp = (e, item, index) => {
  item.style.cursor = "grab";
  controlArray[index]["moveEvent"] = false;
  controlArray[index]["stop"] = item.scrollLeft;
};

const mouseLeave = (e, item, index) => {
  item.style.cursor = "grab";
  controlArray[index]["moveEvent"] = false;
  controlArray[index]["stop"] = item.scrollLeft;
};

/* SIMPLE MODAL FOR GALLERY */

const gallery__item = document.querySelectorAll(".gallery__item");
const myModal = document.querySelector(".modalContainer");
const modalImage = document.querySelector(".modalImage");
const closeTheModal = document.querySelector(".closeTheModal");
const nextImageBtn = document.querySelector(".nextImageBtn");
const prevImageBtn = document.querySelector(".prevImageBtn");
let selectedImageIndex = 0;

Array.from(gallery__item).forEach((galleryItem, index) => {
  galleryItem.addEventListener("click", (e) => {
    setImage(galleryItem);
    selectedImageIndex = index;
  });
});

const setImage = (galleryItem) => {
  myModal.style.display = "flex";
  modalImage.children[0].setAttribute("src", galleryItem.children[0].getAttribute("src"));
};

myModal.addEventListener("click", (e) => {
  if (e.target.getAttribute("id") === "modal") {
    myModal.style.display = "none";
  }
});

closeTheModal.addEventListener("click", () => {
  myModal.style.display = "none";
});

nextImageBtn.addEventListener("click", () => {
  if (selectedImageIndex < gallery__item.length - 1) {
    selectedImageIndex += 1;
    modalImage.children[0].setAttribute("src", gallery__item[selectedImageIndex].children[0].getAttribute("src"));
  } else {
    selectedImageIndex = 0;
    modalImage.children[0].setAttribute("src", gallery__item[selectedImageIndex].children[0].getAttribute("src"));
  }
});

prevImageBtn.addEventListener("click", () => {
  if (selectedImageIndex > 0) {
    selectedImageIndex -= 1;
    modalImage.children[0].setAttribute("src", gallery__item[selectedImageIndex].children[0].getAttribute("src"));
  } else {
    selectedImageIndex = gallery__item.length - 1;
    modalImage.children[0].setAttribute("src", gallery__item[selectedImageIndex].children[0].getAttribute("src"));
  }
});

/* NAVIGATION ACTIVE LINK */

Array.from(nav.children[0].children).forEach((li, index) => {
  if (document.location.hash == "") {
    if (index == 0) {
      li.children[0].setAttribute("class", "active__link");
    }
  } else {
    if (li.children[0].hash == document.location.hash) {
      li.children[0].setAttribute("class", "active__link");
    }
  }
  li.addEventListener("click", () => {
    burger.setAttribute("data-isOpen", "false");
    nav.style.top = "-100%";
  });
});

/* SCROLLSPY */

const allSection = document.getElementsByTagName("section");
let allSectionArr = [];

Array.from(allSection).forEach((section, index) => {
  allSectionArr.push({ id: index, top: section.offsetTop - 100, elemID: section.getAttribute("id") });
});

window.addEventListener("scroll", (e) => {
  for (let index = 0; index < allSectionArr.length; index++) {
    if (window.scrollY > allSectionArr[index].top) {
      Array.from(nav.children[0].children).forEach((li) => {
        li.children[0].removeAttribute("class", "active__link");
      });
      nav.children[0].children[index].children[0].setAttribute("class", "active__link");
    }
  }
});
