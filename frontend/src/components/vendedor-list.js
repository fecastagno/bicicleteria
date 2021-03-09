import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Bici = props => (
    <tr>
        <td>{props.bici.codigo}</td>
        <td>{props.bici.cantidad}</td>
        <td>
            <Link to={"/vender-bici/"+props.bici._id} type="button" className="btn btn-primary">Vender</Link>
        </td>
    </tr>
)

export default class BiciList extends Component {

    constructor(props) {
        super(props);
        this.state = {bicis: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4001/bicicletas/')
        .then(response => {
            this.setState({ bicis: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    biciList() {
        return this.state.bicis.map((currentBici, i) =>{
            if (currentBici.cantidad > 0) {
                return <Bici bici={currentBici} key={i} />;
            }
        })
    }

    ocultarTabla(){
        let tabla = document.getElementById("tabla");
        if(tabla.rows.length === 1){
            console.log('hay uno');

            let parrafo = document.createElement('p');
            let contenido = document.createTextNode("No hay bicicletas disponibles a la venta");
            parrafo.appendChild(contenido);
        }
        else
            console.log('hay mas')
    }

    render() {
        return (
            <div>
                <h3>Lista de bicicletas disponibles</h3>
                <table id="tabla" className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Disponibilidad</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.biciList() }
                    </tbody>
                </table>
            {/* this.ocultarTabla() */}
            </div>

        )
    }
}