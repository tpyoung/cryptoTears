import React, { Component } from "react";
import { Stream } from "nivo";

class Graph extends Component {
	constructor() {
		super();
		this.state = {
			btcArray: [],
			dateArray: [],
			startDate: "2017-09-01",
			endDate: new Date().toISOString().split("T")[0]
		};
	}

	componentDidMount() {
		window.addEventListener("load", () => this.getRequest());
	}

	getRequest() {
		let dates = {};
		let values = {};
		let btcArray = [];
		let dateArray = [];
		let arrayLength = '';
		let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.startDate}&end=${this.state.endDate}`;
		fetch(url, { headers: { Accept: "application/json" } })
			.then(res => res.json())
			.then(res => {
				dates = Object.keys(res.bpi);
				values = Object.values(res.bpi);
				arrayLength = Object.values(res.bpi).length;
			})
			.then(res =>
				values.forEach(value => {
					btcArray.push({ BTC: value });
				})
			)
			.then(res =>
				dates.forEach(date => {
					dateArray.push({ Date: date });
				})
			)
			.then(res =>
				this.setState({
					btcArray,
					dateArray,
					arrayLength
				})
			)
			.catch(err => console.log("fetch error:", err));
	}

	render() {
		return (
			<div>
				<h1>cryptoTears</h1>
				<Stream
					data={this.state.btcArray}
					keys={["BTC"]}
					enableGridX={false}
					width={screen.width}
					height={400}
					margin={{
						top: 50,
						right: 20,
						bottom: 0,
						left: 20
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
				<div>
					<input type="range" min="0" max={this.state.arrayLength} class="slider" id="myRange" />
					<input type="range" min="0" max="100000" class="slider" id="myRange" />
				</div>
			</div>
		);
	}
}

export default Graph;
