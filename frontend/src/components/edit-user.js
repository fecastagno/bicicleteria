import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {

	constructor(props) {
        super(props);

        this.onChangeUsuario = this.onChangeUsuario.bind(this);
        this.onChangeClave = this.onChangeClave.bind(this);
        this.onChangeRol = this.onChangeRol.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            usuario: '',
            clave: '',
            rol: ''
        }
    }

	componentDidMount() {
		axios.get('http://localhost:4001/users/'+this.props.match.params.id)
	    .then(response => {
	        this.setState({
	            usuario: response.data.usuario,
	            clave: response.data.clave,
	            rol: response.data.rol
	        })   
	    })
	    .catch(function (error) {
	        console.log(error);
	    })
    }

    onChangeUsuario(e) {
        this.setState({
            usuario: e.target.value
        });
    }

    onChangeClave(e) {
        this.setState({
            clave: e.target.value
        });
    }

    onChangeRol(e) {
        this.setState({
            rol: e.target.value
        });
    }

	onSubmit(e) {
		e.preventDefault();
		const obj = {
		    usuario: this.state.usuario,
		    clave: this.state.clave,
		    rol: this.state.rol
		};
		console.log(obj);

        //envío a la api - db
		axios.post('http://localhost:4001/users/update/'+this.props.match.params.id, obj)
		    .then(res => console.log(res.data));

        //para redireccionar al listado de usuarios
		this.props.history.push('/user-list');
	}

    render() {
        return (
            <div>
                <h3 align="center">Actualizar Usuario</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Usuario: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.usuario}
                                onChange={this.onChangeUsuario}
                                />
                    </div>
                    <div className="form-group">
                        <label>Clave: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.clave}
                                onChange={this.onChangeClave}
                                />
                    </div>
                    <div className="form-group">
                        <label>Rol: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.rol}
                                onChange={this.onChangeRol}
                                />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Actualizar Usuario" className="btn btn-primary" />
                        {/*<button value="Volver al listado" className="btn btn-secondary"><a href="/user-list"></a>Volver al listado</button>*/}
                        
                        <a href="/user-list" type="button" className="btn btn-secondary">Volver al listado</a>

                    </div>
                </form>
            </div>
        )
    }

}