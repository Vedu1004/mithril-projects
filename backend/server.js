const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const corsOptions = {
  origin: "*", // Be cautious with this in production
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
const io = require("socket.io")(http, {
  cors: corsOptions,
});

const sqlite3 = require("sqlite3").verbose();
const axios = require("axios");
const db = new sqlite3.Database("./weather.db");

db.run(`CREATE TABLE IF NOT EXISTS weather_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT,
  temperature REAL,
  description TEXT,
  humidity INTEGER,
  feels_like REAL,
  wind_speed REAL,
  icon TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

const API_KEY = "5bc2b4f40acfffa046713955a4370d52";

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("fetchWeather", async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = response.data;

      if (data.cod === 200) {
        const weatherData = {
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          feels_like: data.main.feels_like,
          wind_speed: data.wind.speed,
          icon: data.weather[0].icon,
        };

        db.run(
          `INSERT INTO weather_data (city, temperature, description, humidity, feels_like, wind_speed, icon)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            weatherData.city,
            weatherData.temperature,
            weatherData.description,
            weatherData.humidity,
            weatherData.feels_like,
            weatherData.wind_speed,
            weatherData.icon,
          ],
          (err) => {
            if (err) {
              console.error("Error inserting data:", err);
            } else {
              console.log("Weather data stored in database");
            }
          }
        );

        socket.emit("weatherData", weatherData);
      } else {
        socket.emit("weatherError", { message: "City not found" });
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      socket.emit("weatherError", { message: "Something went wrong" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
