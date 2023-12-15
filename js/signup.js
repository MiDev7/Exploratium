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

/**
 * Calculates the age based on the given birthdate.
 * @param {Date} birthdate - The birthdate of the person.
 * @returns {number} The calculated age.
 */
function calculateAge(birthdate) {
  const now = new Date();
  const diff = now - birthdate;
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}
/**
 * Checks the validity of a password.
 */
function checkPassword() {
  if (passwordCheck.test(passwordInput.value)) {
    errorPassword.classList.remove("bg-red-600");
    errorPassword.innerHTML = "";
  } else {
    errorPassword.classList.add("bg-red-600");
    errorPassword.innerHTML =
      "weak(password must contain at least 4 uppercase, 3 lowercase, 3 digits, 3 special characters and 13 characters)";
  }
}

/**
 * Checks if the password matches the confirm password input value.
 */
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

    const ageValue = calculateAge(dateOfBirthInput.valueAsDate);

    if (ageValue < 7) {
      alert("You must be at least 7 years old to sign up");
      return;
    } else {
      data.dateOfBirth = dateOfBirthInput.value;
    }

    data.username = usernameInput.value;
    data.email = emailInput.value;
    data.password = passwordInput.value;

    const storedData = localStorage.getItem("users");
    let dataArray = [];

    if (storedData) {
      // if there is data in the local storage
      const parsedData = JSON.parse(storedData);

      // if the data in the local storage is an array
      if (Array.isArray(parsedData)) {
        dataArray = parsedData;
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
          window.location.href = "../index.html";
        }
      }
    } else {
      // if there is no data in the local storage
      dataArray.push(data);
      localStorage.setItem("users", JSON.stringify(dataArray));
    }
  } else {
    console.log("Error: Please fill in all the required fields");
  }
});
