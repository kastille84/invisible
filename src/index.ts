import axios from "axios"
import moment from "moment"
import { APIKey } from "./utils"

type Weather = {
  loc: string
  curr_weather: {
    temp: string
    condition: string
    humidity: string
    wind: string
  }
  local_time: string
}

async function logTimeWeather(zipLocArray: string[]) {
  const baseUrl = "http://api.weatherapi.com/v1/current.json"
  const gatheredData: Weather[] = []
  const allAxiosCalls: any = []

  for (let i = 0; i < zipLocArray.length; i++) {
    const zipLoc = zipLocArray[i]
    const constructedUrl = `${baseUrl}?key=${APIKey}&q=${zipLoc}`
    allAxiosCalls.push(
      axios.get(constructedUrl)
    )
  }

  await axios
    .all(allAxiosCalls)
    .then(
      axios.spread((...responses: any[]) => {
        responses.forEach((resp: any) => {
          gatheredData.push({
            loc: resp.data.location.name,
            curr_weather: {
              temp: resp.data.current.temp_f,
              condition: resp.data.current.condition.text,
              humidity: resp.data.current.humidity,
              wind: resp.data.current.wind_mph,
            },
            local_time: moment(new Date(resp.data.location.localtime)).format(
              "MM-DD-YYYY, hh:mm:ss a"
            ),
          })
        })
      })
    )
    .catch((err) => console.log("Error", err))

  logResults(gatheredData)
}

export function isZip(inputStr: string): boolean {
  if (inputStr.length > 5) {
    return false
  }
  const isZip = inputStr
    .split("")
    .every((str) => {
      return !isNaN(parseInt(str))
    })

  return isZip
}

function logResults(weatherArr: Weather[]) {
  weatherArr.forEach(
    ({ loc, curr_weather, local_time }) => {
    console.log(
      `The current weather in ${loc} as of ${local_time} is: ${curr_weather.condition}. The temperature is ${curr_weather.temp}f. The humidity is ${curr_weather.humidity}. The wind is ${curr_weather.wind}mph. \n`
    )
  })
}


logTimeWeather(["New York", "12550", "Tokyo", "Paris"])
