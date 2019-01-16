import React, { Component } from 'react';
import TableIncident from '../WebInicio/Home';

export default class TableIncidentUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            completeName: this.props.match.params.completeName
        }
    }
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <h3 className="container">Incidencias de {this.state.completeName}</h3>
                <TableIncident idParty={this.state.id} />
            </div>
        );
    }
}
