import React from "react"
import axios from "axios"
import moment from "moment"
import * as weatherIcons from "../icons.js"
import * as utils from "../utils"

export default class Weather extends React.Component {
  state = {}

  componentDidMount() {
      this.fetchWeatherData();
      this.timer = setInterval(() => this.fetchWeatherData(), 30 * 60 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  async fetchWeatherData() {
    const currentWeather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?id=${process.env.GATSBY_CITY_ID}&APIKEY=${process.env.GATSBY_WEATHER_API_KEY}`
    )
    const forecastWeather = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${process.env.GATSBY_CITY_ID}&APIKEY=${process.env.GATSBY_WEATHER_API_KEY}`
    )
    let prefix = "wi-"
    let weather = forecastWeather.data.list[0].weather[0]
    let code = weather.id
    let icon = weatherIcons.default[code].icon
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = "day-" + icon
    }
    icon = prefix + icon
    this.setState({
      current: currentWeather.data,
      forecast: forecastWeather.data,
      img: icon,
    })
  }

  render() {
    if (this.state.forecast && this.state.current) {
      console.log(this.state.forecast)
      console.log(this.state.current)
      return (
        <div id="weather">
          <p id="currTemp">
            {utils.kelvinToFahrenheit(`${this.state.current["main"]["temp"]}`)}°
          </p>
          <p id="weatherHeader">
            {`${this.state.current["name"]}`}
          </p>
          <img id="weatherImg" src={`../svg/${this.state.img}.svg`} alt="current weather"></img>
        </div>
      )
    } else return <p></p>
  }
}
