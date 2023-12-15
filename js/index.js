/**
 * Represents a button element.
 * @type {HTMLElement}
 */
const button = document.querySelector("#wooden-button");
window.onload = function () {
  if (sessionStorage.getItem("isLogged") === "true") {
    button.innerHTML = "Play";
    window.location.replace("../pages/play.html");
  } else {
    button.innerHTML = "Sign Up";
    window.location.replace("../pages/signup.html");
  }
};
