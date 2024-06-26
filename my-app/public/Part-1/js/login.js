var loginButton = document.querySelector(".login_button");
loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("hello");

    var session = JSON.parse(localStorage.getItem("session"));
    if (!session || !session.loggedIn) {
        window.location.href = "login.html";
    }

    var userType = session.userType;
    if (userType === "customer") {
        window.location.href = "customer-dashboard.html";
    } else if (userType === "seller") {
        window.location.href = "seller-dashboard.html";
    }
});

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
                backgroundImage = 'url("../Images/login/customer_login_background.jpg")';
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

    async function fetchUserData() {
        try {
            const response = await fetch("http://localhost:3000/api/users");
            const data = await response.json();
            localStorage.setItem("users", JSON.stringify(data));
            localStorage.users.admin = JSON.stringify({ username: admin, password: password });

            console.log(localStorage.getItem("users"));
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    fetchUserData();

    const loginForm = document.querySelector(".loginForm");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const userType = document.querySelector("#loginType").value;
        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

        const user = validateUser(username, password, userType);

        if (user) {
            if (userType == "admin") {
                window.location.href = "http://localhost:3000/";
            }
            loginUser(username, userType, user.money_balance, user.customerId, user.sellerId, user.bank_account_balance);
        } else {
            alert("Invalid username or password");
        }
    });

    // Function to validate user credentials
    function validateUser(username, password, userType) {
        const users = JSON.parse(localStorage.getItem("users"));
        // only one admin
        if (userType === "admin" && username == "admin" && password == "password") {
            return true;
        }
        const userArray = users[userType + "s"]; // +"s" because customer will become customers
        const user = userArray.find((user) => user.username === username && user.password === password);
        return user;
    }

    // Function to handle user login
    function loginUser(username, userType, moneyBalance, customerId, sellerId, bank_account_balance) {
        // create session
        const session = {
            username: username,
            userType: userType,
            loggedIn: true,
            money_balance: moneyBalance,
            customerId: customerId,
            sellerId: sellerId,
            sellerBalance: bank_account_balance,
        };
        localStorage.setItem("session", JSON.stringify(session));

        // redirect to differnet locations based on the userType
        if (userType === "customer") {
            window.location.href = "customer-dashboard.html";
        } else if (userType === "seller") {
            window.location.href = "seller-dashboard.html";
        } else if (userType === "admin") {
            localStorage.clear();
        }
    }
});
