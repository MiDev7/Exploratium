const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const errorPassword = document.querySelector("#error-password");
const errorConfirmPassword = document.querySelector("#error-confirm-password");
const fullNameInput = document.querySelector("#full-name");
const dateOfBirthInput = document.querySelector("#date-of-birth");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const buttonSubmit = document.querySelector("#button-submit");

var data = {
  name: "",
  dateOfBirth: "",
  username: "",
  email: "",
  password: "",
  lastLogin: "",
};

const passwordCheck =
  /^(?=.*[A-Z]{4,})(?=.*[a-z]{3,})(?=.*\d{3,})(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}).{13,}$/;

function checkPassword() {
  if (passwordCheck.test(passwordInput.value)) {
    errorPassword.classList.remove("bg-red-600");
    errorPassword.innerHTML = "";
    console.log("strong");
  } else {
    errorPassword.classList.add("bg-red-600");
    errorPassword.innerHTML = "weak";
  }
}

function checkConfirmPassword() {
  if (passwordInput.value === confirmPasswordInput.value) {
    errorConfirmPassword.classList.remove("bg-red-600");
    errorConfirmPassword.innerHTML = "";
  } else {
    errorConfirmPassword.classList.add("bg-red-600");
    errorConfirmPassword.innerHTML = "Password does not match";
  }
}

passwordInput.addEventListener("keyup", checkPassword);
confirmPasswordInput.addEventListener("keyup", checkConfirmPassword);

buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    errorPassword.innerHTML === "" &&
    errorConfirmPassword.innerHTML === "" &&
    fullNameInput.value !== "" &&
    dateOfBirthInput.value !== "" &&
    usernameInput.value !== "" &&
    emailInput.value !== "" &&
    passwordInput.value !== "" &&
    confirmPasswordInput.value !== ""
  ) {
    data.name = fullNameInput.value;
    data.dateOfBirth = dateOfBirthInput.value;
    data.username = usernameInput.value;
    data.email = emailInput.value;
    data.password = passwordInput.value;

    const storedData = localStorage.getItem("users");
    let dataArray = [];

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        dataArray = parsedData;
        console.log(dataArray);
        if (
          dataArray.find(
            (user) =>
              user.username === data.username || user.email === data.email
          )
        ) {
          console.log("Error: Username or email already exists");
          return;
        } else {
          dataArray.push(data);
          localStorage.setItem("users", JSON.stringify(dataArray));
          window.location.replace("../index.html");
        }
      }
    } else {
      dataArray.push(data);
      localStorage.setItem("users", JSON.stringify(dataArray));
    }
  } else {
    console.log("Error: Please fill in all the required fields");
  }
});
