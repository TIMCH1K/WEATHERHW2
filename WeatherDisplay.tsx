import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'

const WeatherContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 20px;
  width: 300px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
`

const CityName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`

const WeatherInfo = styled.p`
  font-size: 18px;
  margin: 5px 0;
`

interface WeatherDisplayProps {
  city: string
}

const cache: { [key: string]: any } = {}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city }) => {
  const [weather, setWeather] = useState<any>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      if (cache[city]) {
        console.log('Using cached weather data for:', city)
        setWeather(cache[city])
      } else {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a168017b33d29c56ef58c00310e10393&units=metric`,
          )
          console.log('Fetched weather data:', response.data)
          setWeather(response.data)
          cache[city] = response.data
        } catch (error) {
          console.error('Error fetching weather:', error)
        }
      }
    }

    fetchWeather()
  }, [city])

  if (!weather) return <div>Загрузка...</div>

  return (
    <WeatherContainer>
      <CityName>{weather.name}</CityName>
      <WeatherInfo>Температура: {weather.main.temp}°C</WeatherInfo>
      <WeatherInfo>Погода: {weather.weather[0].description}</WeatherInfo>
    </WeatherContainer>
  )
}

export default WeatherDisplay
