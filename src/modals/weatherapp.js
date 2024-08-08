// app.js
const m = require("mithril");

const WeatherApp = {
  apikey: "5bc2b4f40acfffa046713955a4370d52",
  data: null,
  searchValue: "",
  loading: true,

  fetchWeather: function (city) {
    this.loading = true;
    return m
      .request({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`,
      })
      .then((data) => {
        this.data = data;
        if (data.cod == 200) {
          document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.weather[0].description}')`;
        }
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        this.data = { cod: "404" };
      })
      .finally(() => {
        this.loading = false;
        m.redraw();
      });
  },

  oninit: function () {
    this.fetchWeather("Greater Noida");
  },

  view: function () {
    return m(".card", [
      m(".search", [
        m("input.search-bar[placeholder=City name]", {
          oninput: (e) => (this.searchValue = e.target.value),
          onkeyup: (e) => {
            if (e.key === "Enter") this.fetchWeather(this.searchValue);
          },
        }),
        m(
          "button",
          {
            onclick: () => this.fetchWeather(this.searchValue),
          },
          [
            m(
              "svg[stroke=currentColor][fill=currentColor][stroke-width=0][viewBox=0 0 1024 1024][height=1.5em][width=1.5em][xmlns=http://www.w3.org/2000/svg]",
              m(
                "path[d=M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z]"
              )
            ),
          ]
        ),
      ]),
      m(".weather", { class: this.loading ? "loading" : "" }, [
        this.loading
          ? m("div", "Loading...")
          : this.data && [
              m(".location", [
                m(
                  "h1.location-city",
                  this.data.cod === 200
                    ? `Weather in ${this.data.name}`
                    : this.data.cod === 400
                    ? "Something went wrong!"
                    : "City not found"
                ),
                this.data.cod === 200 &&
                  m("span.icon", {
                    style: {
                      backgroundImage: `url(https://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png)`,
                    },
                  }),
              ]),
              this.data.cod === 200 &&
                m(".temperature", [
                  m("h2.temperature-degree", `${this.data.main.temp}°C`),
                  m(
                    ".weather-description",
                    { style: { textTransform: "capitalize" } },
                    this.data.weather[0].description
                  ),
                  m(".humidity", `Humidity: ${this.data.main.humidity}%`),
                  m(".humidity", `Feels like: ${this.data.main.feels_like}°C`),

                  m(".wind", `Wind: ${this.data.wind.speed}Km/hr`),
                ]),
            ],
      ]),
    ]);
  },
};
module.exports = WeatherApp;
