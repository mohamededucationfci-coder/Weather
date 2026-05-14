let getSpan = document.querySelector(".up");
window.onscroll = function () {
  if (window.scrollY > 400) {
    getSpan.style.display = "block";
  } else {
    getSpan.style.display = "none";
  }
};

getSpan.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

let getToggleElement = document.querySelector(".toggle");
if (
  window.localStorage.getItem("theme") === "dark" &&
  window.localStorage.getItem("background") === "white"
) {
  document.body.classList.add("dark");
  getToggleElement.children[1].style.cssText =
    "background-color: white ; border-radius: 20px";
  getToggleElement.children[0].style.cssText =
    "background-color: transparent ; border-radius: 20px ; ";
} else {
  getToggleElement.children[1].style.cssText =
    "background-color: transparent ; border-radius: 50%";
  getToggleElement.children[0].style.cssText =
    "background-color: #4f378a ; border-radius: 50% ;";
  getToggleElement.children[0].children[0].style.cssText = "color: white";
}
getToggleElement.onclick = function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    getToggleElement.children[1].style.cssText =
      "background-color: white ; border-radius: 20px";
    getToggleElement.children[0].style.cssText =
      "background-color: transparent ; border-radius: 20px ; ";
    localStorage.setItem("theme", "dark");
    localStorage.setItem("background", "white");
  } else {
    getToggleElement.children[1].style.cssText =
      "background-color: transparent ; border-radius: 50%";
    getToggleElement.children[0].style.cssText =
      "background-color: #4f378a ; border-radius: 50% ;";
    getToggleElement.children[0].children[0].style.cssText = "color: white";
    localStorage.setItem("theme", "white");
    localStorage.setItem("background-color", "#4f378a");
  }
};
let getCityElement = document.querySelector(".city-country");
let getTemperatureElement = document.querySelector(".temperature");
let getHumidityPercentElement = document.querySelector(".humidity-percent");
let getWindSpeedElement = document.querySelector(".wind-speed");
let getVisibilityDistanceElement = document.querySelector(
  ".visibility-distance",
);
let getUVIndexElement = document.querySelector(".uv-index");
let getForecastElement = document.querySelector(".forecast");
let getDayDetailsElement = document.querySelector(".day-details");
let getHumiditysTwoElement = document.querySelector(".sec-two-humidity");
let getHumiditysThreeElement = document.querySelector(".sec-three-humidity");
let getUVTwoElement = document.querySelector(".sec-two-uv");
let getWindElement = document.querySelector(".wind-details");
let getSunRiseElement = document.querySelector(".sunrise");
let getMoonRiseElement = document.querySelector(".moonrise");
let getSunSetElement = document.querySelector(".sunset");
let getMoonSetElement = document.querySelector(".moonset");
let getYearSpan = document.querySelector(".year");
let getDirElement = document.querySelector(".direction-wind");
async function fetchWeatherData() {
  getForecastElement.innerHTML = "";
  getCityElement.innerHTML = "";
  getDayDetailsElement.innerHTML = "";
  getHumiditysTwoElement.innerHTML = "";
  getUVTwoElement.innerHTML = "";
  getWindElement.innerHTML = "";
  try {
    const fetchData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=40dacc026d874cc1b46231019260805&q=Cairo&days=7`,
    );
    const data = await fetchData.json();
    document.images[0].src = "https:" + data.current.condition.icon;
    ((getCityElement.innerHTML = ` ${data.location.name}, ${data.location.country}`),
      (getTemperatureElement.innerHTML =
        Math.trunc(data.current.temp_c) + `<span>°C</span>`));
    document.images[1].src = "https:" + data.current.condition.icon;
    document.images[1].loading = "lazy";
    document.images[1].alt = "This Is Icon Of Weather";
    getHumidityPercentElement.innerHTML = data.current.humidity + `%`;
    getWindSpeedElement.innerHTML = data.current.wind_kph + ` Km/h`;
    getVisibilityDistanceElement.innerHTML = data.current.vis_km + `Km`;
    let state;
    if (data.current.uv >= 0 && data.current.uv <= 2) {
      state = "Safe";
    } else if (data.current.uv >= 3 && data.current.uv <= 5) {
      state = "Moderate";
    } else if (data.current.uv === 6 || data.current.uv === 7) {
      state = "High";
    } else if (data.current.uv >= 8 && data.current.uv <= 10) {
      state = "Very High";
    } else {
      state = "Extreme";
    }
    getUVIndexElement.innerHTML = data.current.uv + `(${state})`;
    for (let i = 0; i < data.forecast.forecastday["0"].hour.length; i++) {
      let createParentElement = document.createElement("div");
      let createElementOfHour = document.createElement("div");
      let createElementOfIcon = document.createElement("img");
      let createElementOfTemperature = document.createElement("div");
      if (
        +data.forecast.forecastday[0].hour[i].time.split(" ")[1].split(":")[0] +
          1 >
        12
      ) {
        createElementOfHour.innerHTML =
          +data.forecast.forecastday[0].hour[i].time
            .split(" ")[1]
            .split(":")[0] -
          12 +
          " PM";
      } else {
        createElementOfHour.innerHTML =
          +data.forecast.forecastday[0].hour[i].time
            .split(" ")[1]
            .split(":")[0] + " AM";
      }
      createElementOfIcon.src =
        "https:" + data.forecast.forecastday[0].hour[i].condition.icon;
      createElementOfIcon.loading = "lazy";
      createElementOfIcon.alt = "This Is Icon Temp";
      createElementOfTemperature.innerHTML = `${Math.trunc(data.forecast.forecastday[0].hour[i].temp_c)}°`;
      createParentElement.appendChild(createElementOfHour);
      createParentElement.appendChild(createElementOfIcon);
      createParentElement.appendChild(createElementOfTemperature);
      getForecastElement.appendChild(createParentElement);
    }
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < data.forecast.forecastday.length; i++) {
      let newDate = new Date(data.forecast.forecastday[i].date);

      let createParentElementForDays = document.createElement("div");
      let createElementDay = document.createElement("div");
      let createElementimg = document.createElement("img");
      let createElementIndicator = document.createElement("div");
      let createElementIndicatorChild = document.createElement("div");
      let createElementMaxTemp = document.createElement("div");
      let createElementMinTemp = document.createElement("div");
      createElementDay.innerHTML = days[newDate.getDay()];
      createElementimg.src =
        "https:" + data.forecast.forecastday[i].day.condition.icon;
      createElementimg.loading = "lazy";
      createElementimg.alt = "This Is Icon Of Temp";
      createElementIndicator.style.cssText =
        "width: 120px; height: 4px; border-radius: 8px;background-color: #dfdddfef; position:relative";
      let min = data.forecast.forecastday[i].day.mintemp_c;
      let max = data.forecast.forecastday[i].day.maxtemp_c;

      let widthPercent = Math.trunc((min / max) * 100);

      createElementIndicatorChild.style.cssText = `
        width: ${widthPercent}%;
        height: 100%;
        border-radius: 8px;
        background-image: linear-gradient(to right, #cacaca, #4F378A);
        position: absolute;
        top: 0;
        left: 0;
      `;
      createElementMaxTemp.innerHTML = Math.trunc(
        data.forecast.forecastday[i].day.maxtemp_c,
      );
      createElementMinTemp.innerHTML = Math.trunc(
        data.forecast.forecastday[i].day.mintemp_c,
      );

      createElementMinTemp.style.opacity = ".4";
      createElementIndicator.appendChild(createElementIndicatorChild);
      createParentElementForDays.appendChild(createElementDay);
      createParentElementForDays.appendChild(createElementimg);
      createParentElementForDays.appendChild(createElementIndicator);
      createParentElementForDays.appendChild(createElementMaxTemp);
      createParentElementForDays.appendChild(createElementMinTemp);
      getDayDetailsElement.appendChild(createParentElementForDays);
    }
    let createAvghumidityElementChild = document.createElement("div");
    let createAvghumidityInfo = document.createElement("div");
    let createAvghumidityElement = document.createElement("div");
    createAvghumidityInfo.innerHTML =
      data.forecast.forecastday[0].day.avghumidity + "%";

    createAvghumidityElement.style.cssText = `
      width: 294px;
      height: 12px;
      background-color: #bea5d78f;
      border-radius: 8px;
      position: relative;
      display: flex;
      flex-wrap: wrap;`;
    let avghumidity = data.forecast.forecastday[0].day.avghumidity;
    let width = avghumidity / 100;
    createAvghumidityElementChild.style.cssText = `
      background-color: #3b2a68;
      position: absolute;
      height: 12px;
      width: ${width * 100}%;
      border-radius: 8px;
      top: 0;
      left: 0;`;
    createAvghumidityInfo.style.cssText = `
      font-size: 24px;
      font-weight: bold;
      color: #3b2a68;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    `;
    createAvghumidityElement.appendChild(createAvghumidityElementChild);
    getHumiditysTwoElement.appendChild(createAvghumidityElement);
    getHumiditysTwoElement.appendChild(createAvghumidityInfo);
    getHumiditysThreeElement.innerHTML = `The dew point is ${Math.trunc(data.current.dewpoint_c)}° right now`;

    let createUvValue = document.createElement("div");
    let createUvIndicator = document.createElement("div");
    let createUvIndicatorChild = document.createElement("div");
    let createUvInfo = document.createElement("div");
    let stateUV;
    if (
      data.forecast.forecastday["0"].day.uv >= 0 &&
      data.forecast.forecastday["0"].day.uv <= 2
    ) {
      stateUV = "Low";
    } else if (
      data.forecast.forecastday["0"].day.uv >= 3 &&
      data.forecast.forecastday["0"].day.uv <= 5
    ) {
      stateUV = "Moderate";
    } else if (
      data.forecast.forecastday["0"].day.uv >= 6 &&
      data.forecast.forecastday["0"].day.uv <= 7
    ) {
      stateUV = "High";
    } else if (
      data.forecast.forecastday["0"].day.uv >= 8 &&
      data.forecast.forecastday["0"].day.uv <= 10
    ) {
      stateUV = "Very High";
    } else {
      stateUV = "Extreme";
    }

    createUvValue.innerHTML = `${Math.trunc(data.forecast.forecastday["0"].day.uv)} ${stateUV}`;
    createUvInfo.innerHTML = `Use sun protection until ${data.forecast.forecastday["0"].astro.sunset}`;
    createUvIndicator.style.cssText = `
      width: 264px;
      height: 12px;
      background-image: linear-gradient(to right, green, yellow, red);
      border-radius: 8px;
      position: relative`;
    let uvValue = data.forecast.forecastday["0"].day.uv;
    let tempUV = (uvValue / 12) * 100;
    createUvIndicatorChild.style.cssText = `
    width: 18px;
    height: 16px;
    background-color: white;
    position: absolute;
    top: -2px;
    left: ${tempUV}%;
    border: 2px solid #4F378A;
    border-radius: 8px;
    `;

    createUvIndicator.appendChild(createUvIndicatorChild);
    getUVTwoElement.appendChild(createUvValue);
    getUVTwoElement.appendChild(createUvIndicator);
    getUVTwoElement.appendChild(createUvInfo);
    let windDegree = data.forecast.forecastday[0].hour[0].wind_degree;
    let createArrow = document.createElement("span");
    createArrow.style.cssText = `
      position: absolute;
      transform: translate(-50%, -50%) rotate(${windDegree}deg);
      width: 2px;
      height: 50px;
      top: 50%;
      left: 50%;
      border-radius: 6px;
      background-image: linear-gradient(to top, #e9ddff, #4f378a);
    `;
    getDirElement.appendChild(createArrow);
    let createSpeedOfWind = document.createElement("div");
    let createDetailsOfWindSpeed = document.createElement("div");
    createSpeedOfWind.innerHTML = `<div>${Math.trunc(data.forecast.forecastday[0].day.maxwind_kph)} </div><div> Km/h </div>`;
    let currentHour = new Date().getHours();
    createDetailsOfWindSpeed.innerHTML = `Gusts up to ${data.forecast.forecastday[0].hour[currentHour].gust_kph} Km/h`;
    getWindElement.appendChild(createSpeedOfWind);
    getWindElement.appendChild(createDetailsOfWindSpeed);
    getSunRiseElement.innerHTML =
      data.forecast.forecastday[0].astro.sunrise.split(" ")[0];
    getSunSetElement.innerHTML =
      data.forecast.forecastday[0].astro.sunset.split(" ")[0];
    getMoonRiseElement.innerHTML =
      data.forecast.forecastday[0].astro.moonrise.split(" ")[0];
    getMoonSetElement.innerHTML =
      data.forecast.forecastday[0].astro.moonset.split(" ")[0];
    let year = new Date().getFullYear();
    getYearSpan.innerHTML = year;
  } catch (e) {
    alert("Failed to load weather data");
  }
}

let hiddenElements = document.querySelectorAll(".hidden");
const observe = new IntersectionObserver((entreis) => {
  entreis.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

hiddenElements.forEach((ele) => {
  observe.observe(ele);
});
fetchWeatherData();
setInterval(fetchWeatherData, 300000);
