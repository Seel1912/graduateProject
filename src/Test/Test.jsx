import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SensorData = () => {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/sensorData'
        );
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Fetch data every 1 second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div>
      <h2>Sensor Data:</h2>
      <pre>{JSON.stringify(sensorData, null, 2)}</pre>
    </div>
  );
};

export default SensorData;
