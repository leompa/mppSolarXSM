import { useState, useEffect } from 'react'
import './App.css'
import ReactSpeedometer from "react-d3-speedometer";
import axios from 'axios';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://45.175.154.45:180/mppsolar") // url leo
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); 

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
      <ReactSpeedometer value={data.bateria_v} maxValue={30} minValue={20} segmentColors={[
    "#D62728",
    "#FFD92F",
    "#2CA02C",
    "#2CA02C",
    "#D62728",
  ]}/>
  <ReactSpeedometer value={data.pv_volt} maxValue={36} minValue={20} segments={4} />
  <ReactSpeedometer value={data.w_salida} maxValue={1500} minValue={0} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
