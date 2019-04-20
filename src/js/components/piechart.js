import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import SALES from "../../data/SALES.json";

const getItemData = searchedItem => {
  return SALES.filter(item => item.product === searchedItem).reduce(
    (acc, obj) => {
      return (acc += obj.price);
    },
    0
  );
};

const data = [
  { name: "Strawberry Ice Cream", value: getItemData("Strawberry Ice Cream") },
  { name: "Pineapple Milkshake", value: getItemData("Pineapple Milkshake") },
  { name: "Raspberry Chardonnay", value: getItemData("Raspberry Chardonnay") },
  { name: "Vanilla Wine", value: getItemData("Vanilla Wine") },
  { name: "French Fries", value: getItemData("French Fries") },
  { name: "Cheeseburger", value: getItemData("Cheeseburger") }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class IceChart extends PureComponent {
  render() {
    return (
      <PieChart width={350} height={300}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
