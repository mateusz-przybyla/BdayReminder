import React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";

const CommonBarChart = (props) => {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: props.xAxisData,
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: props.yValues,
          label: props.legendLabel,
        },
      ]}
      grid={{ horizontal: true }}
      sx={{
        [`& .${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translateX(-10px)",
        },
        [`& .${chartsGridClasses.line}`]: {
          strokeDasharray: "5 3",
          strokeWidth: 2,
        },
      }}
      yAxis={[{ label: props.yAxisLabel }]}
      height={props.height}
      width={props.width}
    />
  );
};

export default CommonBarChart;
