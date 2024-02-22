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
