import React, { Component } from 'react';

import { Stream } from 'nivo'

const data = [
  {
    "BTC": 44,
    "ETH": 0
  },
  {
    "BTC": 40,
    "ETH": 0
  },
  {
    "BTC": 10,
    "ETH": 29  },
  {
    "BTC": 169,
    "ETH": 18
  },
  {
    "BTC": 130,
    "ETH": 173  },
  {
    "BTC": 160,
    "ETH": 189  },
  {
    "BTC": 149,
    "ETH": 14  },
  {
    "BTC": 171,
    "ETH": 171  },
  {
    "BTC": 114,
    "ETH": 179
  },
  {
    "BTC": 149,
    "ETH": 15
  },
  {
    "BTC": 119,
    "ETH": 195
  },
  {
    "BTC": 186,
    "ETH": 89
  },
  {
    "BTC": 163,
    "ETH": 69
  },
  {
    "BTC": 123,
    "ETH": 108
  },
  {
    "BTC": 78,
    "ETH": 113  
  },
  {
    "BTC": 123,
    "ETH": 24
  }
]

class Graph extends Component {
	constructor(){
		super();
		this.state ={};
	}

	getRequest() {
	// let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.startDate}}&end=${this.endDate}`
	  let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-09-01&end=2017-12-19';
	  fetch(url, {'headers': {'Accept': 'application/json'}})
	  .then(res  => res.json())
	  .then(res => console.log(Object.keys(res.bpi).length, Object.keys(res.bpi)[10], Object.values(res.bpi)[10]))
	  .catch(err => console.log('fetch error:', err))
	}

	render(){
		return (
			<div>
			<h1>cryptoTears</h1>
			<button onClick={() => this.getRequest()}>click</button>
				<Stream
				      data={data}
				      keys={['BTC', 'ETH']}
				      width={700}
				      height={400}
				      margin={{
				          "top": 50,
				          "right": 60,
				          "bottom": 50,
				          "left": 60
				      }}
				      axisBottom={{
				          "orient": "bottom",
				          "tickSize": 5,
				          "tickPadding": 5,
				          "tickRotation": 0,
				          "legend": "",
				          "legendOffset": 36
				      }}
				      offsetType="wiggle"
				      colors="set3"
				      fillOpacity={0.85}
				      borderColor="#000"
				      animate={true}
				      enableGridY={true}
				      motionStiffness={90}
				      motionDamping={15}
				  />
			</div>
		);
	}
}

export default Graph
