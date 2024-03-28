function itemsToHTMLView(items) {
    return items.map(
        (item) => `
    <div class="product-card">
        <img src="${item.image}" alt="${item.name}" />
        <div class="product-details">
            <h2 class="product-name">${item.name}</h2>
            <p class="price">$${item.price}</p>
            <p class="description">${item.desc}</p>
            <ul class="attributes">
                <li><strong>Gender:</strong> ${item.gender}</li>
                <li><strong>Type:</strong> ${item.type}</li>
                <li><strong>Material:</strong> ${item.material}</li>
            </ul>
            <button class="add-to-cart-button">Add to Cart</button>
        </div>
    </div>
    `
    ).join('');
}
function displaySellerItems() {
    const allItems = JSON.parse(localStorage.getItem("products"));

    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = itemsToHTMLView(allItems).join("");
}