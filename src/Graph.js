import React, { Component } from "react";
import ReactLoading from 'react-loading';
import { Investments } from './Investments'
import { Stream } from "nivo";

class Graph extends Component {
	constructor() {
		super();
		this.state = {
			btcArray: [],
			dateArray: [],
			isLoading: false,
			staticBTCArray: [],
			startDate: "2010-09-01",
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
					dateArray.push(date);
				})
			)
			.then(res =>
				this.setState({
					btcArray,
					dateArray,
					arrayLength,
					staticBTCArray: btcArray
				})
			)
			.catch(err => console.log("fetch error:", err));
			setTimeout(() => this.setState({isLoading: false}), 4625);
	}

	updateValue (dateValue) {
		let startingIndex = dateValue.target.value;
		let newBTCArray = this.state.staticBTCArray.slice(startingIndex - 2, this.state.arrayLength)
		this.setState({btcArray: newBTCArray})
	}

	updateInvest(newValue){
		let investAmount = newValue.target.value;
		let coinAmount = (investAmount/Object.values(this.state.btcArray[0])).toFixed(5);
		let coinValue = (coinAmount * Object.values(this.state.btcArray[this.state.btcArray.length - 1])).toFixed(2)
		console.log(investAmount, coinAmount, coinValue);
		this.setState({
			investAmount,
			coinAmount,
			coinValue
		})
	}

	render() {
		let graphView = this.state.isLoading ? (
			<div>
				<ReactLoading type='bubbles' color='black' height='667' width='375' />
			</div>
		) : (				
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
				motionStiffness={300}
				motionDamping={30}
			/>
		)

		return (
			<div>
				<h1>cryptoTears</h1>
				{graphView}
				<div>
					<input 
						type="range"
						min="0" 
						max={this.state.arrayLength} 
						onChange={this.updateValue.bind(this)} 
					/>
					<input 
						type="range"
						min="10" 
						step="100"
						max="10000"
						onChange={this.updateInvest.bind(this)} 
					/>
					<div>
						<p>If you had invested</p> {this.state.investAmount} <p>on DATE you would have gotten</p> 
						{this.state.coinAmount} <p>bitcoin, now valued at</p> {this.state.coinValue}
					</div>
				</div>
			</div>
		);
	}
}

export default Graph;
