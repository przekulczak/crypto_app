import { useTranscationChart } from "./useTransactionChart";
import { useEffect } from "react";
import { getOption } from "./option";
import { TransactionResData } from "./types";
import ReactECharts from "echarts-for-react";
import "./styles.css";

export const TransactionChart = () => {
  const { fetchData, intervalRef, chartData } = useTranscationChart();

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
      <ReactECharts option={option} className="chart" />
    </div>
  );
};
