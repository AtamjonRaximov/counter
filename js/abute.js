const hrefname = window.location.search;
const URLparams = new URLSearchParams(hrefname);
const countryName = URLparams.get("name");

const loader = document.querySelector("#loader-bagraund");
const stetsimg = document.querySelector("#states-img");

const state = async () => {
  try {
    loader.classList.remove("hidden"); // Loaderni ko'rsatish
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    loader.classList.add("hidden"); // Ma'lumot kelgandan keyin loaderni yashirish
    const country = response.data[0];

    document.querySelector("#states-name").textContent = country.name.common;
    stetsimg.setAttribute("src", country.flags.svg);

    document.querySelector("#states-box").innerHTML = `
      <ul class="text">
        <li><h3>Poytaxti:</h3><p>${country.capital ? country.capital[0] : "Noma'lum"}</p></li>
        <li><h3>Axolisi:</h3><p>${country.population.toLocaleString()} kishi</p></li>
        <li><h3>Maydoni:</h3><p>${country.area.toLocaleString()} km²</p></li>
        <li><h3>Region:</h3><p>${country.region}</p></li>
        <li><h3>Fifa:</h3><p>${country.fifa}</p></li>
        <li><h3>Kichik mintaqa:</h3><p>${country.subregion || "Noma'lum"}</p></li>
        <li><h3>Pul birligi:</h3><p>${Object.values(country.currencies)[0].name}</p></li>
      </ul>
    `;

    const borders = country.borders || [];
    document.querySelector("#states-borders").innerHTML = `
      <li>Chegaradoshlar:</li>
      ${borders.length > 0
        ? borders.map((border) => `<li><a href="javascript:void(0);" onclick="fetchBorderCountry('${border}')">${border}</a></li>`).join("")
        : "<li>No border</li>"}
    `;
  } catch (error) {
    loader.classList.add("hidden"); // Xatolik yuz bersa ham loaderni yashirish
    console.error("Xatolik yuz berdi:", error.message);
  }
};

const fetchBorderCountry = async (borderCode) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${borderCode}`);
    const countryName = response.data[0].name.official;
    window.location.href = `../page/about.html?name=${encodeURIComponent(countryName)}`;
  } catch (error) {
    console.error("Chegaradosh davlatni olishda xatolik yuz berdi:", error.message);
  }
};

state();