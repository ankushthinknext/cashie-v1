import React, { Component } from "react";

export default class TestPersons extends Component {
	state = {
		counter: 0,
		persons: null,
	};
	componentWillMount() {}
	componentDidMount() {
		fetch(`https://60efff36f587af00179d3c01.mockapi.io/persons`)
			.then((resonse) => resonse.json())
			.then((result) => this.setState({ persons: result }));
	}
	componentWillUpdate() {
		console.log("COMPONENT is about to Updated");
	}
	componentDidUpdate() {
		console.log("COMPONENT Updated");
		console.log(this.state.persons);
    }
    componentWillUnmount() {
        
    }

	render() {
		console.log("RENDERED");
		return (
			<div>
				<h2>{this.state.counter}</h2>
				<button
					onClick={() => this.setState({ counter: this.state.counter + 1 })}>
					+
				</button>
				<button
					onClick={() => this.setState({ counter: this.state.counter - 1 })}>
					-
				</button>

				<table>
					<tbody>
						{this.state.persons &&
							this.state.persons.map((el) => (
								<tr key={el.id}>
									<td>{el.id}</td>
									<td>{el.name}</td>
									<td>{el.age}</td>
									<td>{el.email}</td>
									<td>
										<img src={el.avatar} alt="" />
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		);
	}
}
