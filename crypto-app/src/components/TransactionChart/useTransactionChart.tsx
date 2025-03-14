import { useRef, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { getData } from "../../heleprs/getData";
import { TransactionResData } from "./types";

export function useTranscationChart() {
  const intervalRef = useRef<number | null>(null);
  const [chartData, setChartData] = useState<TransactionResData[]>([]);
  const { showBoundary } = useErrorBoundary();
  const [loading, setLoading] = useState(false);

  const fetchData = (initialLoad?: boolean) => {
    if (initialLoad) {
      setLoading(true);
    }
    getData()
      .then((resData) => {
        if (initialLoad) {
          setLoading(false);
        }
        setChartData(resData);
      })
      .catch((error) => showBoundary(error));
  };
  return { fetchData, intervalRef, chartData, loading };
}
