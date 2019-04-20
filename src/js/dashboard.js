import React, { Component } from 'react';
import { DashboardWithoutDndContext } from 'react-dazzle';

// react-dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Your widget. Just another react component.
import CounterWidget from './widgets/CounterWidget';

// Default styles.
import 'react-dazzle/lib/style/style.css';

class App extends Component {
  constructor() {
    super();
    
    this.state = {      
      widgets: {
        WordCounter: {
          type: CounterWidget,
          title: 'Counter widget',
        }
      },
      layout: {
        rows: [{
          columns: [{
            className: 'col-md-12',
            widgets: [{key: 'WordCounter'}],
          }],
        }],
      }
    };
  }

  render() {
    return <DashboardWithoutDndContext  widgets={this.state.widgets} layout={this.state.layout}  />
  }
}

export default DragDropContext(HTML5Backend)(App);