import React, { Component } from 'react';
import { Stream } from 'nivo'

class Graph extends Component {
	constructor(){
		super();
		this.state ={
			btcArray: []
		};
	}

	getRequest() {
	// let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.startDate}}&end=${this.endDate}`
	  let btcArray = []
	  let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-09-01&end=2017-12-19';
	  fetch(url, {'headers': {'Accept': 'application/json'}})
	  .then(res  => res.json())
	  .then(res => Object.values(res.bpi).forEach((value) => {
	  	btcArray.push({"BTC": value});
	  }))
	  .then(res => this.setState({
	  	btcArray: btcArray
	  	// arrayLength: Object.keys(res.bpi).length, 
	  	// dateValue: Object.keys(res.bpi)[10], 
	  	// currencyValue: Object.values(res.bpi)[10]
	  }))
	  .catch(err => console.log('fetch error:', err))
	  
	}

	render(){
		return (
			<div>
			<h1>cryptoTears</h1>
			<button onClick={() => this.getRequest()}>click</button>
			<button onClick={() => console.log(this.state.btcArray)}>click2</button>
				<Stream
				      data={this.state.btcArray}
				      keys={['BTC', 'ETH']}
				      enableGridX={false}
				      
				      width={screen.width}
				      height={400}
				      margin={{
				          "top": 50,
				          "right": 0,
				          "bottom": 0,
				          "left": 0
				      }}
				      axisBottom={false}
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
