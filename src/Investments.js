import React, { Component } from 'react';

export class Investments extends Component {
	constructor(){
		super();
		this.state = {
		};
	}

updateInvest(newValue){
	let investAmount = newValue.target.value;
	console.log(investAmount);
}

render(){
	return (
		<div>
		<input 
			type="range"
			min="10" 
			step="100"
			max="10000"
			onChange={this.updateInvest.bind(this)} 
		/>
	</div>
	)
}
};
