const apiKey = "AIzaSyDd2J3Tgm6kx61qMjtrFd8ycq3yo-KDDdg";

const catLinks = document.querySelector("#catlinks");
const catBtn = document.querySelector(".cat-btn");
const showBooks = document.querySelector(".book-container");
const catTitle = document.querySelector(".catTitle");

const catQ = {
  romance: "subject:romance&maxResults=40",
  mystery: "subject:mystery&maxResults=40",
  psychology: "subject:psychology&maxResults=40",
  classics: "subject:classics&maxResults=40",
  crime: "subject:crime&maxResults=40",
  horror: "subject:horror&maxResults=40",
};



catLinks.addEventListener("click", (e) => {
  e.preventDefault();
  selectedCat = e.target.getAttribute("data-category");
  catTitle.innerHTML = `<h1>${selectedCat}</h1>`;
  if (selectedCat && catQ[selectedCat]) {
    const query = catQ[selectedCat];

    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const randomTenBooks = [];
        
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * data.items.length);
          const book = data.items[randomIndex];
          randomTenBooks.push(book);

         showBooks.innerHTML = randomTenBooks.map(  (book) =>
              `
          <div class="book-item">
            <img class="book-img" src="${book.volumeInfo.imageLinks.thumbnail}">
            <h2 class="book-author">${book.volumeInfo.title}</h2>
            <p>${
              book.volumeInfo.authors
                ? book.volumeInfo.authors[0]
                : "Author not available"
            }</p>
          </div>`
          )
          .join("");
        console.log(data);
        }
         
      }).catch((error) => {
        console.error("API isteği başarısız oldu: " + error);
      });
  }
});
