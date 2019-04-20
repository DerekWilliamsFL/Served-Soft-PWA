import React, { PureComponent } from "react";
import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar
} from "recharts";
import Sales from "../../data/SALES.json";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

let week1 = 0;
let week2 = 0;
let week3 = 0;
let week4 = 0;

const getSaleAmountPerWeek = searchDate => {
  searchDate = new Date(searchDate);
  var from = new Date(searchDate);
  var to = from.addDays(7);
  var inRange = searchDate >= from && searchDate <= to;

  return Math.ceil(
    Sales.filter(
      item => new Date(item.date) >= from && new Date(item.date) <= to
    ).reduce((acc, obj) => {
      return (acc += obj.price);
    }, 0)
  );
};

const februaryData = [
  {
    name: "2/15",
    sales: getSaleAmountPerWeek("2/15/2019")
  },
  {
    name: "2/22",
    sales: getSaleAmountPerWeek("2/22/2019")
  },
  {
    name: "3/1",
    sales: getSaleAmountPerWeek("3/1/2019")
  },
  {
    name: "3/8",
    sales: getSaleAmountPerWeek("3/8/2019")
  }
];


const januaryData = [
  {
    name: "1/17",
    sales: getSaleAmountPerWeek("1/17/2019")
  },
  {
    name: "1/25",
    sales: getSaleAmountPerWeek("1/25/2019")
  },
  {
    name: "2/1",
    sales: getSaleAmountPerWeek("2/1/2019")
  },
  {
    name: "2/8",
    sales: getSaleAmountPerWeek("2/8/2019")
  }
];


const marchData = [
  {
    name: "We",
    sales: getSaleAmountPerWeek("1/17/2019")
  },
  {
    name: "Week 2",
    sales: getSaleAmountPerWeek("1/25/2019")
  },
  {
    name: "Week 3",
    sales: getSaleAmountPerWeek("2/1/2019")
  },
  {
    name: "Week 4",
    sales: getSaleAmountPerWeek("2/8/2019")
  }
];

export default class Example extends PureComponent {

  state = { data : januaryData, month: 1 }

  queryMonth = () => {
    if (this.state.month == 1) {
      this.setState({ data: januaryData })
    } else if (this.state.month == 2) {
      this.setState({ data: februaryData })
    } else {
      this.setState({ data: marchData })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.month !== this.state.month) {
      this.queryMonth(this.state.month);
    }
  }

  render() {
    return (
      <div>
        <span className="custom-dropdown">
          <select onChange={(event) => this.setState({ month: event.target.value })}>
            <option value="1">1/17/2019</option>
            <option  value="2">2/17/2019</option>
            <option  value="3">3/17/2019</option>
          </select>
        </span>
        <BarChart width={400} height={300} data={this.state.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </div>
    );
  }
}
