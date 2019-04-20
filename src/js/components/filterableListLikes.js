import React, { Component, PureComponent } from "react";
import Likes from "../../data/LIKEAMOUNTS.json";

class List extends Component {
  render() {
    return (
      <div>
        <section className="module col-sm-12 col-md-6">
          <h1 className="module__heading module__heading--d">Likes Per Product</h1>
          <ol className="custom-bullet custom-bullet--d">
            {this.props.items.map(function (item) {
              return <li className="filterable-list-item" key={item}>{item}</li>;
            })}
          </ol>
        </section>
      </div>
    );
  }
}

export default class FilteredList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      initialItems: []
    };
    this.filterList = this.filterList.bind(this);
  }

  filterList(event) {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function (item) {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ items: updatedList });
  }

  componentWillMount() {
    var initialItems = [];
    Likes.forEach(item => {
      let likeString = `${item.product} Likes = ${item.likes}`;
      initialItems.push(likeString);
    });
    this.setState({
      items: initialItems,
      initialItems: initialItems
    });
  }

  render() {
    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={this.filterList} />

        <List items={this.state.items} />
      </div>
    );
  }
}
