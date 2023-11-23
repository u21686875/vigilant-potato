import React from 'react'
import PropTypes from 'prop-types'

export default class Event extends React.Component {
    constructor(props) {
        super(props);
    }	
	render() {
		return (
			<div className="card">
				<p className="card-header">{this.props.name}</p>
				<div className="card-body">
					<p className="card-text"><b>Description: </b>{this.props.description}</p>
					<p className="card-text"><b>Date: </b>{this.props.date}</p>
				</div>
			</div>
		)
	}
}

Event.propTypes = {
	event: PropTypes.object,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired
}