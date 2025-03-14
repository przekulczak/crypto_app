import { useRef, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { getData } from "../../heleprs/getData";
import { TransactionResData } from "./types";

export function useTranscationChart() {
  const intervalRef = useRef<number | null>(null);
  const [chartData, setChartData] = useState<TransactionResData[]>([]);
  const { showBoundary } = useErrorBoundary();

  const fetchData = () => {
    getData()
      .then((resData) => setChartData(resData))
      .catch((error) => showBoundary(error));
  };
  return { fetchData, intervalRef, chartData };
}
