import React, { Component } from 'react';
import axios from 'axios';

export default class VenderBici extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            codigo: '',
            cantidad: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4001/bicicletas/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                codigo: response.data.codigo,
                cantidad: response.data.cantidad
            })   
            // console.log(this.props );
            console.log(this.state);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onSubmit(e) {
        // alert(document.getElementById('nuevaCantidad').value);
        e.preventDefault();

        //validación back
        while (document.getElementById('nuevaCantidad') > this.state.cantidad) {
            alert('No hay suficiente disponibilidad');
        }

        const bici = {
            codigo: this.state.codigo,
            cantidad: this.state.cantidad - document.getElementById('nuevaCantidad').value
        };
        console.log(bici);

        //envío a la api - db
        axios.post('http://localhost:4001/bicicletas/update/'+this.props.match.params.id, bici)
            .then(res => console.log(res.data));

        //para redireccionar al listado de codigos
        this.props.history.push('/vendedor-list');


        //VALIDACION DE CANTIDAD

    }

    render() {
        return (
            <div>
                <h3 align="center">Confirme venta</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Marca: </label>
                        <input  
                            type="text"
                            className="form-control"
                            value={this.state.codigo}
                            onChange={this.onChangeCodigo}
                            readOnly
                            />
                    </div>
                    <div className="form-group">
                        <label>Cantidad: </label>
                        <input 
                            id="nuevaCantidad"
                            type="number" 
                            className="form-control"
                            min="1"
                            max={this.state.cantidad}
                            placeholder={this.state.cantidad+" disponibles"}
                            required
                            />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Vender" className="btn btn-primary" />
                        
                        <a href="/vendedor-list" type="button" className="btn btn-secondary">Volver al listado</a>

                    </div>
                </form>
            </div>
        )
    }

}