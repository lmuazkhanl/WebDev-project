// document.addEventListener("DOMContentLoaded", async () => {
//     const books = await getBooks('/api/products');
//     const h=books.json();
// });

async function hi(){
    const response = await fetch(`http://localhost:3000/api/products`)
    const savv = await response.json()
    console.log(savv)
}

hi()