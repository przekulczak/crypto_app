import { useRef, useState, useEffect } from "react";
import { getOption } from "./option";
import { TransactionResData } from "./types";
import { getData } from "../../heleprs/getData";
import ReactECharts from "echarts-for-react";
import { useErrorBoundary } from "react-error-boundary";

export const TransactionChart = () => {
  const intervalRef = useRef<number | null>(null);
  const [chartData, setChartData] = useState<TransactionResData[]>([]);
  const { showBoundary } = useErrorBoundary();

  const fetchData = () => {
    getData()
      .then((resData) => setChartData(resData))
      .catch((error) => showBoundary(error));
  };

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, 5000);
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const prices = chartData.map((data: TransactionResData) => data.price);
  const volumes = chartData.map((data: TransactionResData) => data.qty);
  const timestamps = chartData.map((data: TransactionResData) =>
    new Date(data.time).toLocaleTimeString()
  );
  const option = getOption({ prices, volumes, timestamps });
  return (
    <div>
      <ReactECharts
        option={option}
        style={{ height: "100vh", width: "100vw" }}
      />
    </div>
  );
};
