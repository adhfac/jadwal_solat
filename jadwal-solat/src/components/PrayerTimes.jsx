import { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
function PrayerTimes({ city, country }) {
  const [times, setTimes] = useState(null);

  useEffect(() => {
    if (city) {
      axios
        .get(`https://api.aladhan.com/v1/timingsByCity`, {
          params: {
            city: city,
            country: 'United States', // Default ke Indonesia jika tidak ada negara
          },
        })
        .then((response) => setTimes(response.data.data.timings))
        .catch((error) => console.error(error));
    }
  }, [city, country]);

  return (
    <div>
      {times ? (
        <ul>
          {Object.entries(times).map(([key, value]) => (
            <li key={key}>
              <span>{key}:</span> {value}
            </li>
          ))}
        </ul>
      ) : (
        <p>Masukkan kota untuk melihat jadwal salat</p>
      )}
    </div>
  );
}

export default PrayerTimes;
