document.addEventListener("DOMContentLoaded", () => {
	let purchase_button = document.querySelector(".checkout_button");
	let totalHTML = document.querySelector(".checkout-total");
	let total = localStorage.getItem("totalprice");
	let purchase_history = [];
	totalHTML.innerHTML = ``;
	totalHTML.innerHTML = `<div class="checkout-total">Total: $ ${total}</div>`;

	purchase_button.addEventListener("click", () => {
		purchase_history = localStorage.getItem(JSON.parse("cart"));
	});
	console.log(localStorage.getItem(JSON.parse("cart")));
});
