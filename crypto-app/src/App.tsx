import { useEffect, useRef, useState } from "react";
import "./App.css";

async function getData() {
  const url = "https://api.binance.com/api/v3/trades?symbol=BTCUSDC";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
    //todo type
  } catch (error: any) {
    console.error(error.message);
  }
}

interface ResData {
  id: string;
  isBestMatch: boolean;
  isBuyerMaker: boolean;
  price: string;
  qty: string;
  quoteQty: string;
  time: 1741944346734;
}

function App() {
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const [chartData, setChartData] = useState<ResData[]>([]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      getData().then((resData) => setChartData(resData));
    }, 5000);
  }, []);
  const prices = chartData.map((data: ResData) => data.price);
  const volumes = chartData.map((data: ResData) => data.qty);
  const timestamps = chartData.map((data: ResData) => data.time);

  return <></>;
}

export default App;
