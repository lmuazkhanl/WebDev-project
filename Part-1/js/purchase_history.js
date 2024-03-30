document.addEventListener("DOMContentLoaded", function () {
    var session = JSON.parse(localStorage.getItem("session"));
    if (!session || !session.loggedIn) {
        window.location.href = "login.html";
        return;
    }

    var purchaseHistoryContainer = document.getElementById("purchase-history");

    var userTitle = document.getElementById("user-title");
    userTitle.textContent = "Purchase History for " + session.username;

    var items = JSON.parse(localStorage.getItem("items"));

    var userPurchaseHistory = [];
    items.forEach(function (item) {
        item.purchaseHistory.forEach(function (purchase) {
            if (purchase.customer === session.username) {
                userPurchaseHistory.push({
                    itemName: item.name,
                    quantity: purchase.quantity,
                    image: item.image,
                });
            }
        });
    });

    userPurchaseHistory.forEach(function (purchase) {
        var purchaseHistoryItem = document.createElement("div");
        purchaseHistoryItem.classList.add("purchase-history-item");
        purchaseHistoryItem.innerHTML = `
            <img src="${purchase.image}" alt="${purchase.itemName}">
            <div>
                <p>Item: ${purchase.itemName}</p>
                <p>Quantity: ${purchase.quantity}</p>
            </div>
        `;
        purchaseHistoryContainer.appendChild(purchaseHistoryItem);
    });

    var logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("session");
        localStorage.removeItem("cart");
        window.location.href = "login.html";
    });
});
