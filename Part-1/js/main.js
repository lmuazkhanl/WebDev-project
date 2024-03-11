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

/* change background color in login page based on selectedvalue */
document.addEventListener("DOMContentLoaded", function () {
  const loginTypeSelect = document.getElementById("loginType");
  const formContainer = document.querySelector(".form-container");

  loginTypeSelect.addEventListener("change", function () {
    const selectedValue = this.value;
    let backgroundImage = "";

    switch (selectedValue) {
      case "customer":
        backgroundImage =
          'url("../Images/login/customer_login_background.jpg")';
        break;
      case "seller":
        backgroundImage = 'url("../Images/login/seller_login_background.jpg")';
        break;
      case "admin":
        backgroundImage = 'url("../Images/login/admin_login_background.jpg")';
        break;
      default:
        backgroundImage = "";
    }

    formContainer.style.backgroundImage = backgroundImage;
  });
});
