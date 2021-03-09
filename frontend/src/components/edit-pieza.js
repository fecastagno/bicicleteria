import React, { Component } from 'react';
import axios from 'axios';

export default class EditPieza extends Component {

	constructor(props) {
        super(props);

        this.onChangeCodigo = this.onChangeCodigo.bind(this);
        this.onChangeTipo = this.onChangeTipo.bind(this);
        this.onChangeCantidad = this.onChangeCantidad.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            codigo: '',
            tipo: '',
            cantidad: ''
        }
    }

	componentDidMount() {
		axios.get('http://localhost:4001/piezas/'+this.props.match.params.id)
	    .then(response => {
	        this.setState({
	            codigo: response.data.codigo,
	            tipo: response.data.tipo,
	            cantidad: response.data.cantidad
	        })   
            console.log(this.props.match);
	    })
	    .catch(function (error) {
	        console.log(error);
	    })
    }

    onChangeCodigo(e) {
        this.setState({
            codigo: e.target.value
        });
    }

    onChangeTipo(e) {
        this.setState({
            tipo: e.target.value
        });
    }

    onChangeCantidad(e) {
        this.setState({
            cantidad: e.target.value
        });
    }

	onSubmit(e) {
		e.preventDefault();
		const pieza = {
		    codigo: this.state.codigo,
		    tipo: this.state.tipo,
		    cantidad: this.state.cantidad
		};
		console.log(pieza);

        //envío a la api - db
		axios.post('http://localhost:4001/piezas/update/'+this.props.match.params.id, pieza)
		    .then(res => console.log(res.data));

        //para redireccionar al listado de codigos
		this.props.history.push('/piezas-list');
	}

    render() {
        return (
            <div>
                <h3 align="center">Actualizar Pieza</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Código: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.codigo}
                                onChange={this.onChangeCodigo}
                                />
                    </div>
                    <div className="form-group">
                        <label>Tipo: </label>                        
                        <select className="form-control"
                                value={this.state.tipo}
                                onChange={this.onChangeTipo}>
                          <option value="Cuadro">Cuadro</option>
                          <option value="Manubrio">Manubrio</option>
                          <option value="asiento">Asiento</option>
                          <option value="Rueda">Rueda</option>
                          <option value="Pedal">Pedal</option>
                          <option value="Kit Mecánico">Kit Mecánico</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Cantidad: </label>
                        <input 
                                type="number" 
                                min="1"
                                className="form-control"
                                value={this.state.cantidad}
                                onChange={this.onChangeCantidad}
                                />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Actualizar Piezas" className="btn btn-primary" />
                        
                        <a href="/piezas-list" type="button" className="btn btn-secondary">Volver al listado</a>

                    </div>
                </form>
            </div>
        )
    }

}