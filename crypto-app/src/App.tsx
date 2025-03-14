import ReactECharts, { EChartsOption } from "echarts-for-react";
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
  const timestamps = chartData.map((data: ResData) =>
    new Date(data.time).toLocaleTimeString()
  );
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["Price", "Volume"],
    },
    xAxis: {
      type: "category",
      data: timestamps,
    },
    yAxis: [
      {
        type: "value",
        name: "Price",
        position: "right",
      },
      {
        type: "value",
        name: "Volume",
        position: "left",
      },
    ],
    series: [
      {
        data: prices,
        type: "line",
        name: "Price",
        yAxisIndex: 0,
      },
      {
        data: volumes,
        type: "bar",
        name: "Volume",
        yAxisIndex: 1,
      },
    ],
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactECharts
        option={option}
        style={{ height: "100vh", width: "100vw" }}
      />
    </div>
  );
}

export default App;
