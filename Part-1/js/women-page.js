let url = "../data/items.json";
let listProductHTML = document.querySelector(".women-grid");
// let mainWomanProducts = document.querySelector(".women-grid");

let data = [];
let localSavedData = [];
collectData(url);
async function collectData(url) {

    if(fetchDataFromLocalStorage().length===0)
      {
        const response = await fetch(url);
        data = await response.json();
        saveDataToLocalStorage(data);
      }
      localSavedData = fetchDataFromLocalStorage();
      localSavedData = localSavedData.filter(item => item.gender.toLowerCase() === 'female');

      displayingDataInTheGrid(localSavedData);

}
function saveDataToLocalStorage(data) {
    localStorage.setItem("items", JSON.stringify(data));
  }
function fetchDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("items") || "[]");
    
}
function displayingDataInTheGrid(localSavedData){
    let card = "";
    if (localSavedData.length === 0) {
      card = `<div style="display: flex, justify-content:center"><h3>No Data Found</h3> </div>`;
    } else {
      for (const product of localSavedData) {
       
        card = card +
            `<div class="product-card">
            <img src="${product.image}" alt="Striped Hoodie" />
            <div class="product-details">
                <h2 class="product-name">${product.name}</h2>
                <p class="price">$ ${product.price}</p>
                <p class="description">${product.desc}</p>
                <ul class="attributes">
                    <li><strong>Gender:</strong> ${product.gender}</li>
                    <li><strong>Type:</strong> ${product.type}</li>
                    <li>
                        <strong>Size:</strong>
                        <select class="size-dropdown">
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large" selected>Large</option>
                        </select>
                    </li>
                    <li><strong>Material:</strong> ${product.material}</li>
                </ul>
                <button class="add-to-cart-button">Add to Cart</button>
            </div>
            </div>`;
        }
    }
    listProductHTML.innerHTML = card;
    // mainWomanProducts.innerHTML = card;
}
