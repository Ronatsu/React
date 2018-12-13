import React, { Component } from 'react';


class SelectComponentArea extends React.Component {

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
        const tecnologia = this.props.tecno
        console.log(tecnologia);
        const listaTipoTecnologia = tecnologia.map((tecnologia) =>
            <option value={tecnologia.nombreTecnologia}>{tecnologia.nombreTecnologia}</option>
        );


        return (
            <select className="form-control" id="selectGeneric" name="selectGeneric" onClick={this.handleChange} >
                {listaTipoTecnologia}
            </select>
        )
    }
}
export default SelectComponentArea;