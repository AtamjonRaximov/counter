const flagbox = document.querySelector("#states-box");
const loader = document.querySelector("#loader-bagraund");
let getapi = axios.get("https://restcountries.com/v3.1/all");

const flag = async () => {
  try {
    loader.classList.remove("hidden"); // Loaderni ko'rsatish
    flagbox.innerHTML = "";
    const api = await getapi;
    loader.classList.add("hidden"); // Ma'lumot kelgandan keyin loaderni yashirish
    api.data.forEach((country) => {
      const li = document.createElement("li");
      li.id = "states-child";
      li.innerHTML = `
        <a class="flag-a" href="../page/about.html?name=${encodeURIComponent(country.name.official)}">
          <img src="${country.flags.png}" alt="Flag">
          <div class="child">
            <h4><b>Nomi:</b> <span id="states-name">${country.name.official}</span></h4>
            <p><b>Yer maydoni:</b> <span>${country.area} km²</span></p>
            <p><b>Region:</b> <span>${country.region}</span></p>
            <p><b>Poytaxti:</b> <span>${country.capital ? country.capital[0] : "Noma'lum"}</span></p>
          </div>
        </a>
      `;
      flagbox.appendChild(li);
    });
    search();
  } catch (error) {
    loader.classList.add("hidden"); // Xatolik yuz bersa ham loaderni yashirish
    console.error("Xatolik yuz berdi:", error.message);
  }
};
flag();

const search = () => {
  const searchInput = document.querySelector("#search-input");
  const searchInputError = document.querySelector("#error-text");

  searchInput.addEventListener("input", () => {
    const searchInputValue = searchInput.value.toLowerCase().trim();
    const statesNames = document.querySelectorAll("#states-name");
    const statesChild = document.querySelectorAll("#states-child");
    let foundResult = false;

    statesNames.forEach((name, i) => {
      const result = name.textContent.toLowerCase().includes(searchInputValue);
      statesChild[i].style.display = result ? "" : "none";
      if (result) foundResult = true;
    });

    searchInputError.style.display = !foundResult && searchInputValue ? "block" : "none";
  });
};

const regionFunction = () => {
  const regionName = document.querySelector(".region-name");
  const regions = document.querySelectorAll(".region p");
  regions.forEach((region) => {
    region.addEventListener("click", async () => {
      regionName.textContent = region.textContent;
      loader.classList.remove("hidden"); // Loaderni ko'rsatish
      if (region.getAttribute("data-region-name") === "All") {
        getapi = axios.get("https://restcountries.com/v3.1/all");
      } else {
        getapi = axios.get(`https://restcountries.com/v3.1/region/${region.getAttribute("data-region-name")}`);
      }
      await flag();
      loader.classList.add("hidden"); // Ma'lumot kelgandan keyin loaderni yashirish
    });
  });
};
regionFunction();