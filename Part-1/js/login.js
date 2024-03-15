document.addEventListener("DOMContentLoaded", () => {
  /* change background color in login page based on selectedvalue */
  const loginTypeSelect = document.querySelector("#loginType");
  const formContainer = document.querySelector(".form-container");

  loginTypeSelect.addEventListener("change", switchBackgroundLogin);

  function switchBackgroundLogin() {
    const selectedValue = loginTypeSelect.value;
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
  }

  /* Implement Login Functionality */
  const userType = document.querySelector("#loginType");
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
});
