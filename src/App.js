import React, { Component } from 'react';
// import './App.css';
import {AreaChart} from 'react-easy-chart';


    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      startDate: '',
      endDate: '',
      showToolTip: false, 
      windowWidth: initialWidth - 100}
  }

getRequest() {
// let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.startDate}}&end=${this.endDate}`
  let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-09-01&end=2017-12-19';
  fetch(url, {
          'headers': {'Accept': 'application/json'}
        })
        .then(res  => res.json())
        .then(res => console.log(Object.keys(res.bpi).length, Object.keys(res.bpi)[10], Object.values(res.bpi)[10]))
        .catch(err => console.log('fetch error:', err))
}

  render() {
    return (

      <div>
        <button onClick={() => this.getRequest()}>click</button>
      <AreaChart
      
        axes
        noAreaGradient
        margin={{top: 10, right: 10, bottom: 50, left: 50}}
        axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
        areaColors={['blue', 'purple']}
        width={this.state.windowWidth}
        height={this.state.windowWidth / 2}
        interpolate={'cardinal'}
        data={[
          [
            { x: 1, y: 20 },
            { x: 2, y: 10 },
            { x: 3, y: 25 },
            { x: 4, y: 20 },
            { x: 5, y: 10 },
            { x: 6, y: 25 }
          ], [
            { x: 1, y: 10 },
            { x: 2, y: 12 },
            { x: 3, y: 4 },
            { x: 4, y: 10 },
            { x: 5, y: 12 },
            { x: 6, y: 4 }
          ]
        ]}
      />
    </div>
    );
  }
}

export default App;
