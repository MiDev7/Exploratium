const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const buttonLogin = document.querySelector("#button-login");

const storedData = localStorage.getItem("users");
let dataArray = [];

if (storedData) {
  const parsedData = JSON.parse(storedData);
  if (Array.isArray(parsedData)) {
    dataArray = parsedData;
  }
}

/**
 * Logs in the user and redirects to the home page if the credentials are valid.
 * If the user is already logged in, it redirects to the home page.
 * @returns {void}
 */
function login() {
  const today = new Date();
  const todayTime = today.getTime();

  if (sessionStorage.getItem("isLogged") === "true") {
    window.location.href = "../pages/home.html";
  } else {
    buttonLogin.addEventListener("click", () => {
      const valueUsername = usernameInput.value;
      const valuePassword = passwordInput.value;

      let isFound = false;
      dataArray.forEach((item) => {
        if (
          item.username === valueUsername &&
          item.password === valuePassword
        ) {
          isFound = true;
          sessionStorage.setItem("isLogged", "true");
          sessionStorage.setItem("currentUser", valueUsername);

          const lastLogin = localStorage.getItem("lastLogin");
          if (lastLogin) {
            const lastLoginTime = parseInt(lastLogin);
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;
            if (todayTime - lastLoginTime >= thirtyDays) {
              localStorage.removeItem("lastLogin");
            } else {
              localStorage.setItem("lastLogin", todayTime.toString());
              window.location.href = "../pages/home.html";
            }
          } else {
            localStorage.setItem("lastLogin", todayTime.toString());
            window.location.href = "../pages/home.html";
          }
        }
      });

      if (!isFound) {
        alert("Invalid username or password");
      }
    });
  }
}

login();
