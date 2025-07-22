const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector("header i");
const form = document.querySelector("form");

// Popup'ı aktif etmek için addBox elemanına bir olay izleyicisi ekle
addBox.addEventListener("click", () => {
  // Popup'ı aktif etmek için popup ve popupBox'a show classı ekle
  popupBox.classList.add("show");
  popup.classList.add("show");
  // Popup aktif edildiğinde arka planda yer alan elemanların kaydırılmasını engelle
  document.body.style.overflow = "hidden";
});

// Popup'ı pasif etmek için closeBtn elemanına bir olay izleyicisi ekle
closeBtn.addEventListener("click", () => {
  // Popup'ı pasif etmek için popup ve popupBox'dan show classını kaldır 
popupBox.classList.remove("show");
popup.classList.remove("show");
  // Popup pasif edildiğinde arka planda yer alan elemanların kaydırılmasını eski haline çevir
document.body.style.overflow = "auto";
});
// Formun gönderilmesi izle
form.addEventListener("submit", (e) => {
// Form'lar gönderildiğinde defoult özellik olarak sayfa yeniler.Bunu engellemek için event parametresi içerisindeki preventdefault() metodu kullanılır.
e.preventDefoult();
// Form içerisindeki title ve description değerlerine eriş

const titleInput = e.target[0];
const description = e.target[1];


// titleInput ve descriptionInput elemanlarının değerine eriş

const title = titleInput.value;
const descriptionInput = e.target.value;

// Eğeer title ve description yoksa kullanıcıya uyarı ver
if(!title || !description){
  
  // Kullanıcıya uyarı verildiyse fonsiyonu durdur
  return; 
}
// todo: Formun gönderilmesi sonucunda eld edilen verileri ile note elemanı oluşturulacak. 
console.log('Form gönderildi');
});










