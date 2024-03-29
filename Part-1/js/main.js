/*
    open and close nav links div in small screen
*/
const navLinks = document.getElementById("nav_links");
navToggle = document.getElementById("toggle_button");
navClose = document.getElementById("close_button");

// show nav links div
navToggle.addEventListener("click", () => {
	navLinks.classList.add("show_menu");
});

// hide nav links div
navClose.addEventListener("click", () => {
	navLinks.classList.remove("show_menu");
});

// ---- load products data in local storage

const add = document.querySelector("#menSec");
<<<<<<< HEAD
const addWoman = document.querySelector("#womenSec");

=======
>>>>>>> 68236426a5a1dcf52fe49dae71758bd3864e994b
add.addEventListener("click", loadData);
addWoman.addEventListener("click", loadData);

async function loadData() {
	const response = await fetch("data/products.json");
	const usersData = await response.json();
	localStorage.setItem("products", JSON.stringify(usersData));
<<<<<<< HEAD
	add.addEventListener("click", loadData);
	async function loadData() {
		const response = await fetch("data/items.json");
		const usersData = await response.json();
		localStorage.setItem("products", JSON.stringify(usersData));
=======
>>>>>>> 68236426a5a1dcf52fe49dae71758bd3864e994b

		console.log(localStorage.getItem("users"));
	}

	loadData();
	womenSec;
}
/*
    show and hide the search bar

const searchContainer = document.querySelector(".search_container");
 searchCloseButton = document.getElementById("search_close_button");
 searchNavButton = document.querySelector("nav .search_button");

searchNavButton.addEventListener("click", () => {
  searchContainer.classList.remove("search_hidden");
  searchNavButton.style.fill = "white";
  setTimeout(() => {
    searchContainer.style.height = "100%";
  }, 10);
});

searchCloseButton.addEventListener("click", () => {
  searchContainer.style.height = "0";
  searchNavButton.style.fill = "black";
  setTimeout(() => {
    searchContainer.classList.add("search_hidden");
  }, 500);
});*/
