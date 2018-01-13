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
		
	</div>
	)
}
};
