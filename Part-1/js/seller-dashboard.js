document.addEventListener("DOMContentLoaded", () => {
    // Display name of the Seller
    const sellerName = JSON.parse(localStorage.getItem("session")).username;
    document.querySelectorAll(".seller_Name").forEach((element) => {
        element.innerHTML = sellerName;
    });

    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            const pageName = item.classList[1];
            showPage(`${pageName}-Page`);
        });
    });

    function showPage(pageName) {
        // Hide all seller pages
        const pages = document.querySelectorAll(".seller-Page");
        pages.forEach((page) => {
            page.style.display = "none";
        });

        // Show the selected page
        const selectedPage = document.querySelector(`.${pageName}`);
        if (selectedPage) {
            console.log(selectedPage);
            selectedPage.style.display = "block";
            if (selectedPage === document.querySelector(".Current-Catalogue-Page")) displaySellerItems();
            if (selectedPage === document.querySelector(".Sale-History-Page")) displaySaleHistory();
        }
    }

    // Log Out
    const logOutButton = document.querySelector(".log-out-button");
    logOutButton.addEventListener("click", () => {
        localStorage.removeItem("session");
        window.location.href = "login.html";
    });

    function itemsToHTMLSellerView(items) {
        return items.map(
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
      <li><strong>Material:</strong> ${item.material}</li>
      <li><strong>Quantity:</strong> ${item.quantity}</li>
    </ul>
  </div>
</div>
`
        );
    }

    function generateSaleHistoryCard(items) {
        return items.map(
            (item) => `
            <div class="sale-history-product-card">
                <img src="${item.image}" alt="${item.name}" />
                <div class="product-details">
                    <h2 class="product-name">${item.name}</h2>
                    <p class="price-text">Sold at <span class="price">$${item.price}</span></p>
                    <p class="stock-remaining-text">Stock Remaining : <span class="quantity">${item.quantity}</span></p>
                    <p class="stock-sold-text">Items Sold : <span class="quantity-sold">${calculateQuantitySold(item)}</span></p>
                    <h2 class="customer-list-heading">Customer List</h2>
                    <ul class="customer-list">${generateCustomerList(item)}</ul>
                </div>
            </div>
        `
        );
    }

    function calculateQuantitySold(item) {
        console.log(item);
        return item.purchaseHistory.reduce((total, purchase) => total + purchase.quantity, 0);
    }

    function generateCustomerList(item) {
        return item.purchaseHistory.map((purchase) => `<li class="customer-name">${purchase.customer}</li>`).join("");
    }

    function filterItemsBySeller(items, sellerName) {
        return items.filter((item) => item.sellername === sellerName);
    }

    // Function to display seller items in the grid
    function displaySellerItems() {
        const allItems = JSON.parse(localStorage.getItem("items")).items;
        const sellerItems = filterItemsBySeller(allItems, sellerName);

        const productGrid = document.querySelector(".product-grid");
        productGrid.innerHTML = itemsToHTMLSellerView(sellerItems).join("");
    }

    function displaySaleHistory() {
        const allItems = JSON.parse(localStorage.getItem("items")).items;
        const sellerItems = filterItemsBySeller(allItems, sellerName);

        const productGridSaleHistory = document.querySelector(".product-grid-sale-history");
        productGridSaleHistory.innerHTML = generateSaleHistoryCard(sellerItems).join("");
    }
});
