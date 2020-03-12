import React from "react"
import Weather from "../components/weather.js"
import Clock from "../components/clock.js"
import News from "../components/news.js"

export default () => (
  <div>
    <Clock />
    <Weather />
    <News />
  </div>
)
