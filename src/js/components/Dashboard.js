import React, { Component } from "react";
import ReactDOM from "react-dom";
import Dashboard from "react-dazzle";
import PieChart from "./piechart";
import BarChart from "./barchart";
import FilterableList from "./filterableList";
import FilterableLikeList from "./filterableListLikes";
import "../../css/bootstrap.min.css";

// Default styles.
import "react-dazzle/lib/style/style.css";

export default class SweetDash extends Component {
  constructor() {
    super();

    this.state = {
      widgets: {
        PieChart: {
          type: PieChart,
          title: "Sales per Product"
        },
        BarChart: {
          type: BarChart,
          title: "Weekly Sales Per Month"
        }
      },
      layout: {
        rows: [
          {
            columns: [
              {
                className: "col-sm-12 col-md-offset-1 col-md-4",
                widgets: [{ key: "PieChart" }]
              },
              {
                className: "col-sm-12 col-md-offset-2 col-md-4",
                widgets: [{ key: "BarChart" }]
              }
            ]
          }
        ]
      }
    };
  }

  render() {
    return (
      <div className="admin-dashboard">

        <Dashboard widgets={this.state.widgets} layout={this.state.layout} />
        <FilterableList />
        <FilterableLikeList />

      </div>
    );
  }
}