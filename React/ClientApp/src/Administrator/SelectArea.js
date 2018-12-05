import React, { Component } from 'react';


class SelectArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //areas: this.props.tipoTecnologia
        }
    }

    handleChange = event => {
        this.props.handleChange(event);
    }

    render() {
        const Lista_area = this.props.area
        const opcionesArea = Lista_area.map((area) =>
            <option value={area.nombreArea}>{area.nombreArea}</option>
        );


        return (
            <select className="form-control" id="selectGeneric" name="selectArea" onClick={this.handleChange} >
                {opcionesArea}
            </select>
        )
    }
}
export default SelectArea;