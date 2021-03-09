import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	        usuario: '',
	        clave: '',
	        rol: ''
	    }
	    this.onChangeUsuario = this.onChangeUsuario.bind(this);
        this.onChangeClave = this.onChangeClave.bind(this);
        this.onChangeRol = this.onChangeRol.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        
        // console.log(`Form submitted:`);
        // console.log(`Usuario: ${this.state.usuario}`);
        // console.log(`Clave: ${this.state.clave}`);
        // console.log(`Rol: ${this.state.rol}`);
     
        const newUser = {
            usuario: this.state.usuario,
            clave: this.state.clave,
            rol: this.state.rol
        };

        axios.post('http://localhost:4001/users/add', newUser)
            .then(res => console.log(res.data));

        this.props.history.push('/user-list');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Crear nuevo usuario</h3>
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
                                type="number" 
                                min="1"
                                max="3"
                                className="form-control"
                                value={this.state.rol}
                                onChange={this.onChangeRol}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Crear usuario" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
