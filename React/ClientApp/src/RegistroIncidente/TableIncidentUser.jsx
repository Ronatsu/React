import React, { Component } from 'react';
import TableIncident from '../WebInicio/Home';

export default class TableIncidentUser extends Component {

    render() {
        return (
            <div>
                <br />
                <br />
                <h1 className="container">Incidencias de</h1>
                <TableIncident partyId={5}/>
            </div>
        );
    }
}