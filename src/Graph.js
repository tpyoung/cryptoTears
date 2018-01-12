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
		let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.startDate}&end=${this.state.endDate}`;
		fetch(url, { headers: { Accept: "application/json" } })
			.then(res => res.json())
			.then(res => {
				values = Object.values(res.bpi);
				dates = Object.keys(res.bpi);
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
					dateArray
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
			</div>
		);
	}
}

export default Graph;
