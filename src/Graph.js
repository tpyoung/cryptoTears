import React, { Component } from 'react';
import { Stream } from 'nivo'

class Graph extends Component {
	constructor(){
		super();
		this.state ={
			btcArray: [],
			startDate: '2010-09-01',
			endDate: '2017-12-19',
		};
	}

	componentDidMount() {
    window.addEventListener('load', () => this.getRequest());
 	}

	getRequest() {
	  let btcArray = [];
		let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.startDate}&end=${this.state.endDate}`;
	  fetch(url, {'headers': {'Accept': 'application/json'}})
	  .then(res  => res.json())
	  .then(res => Object.values(res.bpi).forEach((value) => {
	  	btcArray.push({"BTC": value});
	  }))
	  .then(res => this.setState({
	  	btcArray
	  	// dateValue: Object.keys(res.bpi)[10], 
	  }))
	  .catch(err => console.log('fetch error:', err));
	}

	render(){
		return (
			<div>
			<h1>cryptoTears</h1>
				<Stream
				      data={this.state.btcArray}
				      keys={['BTC']}
				      enableGridX={false}
				      width={screen.width}
				      height={400}
				      margin={{
				          "top": 50,
				          "right": 20,
				          "bottom": 0,
				          "left": 0
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
