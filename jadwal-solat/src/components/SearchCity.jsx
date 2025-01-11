import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
function SearchCity({ onSearch }) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setCity(input);

    if (input.length > 2) {
      // Fetch data dari API
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/cities?query=${input}`
        );
        console.log(response.data);  // Debugging
        const cities = response.data.data.map((item) => item.city); // Menyesuaikan dengan format data
        setSuggestions(cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]); // Sembunyikan dropdown
    onSearch(suggestion); // Trigger pencarian
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Cari kota..."
        value={city}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setSuggestions([]), 200)} // Hilangkan dropdown setelah blur
      />
      <button onClick={() => onSearch(city)}>Cari</button>

      {/* Loading indicator */}
      {loading && <p style={{ marginTop: '5px' }}>Memuat...</p>}

      {/* Dropdown suggestions */}
      {suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #ddd',
              }}
            >
              {suggestion} {/* Tampilkan nama kota */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchCity;
