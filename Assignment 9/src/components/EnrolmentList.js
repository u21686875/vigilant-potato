import React from "react";

// import {Person} from "./Person";
// import {AddPersonForm} from "./AddPersonForm";

export class EnrolmentList extends React.Component {
	constructor(props){
		super(props);
		this.state = {classes: this.props.classes};
		this.selectClass = this.selectClass.bind(this);
	}

	async selectClass(event){
		let moduleCode = event.target.dataset.code;
		this.props.getEnrolled(moduleCode)
	}

	render(){
		return (
			<div className="container">
				<h1> 
					Select a class
				</h1>

				<div className="dropdown">
  					<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    					Show {this.state.classes.length} classes: 
  					</button>
  					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  						{this.state.classes.map(({code,name}, i) => <li key={i}><a key={i} data-code={code} className="dropdown-item" onClick={this.selectClass}>{name}</a></li>)}
  					</ul>
				</div>
			</div>
		);
	}
}