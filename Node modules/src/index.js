import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';


class Greeting extends React.Component {
    render() {
        return (
            <div>
                <h2> Hello React! </h2>
            </div>
        );
    }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Greeting />);