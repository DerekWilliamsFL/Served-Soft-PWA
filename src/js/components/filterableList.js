import React, { Component, PureComponent } from "react";
import Users from "../../data/USERS.json";

class List extends Component {
  render() {
    return (
      <div>
        <section className="module col-sm-12 col-md-6">
          <h1 className="module__heading module__heading--d">Recently Added Users</h1>
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
    updatedList = updatedList.filter(function(item) {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ items: updatedList });
  }

  componentWillMount() {
    var initialItems = [];
    Users.slice(-5).forEach(user => {
      let userString = `${user.first_name} ${user.last_name} ${user.email} ${
        user.gender
      } ${user.rewardID}`;
      initialItems.push(userString);
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
