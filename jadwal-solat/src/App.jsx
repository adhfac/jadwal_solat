import { useState } from 'react';
import Clock from './components/Clock';
import SearchCity from './components/SearchCity';
import PrayerTimes from './components/PrayerTimes';
import './App.css';

function App() {
  const [city, setCity] = useState('');

  const handleSearch = (city) => {
    setCity(city);
  };

  return (
    <div className="container">
      <Clock />
      <SearchCity onSearch={handleSearch} />
      <PrayerTimes city={city} />
    </div>
  );
}

export default App;
