// ! Ay dizisi
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ! Html'den Js'e elemanların çekilmesi
const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector("header i");
const form = document.querySelector("form");
const wrapper = document.querySelector(".wrapper");
const popupTitle = document.querySelector("#popup-title");
const popupButton = document.querySelector("#form-btn");

// ! Global scope'a sahip değişkenler
let notes = JSON.parse(localStorage.getItem("notes")) || []; // Eğer localStorage'a notes key'ine sahip bir eleman varsa bunu JSON.parse ile dönüştür ve notes'a ata ama eğer yoksa notes dizisini boş bir dizi olarak ata

let isUpdate = false; // Güncellenme modunda mı ?
let updateId = null; // Güncellenecek elemanın id için

// * Sayfa yüklendiği anda renderNotes fonksiyonunun çalıştır
document.addEventListener("DOMContentLoaded", renderNotes(notes));

// * note içerisindeki menüyü aktif edecek fonksiyon
function showMenu(item) {
  // Tıklanılan ... elemanının kapsam elemanına eriş
  // ! Bir html elemanının kapsam elemanına erişmek için parentElement metodu kullanılır.
  const parentElement = item.parentElement;

  // parentElement'e show class'ı ekle
  parentElement.classList.add("show");

  // show class'ı eklenerek aktif edilen menü'yü pasife çek
  document.addEventListener("click", (e) => {
    // Tıklanılan eleman ... haricinde ve kapsam haricinde bir elemansa show class'ını kaldır
    if (e.target.tagName != "I" || e.target != item) {
      parentElement.classList.remove("show");
    }
  });
}

// * Note elemanını silecek fonksiyon
function deleteNote(item) {
  // Kullanıcıdan silme işlemi için onay iste
  const response = confirm("Bu notu silmek istediğinize eminmisiniz ?");

  // Eğer silme işlemi onaylandıysa
  if (response) {
    // ! Eğer bir elemanın birkaç defa kapsamına erişeceksek bunu parentElement metodu yerine closest metodu ile yapabiliriz.Bu metot(closest) seçicisi belirtilen elemana kısa yoldan erişmek için kullanılır.

    // Tıklanılan deleteIcon'ın kapsayıcısına eriş
    const noteItem = item.closest(".note");

    // Erişilen noteItem'ın içerisindeki data-id değerine eriş
    const noteId = Number(noteItem.dataset.id);

    // Id'si bilinen notu notes dizisinden kaldır
    notes = notes.filter((note) => note.id != noteId);

    // Güncel notes dizisine göre localeStorage'ı güncelle
    localStorage.setItem("notes", JSON.stringify(notes));

    // notes dizisinin final haline göre notları render et
    renderNotes(notes);
  }
}

// * Note elemanını güncelleyecek fonksiyon
function editNote(item) {
  // tıklanılan note elemanına eriş
  const note = item.closest(".note");

  // note'un id'sine eriş
  const noteId = parseInt(note.dataset.id);

  // id'si bilinen notu notes dizisinden bul
  const foundedNote = notes.find((note) => note.id == noteId);

  // Popup'ı aktif etmek için popup ve popupBox'a show classı ekle
  popupBox.classList.add("show");
  popup.classList.add("show");

  // Popup aktif edildiğinde arka planda yer alan elemanların kaydırılmasını engelle
  document.body.style.overflow = "hidden";

  // form içerisindeki elemanlara note'un değerlerini  ata
  form[0].value = foundedNote.title;
  form[1].value = foundedNote.description;

  // Güncelleme modu için gerekli değişkenlere atama yap
  isUpdate = true;
  updateId = noteId;

  // popup içerisindeki title ve button'ın içeriklerini güncelle
  popupTitle.textContent = "Update Note";
  popupButton.textContent = "Update";
}

// * wrapper elemanına bir olay izleyicisi ekle
wrapper.addEventListener("click", (e) => {
  // Hangi elemana tıklandı ?

  // ... elemanına tıklandıysa menu'yü aktif et
  if (e.target.classList.contains("bx-dots-horizontal-rounded")) {
    // Note ile alakalı yönetimi sağlayan menü'yü aktif et
    showMenu(e.target);
  }

  // delete-icon class'ına sahip elemana tıklandıysa
  else if (e.target.classList.contains("delete-icon")) {
    deleteNote(e.target);
  }
  // edit-icon class'ına sahip elemana tıklandıysa
  else if (e.target.classList.contains("edit-icon")) {
    editNote(e.target);
  }
});

// * Popup'ı aktif etmek için addBox elemanına bir olay izleyicisi ekle
addBox.addEventListener("click", () => {
  // Popup'ı aktif etmek için popup ve popupBox'a show classı ekle
  popupBox.classList.add("show");
  popup.classList.add("show");

  // Popup aktif edildiğinde arka planda yer alan elemanların kaydırılmasını engelle
  document.body.style.overflow = "hidden";
});

// * Popup'ı pasif etmek için closeBtn elemanına bir olay izleyicisi ekle

