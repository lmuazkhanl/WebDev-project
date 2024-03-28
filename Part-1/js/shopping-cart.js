document.addEventListener("DOMContentLoaded", () => {
	let iconCart = document.querySelector(".cart_logo");
	let closeCart = document.querySelector(".close-shopping-cart");
	let body = document.querySelector("body");
	let listProductHTML = document.querySelector(".product-grid");
	let listCartHTML = document.querySelector(".listCart");
	let iconCartSpan = document.querySelector(".cart_logo span");

	let listProducts = [];
	let carts = [];

	iconCart.addEventListener("click", () => {
		body.classList.toggle("showCart");
	});
	closeCart.addEventListener("click", () => {
		body.classList.toggle("showCart");
	});

	const addDataToHTML = () => {
		listProductHTML.innerHTML = "";
		if (listProducts.length > 0) {
			listProducts.forEach((product) => {
				let newProduct = document.createElement("div");
				newProduct.classList.add("product-card");
				newProduct.classList.add("men-grid");
				newProduct.dataset.id = product.id;
				newProduct.innerHTML = `<img src="${product.image}" alt="Striped Hoodie" />
				<div class="product-details">
					<h2 class="product-name">${product.name}</h2>
					<p class="price">$ ${product.price}</p>
					<p class="description">
					${product.desc}
					</p>
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
				</div>`;
				listProductHTML.appendChild(newProduct);
			});
		}
	};

	listProductHTML.addEventListener("click", (event) => {
		let positionClick = event.target;
		if (positionClick.classList.contains("add-to-cart-button")) {
			let product_id = positionClick.parentElement.parentElement.dataset.id;
			addToCart(product_id);
		}
	});

	const addToCart = (product_id) => {
		let positionThisProductInCart = carts.findIndex(
			(value) => value.product_id == product_id
		);
		if (carts.length <= 0) {
			carts = [
				{
					product_id: product_id,
					quantity: 1,
				},
			];
		} else if (positionThisProductInCart < 0) {
			carts.push({
				product_id: product_id,
				quantity: 1,
			});
		} else {
			carts[positionThisProductInCart].quantity =
				carts[positionThisProductInCart].quantity + 1;
		}
		addCartToHTML();
		addCartToMemory();
	};

	const addCartToMemory = () => {
		localStorage.setItem("cart", JSON.stringify(carts));
	};

	const addCartToHTML = () => {
		listCartHTML.innerHTML = ``;
		let totalQuantity = 0;
		if (carts.length > 0) {
			carts.forEach((cart) => {
				totalQuantity = totalQuantity + cart.quantity;
				let newCart = document.createElement("div");
				newCart.classList.add("shop-cart-item");
				newCart.dataset.id = cart.product_id;
				let positionProduct = listProducts.findIndex(
					(value) => value.id == cart.product_id
				);
				let info = listProducts[positionProduct];
				newCart.innerHTML = `<div class="image-shop-cart">
				<img src="${info.image}" alt="" />
			</div>
			<div class="shop-cart-item-name">${info.name}</div>
			<div class="item-price">$ ${info.price * cart.quantity}</div>
			<div class="item-quantity">
				<span class="minus"> < </span>
				<span> ${cart.quantity} </span>
				<span class="plus"> > </span>
			</div`;
				listCartHTML.appendChild(newCart);
			});
		}
		iconCartSpan.innerText = totalQuantity;
	};

	listCartHTML.addEventListener("click", (event) => {
		let positionClick = event.target;
		if (
			positionClick.classList.contains("minus") ||
			positionClick.classList.contains("plus")
		) {
			let product_id = positionClick.parentElement.parentElement.dataset.id;
			console.log(product_id);
			let type = "minus";
			if (positionClick.classList.contains("plus")) {
				type = "plus";
			}
			changeQuantity(product_id, type);
		}
	});

	const changeQuantity = (product_id, type) => {
		let positionItemInCart = carts.findIndex(
			(value) => value.product_id == product_id
		);
		if (positionItemInCart >= 0) {
			switch (type) {
				case "plus":
					carts[positionItemInCart].quantity =
						carts[positionItemInCart].quantity + 1;
					break;

				default:
					let valueChange = carts[positionItemInCart].quantity - 1;
					if (valueChange > 0) {
						carts[positionItemInCart].quantity = valueChange;
					} else {
						carts.splice(positionItemInCart, 1);
					}
					break;
			}
		}
		addCartToMemory();
		addCartToHTML();
	};

	const initApp = () => {
		// get data from products.json
		fetch("./data/products.json")
			.then((Response) => Response.json())
			.then((data) => {
				listProducts = data;
				addDataToHTML();

				// get data from LocalStorage
				if (localStorage.getItem("cart")) {
					carts = JSON.parse(localStorage.getItem("cart"));
					addCartToHTML();
				}
			});
	};
	initApp();
});