
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface DataPoint {
  time: string;
  price: number;
}

interface Props {
  symbol: string;
  apiKey: string;
}

const StockChart: React.FC<Props> = ({ symbol, apiKey }) => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://finnhub.io/api/v1/quote", {
          params: {
            symbol,
            token: apiKey
          }
        });
        const now = new Date().toLocaleTimeString();
        const price = res.data.c; // 'c' es el precio actual
        setData(prev => [...prev.slice(-30), { time: now, price }]);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    fetchData(); // primer fetch
    const interval = setInterval(fetchData, 5000); // cada 5 segundos

    return () => clearInterval(interval);
  }, [symbol, apiKey]);

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis domain={['dataMin', 'dataMax']} />
      <Tooltip />
      <Line type="monotone" dataKey="price" stroke="#e63946" strokeWidth={2} dot={false} />
    </LineChart>
  );
};

export default StockChart;
