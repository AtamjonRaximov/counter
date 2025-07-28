const darkbtn = document.querySelector("#dark-btn");
const body = document.body;
const darktext = document.querySelector("#dark-text");
const darkicon = document.querySelector("#dark-icon");

if (localStorage.getItem("dark-btn") === "dark") {
  body.classList.add("dark");
  darkicon.classList.replace("fa-moon", "fa-sun");
  darktext.textContent = "Light";
}

darkbtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("dark-btn", "dark");
    darkicon.classList.replace("fa-moon", "fa-sun");
    darktext.textContent = "Light";
  } else {
    localStorage.removeItem("dark-btn");
    darkicon.classList.replace("fa-sun", "fa-moon");
    darktext.textContent = "Dark";
  }
});