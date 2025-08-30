// const button = document.getElementById("alertButton");
// const input = document.getElementById("inputField");
// const cityNames = document.getElementById("cityNames");
// const localTime = document.getElementById("localTime");
// const temp = document.getElementById("temp");


// async function getdata(cityName) {
//   const promis = await fetch(`http://api.weatherapi.com/v1/current.json?key=82693f2449d54dfb9de181008253008&q=${cityName}&aqi=yes`)
//   return await promis.json();

// }
// button.addEventListener("click", async () => {
//   const value = input.value
//   const result = await getdata(value);
//   cityNames.innerText = `${result.location.name}, ${result.location.country}, ${result.location.region}`;
//   localTime.innerText = `Local Time: ${result.location.localtime}`;
//   temp.innerText = `Temperature: ${result.current.temp_c}°C`;
// })


const button = document.getElementById("alertButton");
const input = document.getElementById("inputField");
const cityNames = document.getElementById("cityNames");
const localTime = document.getElementById("localTime");
const temp = document.getElementById("temp");
const weatherCard = document.getElementById("weatherCard");
const loader = document.getElementById("loader");
const app = document.getElementById("app");

// Simulate loading at page start
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
    app.style.display = "block";
  }, 2500); // loader visible for 2.5 sec
});

async function getdata(cityName) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=82693f2449d54dfb9de181008253008&q=${cityName}&aqi=yes`
  );
  return await response.json();
}

button.addEventListener("click", async () => {
  const value = input.value;
  if (!value) return alert("Please enter a city name!");

  // Show loader while fetching
  loader.style.display = "block";
  app.style.display = "none";

  try {
    const result = await getdata(value);

    cityNames.innerText = `${result.location.name}, ${result.location.country}, ${result.location.region}`;
    localTime.innerText = `Local Time: ${result.location.localtime}`;
    temp.innerText = `Temperature: ${result.current.temp_c}°C`;

    // After data is fetched → hide loader, show app
    loader.style.display = "none";
    app.style.display = "block";

    weatherCard.style.animation = "none";
    weatherCard.offsetHeight; // reflow
    weatherCard.style.animation = "slideUp 0.7s ease forwards";
  } catch (error) {
    cityNames.innerText = "City not found!";
    localTime.innerText = "";
    temp.innerText = "";
    console.error("Error:", error);

    loader.style.display = "none";
    app.style.display = "block";
  }
});
