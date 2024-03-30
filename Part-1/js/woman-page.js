function displayingDataInTheGrid(localSavedData) {
    let card = "";
    if (localSavedData.length === 0) {
        card = `<div style="display: flex, justify-contenst:center"><h3>No Data Found</h3> </div>`;
    } else {
        for (const product of localSavedData) {
            // Filter items based on gender
            if (product.gender === "female") {
                card += `<div class="product-card">
                          <img src="${product.image}" alt="${product.name}" />
                          <div class="product-details">
                              <h2 class="product-name">${product.name}</h2>
                              <p class="price">$ ${product.price}</p>
                              <p class="description">${product.description}</p>
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
    }
    // Append the generated HTML to the grid container
    document.querySelector(".product-grid").innerHTML = card;
}

// Retrieve items data from localStorage
const items = JSON.parse(localStorage.getItem("items"));

// Call the function to display items in the grid
displayingDataInTheGrid(items);
