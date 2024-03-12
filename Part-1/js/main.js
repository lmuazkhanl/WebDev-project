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

/*
    show and hide the search bar
*/
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
});


