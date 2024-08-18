const m = require("mithril");
const io = require("socket.io-client");

const WeatherApp = {
  socket: null,
  data: null,
  searchValue: "",
  loading: true,

  oninit: function () {
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", () => {
      console.log("Connected to server");
      this.fetchWeather("Greater Noida");
    });

    this.socket.on("weatherData", (data) => {
      this.data = data;
      this.loading = false;
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.description}')`;
      m.redraw();
    });

    this.socket.on("weatherError", (error) => {
      console.error("Error fetching weather:", error);
      this.data = { cod: "404" };
      this.loading = false;
      m.redraw();
    });
  },

  fetchWeather: function (city) {
    this.loading = true;
    this.socket.emit("fetchWeather", city);
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
                  this.data.city
                    ? `Weather in ${this.data.city}`
                    : "City not found"
                ),
                this.data.icon &&
                  m("span.icon", {
                    style: {
                      backgroundImage: `url(https://openweathermap.org/img/wn/${this.data.icon}@2x.png)`,
                    },
                  }),
              ]),
              this.data.temperature &&
                m(".temperature", [
                  m("h2.temperature-degree", `${this.data.temperature}°C`),
                  m(
                    ".weather-description",
                    { style: { textTransform: "capitalize" } },
                    this.data.description
                  ),
                  m(".humidity", `Humidity: ${this.data.humidity}%`),
                  m(".humidity", `Feels like: ${this.data.feels_like}°C`),
                  m(".wind", `Wind: ${this.data.wind_speed}Km/hr`),
                ]),
            ],
      ]),
    ]);
  },
};

module.exports = WeatherApp;
