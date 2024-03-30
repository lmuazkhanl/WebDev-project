document.addEventListener("DOMContentLoaded", () => {
    // Function to convert items data to HTML markup
    function itemsToHTML(items) {
        return items
            .map(
                (item) => `
<div class="product-card">
  <img src="${item.image}" alt="${item.name}" />
  <div class="product-details">
    <h2 class="product-name">${item.name}</h2>
    <p class="seller-name">Sold by: ${item.sellername}</p>
    <p class="price">$${item.price}</p>
    <p class="description">${item.description}</p>
    <ul class="attributes">
      <li><strong>Gender:</strong> ${item.gender}</li>
      <li><strong>Type:</strong> ${item.type}</li>
      <li><strong>Color:</strong> ${item.color}</li>
      <li>
      <li><strong>Material:</strong> ${item.material}</li>
    </ul>
  </div>
</div>
`
            )
            .join("");
    }

    // Retrieve filtered items and search query from localStorage
    const filteredItems = JSON.parse(localStorage.getItem("filteredItems"));
    const searchQuery = localStorage.getItem("searchQuery");

    // Update the page with the filtered items and search query
    const productGrid = document.querySelector(".product-grid");
    const searchQuerySpan = document.querySelector(".search-query");

    searchQuerySpan.innerHTML = searchQuery;
    productGrid.innerHTML = itemsToHTML(filteredItems);

    // Clear localStorage to avoid data persisting across sessions
    localStorage.removeItem("filteredItems");
    localStorage.removeItem("searchQuery");
});
