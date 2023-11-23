import React from "react";
import PropTypes from "prop-types";

export class Student extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.student.id}</td>
                <td>{this.props.student.name}</td>
                <td>{this.props.student.surname}</td>
            </tr>
        );
    }
}

Student.protoTypes = {
    student: PropTypes.object
}