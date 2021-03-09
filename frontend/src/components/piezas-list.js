import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pieza = props => (
    <tr>
        <td>{props.pieza.codigo}</td>
        <td>{props.pieza.tipo}</td>
        <td>{props.pieza.cantidad}</td>
        <td>
            <Link to={"/edit-pieza/"+props.pieza._id}>Editar</Link>
        </td>
        <td>
            <Link to={"/delete-pieza/"+props.pieza._id} className="text-danger">Borrar</Link>
        </td>
    </tr>
)

export default class PiezaList extends Component {

	constructor(props) {
        super(props);
        this.state = {piezas: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4001/piezas/')
        .then(response => {
            this.setState({ piezas: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    piezaList() {
        return this.state.piezas.map((currentPieza, i) =>{
            return <Pieza pieza={currentPieza} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Lista de piezas</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                            <th>Action</th>
                            <th>Action 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.piezaList() }
                    </tbody>
                </table>
                <a href="/create-pieza" type="button" className="btn btn-primary">Crear Pieza</a>
            </div>
        )
    }
}