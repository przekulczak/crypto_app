import { EChartsOption } from "echarts";
import { OptionParams } from "./types";

export const getOption = ({
  timestamps,
  prices,
  volumes,
}: OptionParams): EChartsOption => ({
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
});
