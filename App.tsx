import React, { useState } from 'react'
import styled from '@emotion/styled'
import CitySearch from './components/CitySearch'
import WeatherDisplay from './components/WeatherDisplay'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  return (
    <Container>
      <h1>Приложение Погоды</h1>
      <CitySearch onCitySelect={setSelectedCity} />
      {selectedCity && <WeatherDisplay city={selectedCity} />}
    </Container>
  )
}

export default App
