import React from 'react';
import ReactDOM from 'react-dom';
import EventList from './components/EventList';

var events = [
	{name: "Daily news", description: "What's happening now", date: "2023/09/03"},
	{name: "Computers now", description: "How computers have evolved", date: "2023/08/13"},
	{name: "Celebartions!", description: "What to celebrate when", date: "2023/09/03"},
	{name: "How to braai", description: "Evryone wants to be a braai master", date: "2023/11/05"},
	{name: "Festival foods", description: "The best foods festivals have to offer", date: "2023/09/03"},
	{name: "How to be better", description: "Be the you you have always wanted", date: "2023/11/05"},
	{name: "Running free", description: "Running has never been so easy", date: "2023/10/15"},
	{name: "The perfect dates", description: "The full guide on dating", date: "2023/10/26"},
	{name: "Hiking for you", description: "How to hike like a pro", date: "2023/10/26"},
];

class Events extends React.Component {
	render() {
		return (
			<div className="container my-5">
				<EventList theDate={"2023/09/03"} events={events} />
			</div>
		);
	}
}

// For the newest version of react, this will be createRoot
ReactDOM.render(
	<Events />,
	document.getElementById('root')
);