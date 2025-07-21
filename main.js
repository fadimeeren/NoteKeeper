const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popup = document.querySelector(".popup");

// Popup'ı aktif etmek için addBox elemanına bir olay izleyicisi ekle
addBox.addEventListener("click", () => {
  // Popup'ı aktif etmek için popup ve popupBox'a show classı ekle
  popupBox.classList.add("show");
  popup.classList.add("show");
});
