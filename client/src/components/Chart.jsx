import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { Box } from "@mui/material";
import months from "../assets/months";

const chartSetting = {
  yAxis: [{ label: "" }],
  height: 400,
};

export default function Chart(props) {
  var result = [];

  months.forEach((month) => {
    const itemsPerMonth = props.bdayData.reduce((accumulator, currentValue) => {
      currentValue.birthdate.includes(`-${month.number}-`) && accumulator++;
      return accumulator;
    }, 0);

    result.push(itemsPerMonth);
  });

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: months.map((month) => month.name),
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: result,
            label: "birthdays/month",
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
        {...chartSetting}
      />
    </Box>
  );
}
