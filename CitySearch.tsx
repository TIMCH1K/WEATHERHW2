import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import debounce from 'debounce';

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
`;

interface CitySearchProps {
  onCitySelect: (city: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchCities = debounce(async (searchText: string) => {
    if (searchText) {
      try {
        const response = await axios.get(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchText}`,
            {
              headers: {
                'X-RapidAPI-Key': 'afcd48ba90mshf0a3215646a0064p1236eejsn209f4464cde8',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
              },
            },
        );
        setSuggestions(response.data.data.map((city: any) => city.name));
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetchCities(e.target.value);
  };

  const handleSelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
  };

  const handleSearch = () => {
    onCitySelect(query);
  };

  return (
      <div>
        <Input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Поиск города"
        />
        <Button onClick={handleSearch}>Найти</Button>
        {suggestions.length > 0 && (
            <ul>
              {suggestions.map((city, index) => (
                  <li key={index} onClick={() => handleSelect(city)}>
                    {city}
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default CitySearch;
