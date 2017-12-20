import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {AreaChart} from 'react-easy-chart';

class App extends Component {
  render() {
    return (
      <AreaChart
        axes
        margin={{top: 10, right: 10, bottom: 50, left: 50}}
        axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
        width={250}
        interpolate={'cardinal'}
        height={250}
        data={[
          [
            { x: 1, y: 20 },
            { x: 2, y: 10 },
            { x: 3, y: 25 }
          ], [
            { x: 1, y: 10 },
            { x: 2, y: 12 },
            { x: 3, y: 4 }
          ]
        ]}
      />
    );
  }
}

export default App;
