import React, { Component } from 'react';
import axios from 'axios';

export default class DeletePieza extends Component {

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
		const obj = {
		    codigo: this.state.codigo,
		    tipo: this.state.tipo,
		    cantidad: this.state.cantidad
		};
		console.log(obj);
		axios.post('http://localhost:4001/piezas/delete-pieza/'+this.props.match.params.id, obj)
		    .then(res => console.log(res.data));

		this.props.history.push('/piezas-list');
	}

    render() {
        return (
            <div>
                <h3 align="center">Confirme si desea borrar la siguiente pieza</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Código: </label>
                        <input  type="text"
                            className="form-control"
                            value={this.state.codigo}
                            onChange={this.onChangeCodigo}
                            readOnly
                            />
                    </div>
                    <div className="form-group">
                        <label>Tipo: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.tipo}
                            onChange={this.onChangeTipo}
                            readOnly
                            />
                    </div>
                    <div className="form-group">
                        <label>Cantidad: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.cantidad}
                            onChange={this.onChangeCantidad}
                            readOnly
                            />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Borrar Pieza" className="btn btn-primary" />
                        <a href="/piezas-list" type="button" className="btn btn-secondary">Volver al listado</a>
                    </div>
                </form>
            </div>
        )
    }

}