closeBtn.addEventListener("click", () => {
  // Popup'ı pasif etmek için popup ve popupBox'dan show classını kaldır
  popupBox.classList.remove("show");
  popup.classList.remove("show");

  // Popup pasif edildiğinde arka planda yer alan elemanların kaydırılmasını eski haline çevir
  document.body.style.overflow = "auto";

  // Popup kapatıldığında formun içerisini temizle
  form.reset();

  // Popup'ı eski haline çevir
  popupTitle.textContent = "New Note";
  popupButton.textContent = "Add";
  isUpdate = false;
  updateId = null;
});

// * Formun gönderilmesi izle
form.addEventListener("submit", (e) => {
  // Form'lar gönderildiğinde default özellik olarak sayfa yeniler.Bunu engellemek için event parametresi içerisindeki preventDefault() metodu kullanılır.
  e.preventDefault();

  // Form içerisindeki title ve description elemanlarına eriş
  const titleInput = e.target[0];
  const descriptionInput = e.target[1];

  // titleInput ve descriptionInput elemanlarının değerine eriş
  const title = titleInput.value;
  const description = descriptionInput.value;

  // Eğer title ve description yoksa kullanıcıya uyarı ver
  if (!title || !description) {
    alert("Title ve description kısımları boş bırakılamaz.");

    // Kullanıcıya uyarı verildiyse fonksiyonu durdur
    return;
  }

  // Notun gönderildiği güncel tarih verisine erişmek için ilk olarak tarih objesinden örnek al sonrasında bu obje içerisinde yer alan metotlar ile day,month,year ve id değerlerine eriş
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const updateMonth = months[month];
  const year = date.getFullYear();
  const id = date.getTime();

  // ! Popup güncelleme modunda mı ekleme modunda mı
  if (isUpdate) {
    // notes dizisi içerisinde güncellenecek elemanın sırasını bul
    const updateIndex = notes.findIndex((note) => note.id == updateId);

    // Bulunan index'deki elemanı notes dizisi içerisinde güncelle

    notes[updateIndex] = {
      title,
      description,
      date: `${updateMonth} ${day},${year} `,
      id,
    };

    // Popup'ı eski haline çevir
    popupTitle.textContent = "New Note";
    popupButton.textContent = "Add";
    isUpdate = false;
    updateId = null;
  } else {
    // Popup içerisinde erişilen değerler ve tarih objesi içerisinden elde edilen değerler ile eklenecek note elemanı için bir obje oluştur
    let noteItem = {
      title,
      description,
      date: `${updateMonth} ${day},${year} `,
      id,
    };

    // Formun gönderilmesi ile oluşturulan noteItem'ı notes dizisine ekle
    notes.push(noteItem);
  }

  // Notes dizisini localeStorage'a kayıt et
  localStorage.setItem("notes", JSON.stringify(notes));

  // Formu temizle
  // titleInput.value = "";
  // descriptionInput.value = "";

  form.reset();

  // Popup'ı pasif etmek için popup ve popupBox'dan show classını kaldır
  popupBox.classList.remove("show");
  popup.classList.remove("show");

  // Popup pasif edildiğinde arka planda yer alan elemanların kaydırılmasını eski haline çevir
  document.body.style.overflow = "auto";

  // noteları renderlamak için renderNotes fonksiyonunu çalıştır
  renderNotes(notes);
});

// Notları arayüze render edecek fonksiyon
function renderNotes(notes) {
  // Bu fonksiyon ne yapacak?
  // notes dizisinde yer alan her note elemanı için bir arayüz elemanı render etmeli

  // ! renderNotes fonksiyonu her çalıştırıldığında bizim için her seferinde önce eklenen note'ları tekrar render ediyor.Bu durumu düzeltmek için her renderNotes fonksiyonu çalıştığında arayüzdeki .notes classına sahip tüm elemanları kaldır.

  document.querySelectorAll(".note").forEach((noteItem) => noteItem.remove());

  // ! Bir arayüz elemanını ekrandan kaldırmak için remove metodu kullanılır.Bu metot kaldırılmak istenen elemanın adından sonra .remove() şeklinde kullanılır.

  // !  notes dizisi içerisindeki her eleman için bir note html'i oluştur
  notes.forEach((note) => {
    let noteHtml = `      <div class="note" data-id=${note.id} >
       
        <div class="details">
          <h2>${note.title}</h2>
          <p>${note.description}</p>
        </div>

     
        <div class="bottom">
          
          <p>${note.date}</p>

         
          <div class="settings">
         
            <i class="bx bx-dots-horizontal-rounded"></i>

        
            <ul class="menu">
              <li class="edit-icon"><i class="bx bx-edit"></i> Edit</li>
              <li class="delete-icon">
                <i class="bx bx-trash"></i>
                Delete
              </li>
            </ul>
          </div>
        </div>
      </div>`;

    // Oluşturulan html elemanını arayüze ekle

    // ! Eğer bir html elemanını bir html elemanının öncesine veya sonrasına eklemek için insertAdjacentHTML metodu kullanılır.Bu metot hangi elemana göre ekleme yapılacağını belirmemizi ve bu eklemenin önce veya sonramı ekleneceğin belirtmemizi ister.
    addBox.insertAdjacentHTML("afterend", noteHtml);
  });
}