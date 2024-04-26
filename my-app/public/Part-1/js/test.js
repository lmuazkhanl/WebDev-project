// document.addEventListener("DOMContentLoaded", async () => {
//     const books = await getBooks('/api/products');
//     const h=books.json();
// });
let items = {};

async function hi() {
    response = await fetch(`http://localhost:3000/api/products`);
    items = await response.json();
    console.log(items);
}

hi();
