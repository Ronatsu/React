import React, { Component } from 'react';


class SelectComponent extends React.Component {

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
        const tipo_tecnologia = this.props.tecno
        const listaTipoTecnologia = tipo_tecnologia.map((tecnologia) =>
            <option value={tecnologia.tipO_TECNOLOGIA}>{tecnologia.tipO_TECNOLOGIA}</option>
        );


        return (
            <select className="form-control" id="selectGeneric" name="selectGeneric" onClick={this.handleChange} >
                {listaTipoTecnologia}
            </select>
        )
    }
}
export default SelectComponent;