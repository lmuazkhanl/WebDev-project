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