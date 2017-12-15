import React, {Component} from 'react'
import { connect } from 'react-redux'
import Chart from '../components/chart'
import GoogleMap from '../components/google_map'

class WeatherList extends Component {

  renderWeather(cityData) {
    if (!cityData) return;

    const name = cityData.city.name;

    const temps = cityData.list.map(weather => {
      return weather.main.temp - 273.15
    })
    const humidities = cityData.list.map(weather => weather.main.humidity)
    const pressures = cityData.list.map(weather => weather.main.pressure)
    const { lon, lat } = cityData.city.coord

    console.log(temps);
    return (
      <tr key={name}>
        <td><GoogleMap lat={lat} lon={lon} /></td>
        <td><Chart data={temps} color="#aaa" units="c" /></td>
        <td><Chart data={pressures} color="#aaa" units="hPa" /></td>
        <td><Chart data={humidities} color="#aaa" units="%" /></td>
      </tr>
    )
  }

  render() {
    return  (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (c)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({ weather }) {
  return  { weather }; // { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);