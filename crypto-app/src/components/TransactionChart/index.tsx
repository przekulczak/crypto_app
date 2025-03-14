import { useRef, useState, useEffect } from "react";
import { getOption } from "./option";
import { TransactionResData } from "./types";

const TransactionChart = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const [chartData, setChartData] = useState<TransactionResData[]>([]);

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

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactECharts
        option={getOption({ prices, volumes, timestamps })}
        style={{ height: "100vh", width: "100vw" }}
      />
    </div>
  );
};
