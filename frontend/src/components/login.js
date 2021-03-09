import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            clave: ''
        }
        this.onChangeUsuario = this.onChangeUsuario.bind(this);
        this.onChangeClave = this.onChangeClave.bind(this);
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

    onSubmit(e) {
        e.preventDefault();
        
        let claveDB = 'awd';
        let rol = 0;
     
        axios.get('http://localhost:4001/users/get/'+this.state.usuario)
        .then(res => {
            if (res.data == null) {
                console.log("Credenciales inválidas");
            }
            else{   
                console.log(res.data);                 
                claveDB = res.data.clave;              
                rol = res.data.rol;                
                if (claveDB === this.state.clave) {
                    this.props.history.push({
                        pathname: '/home',
                        rol //envío al home, el rol del usuario logueado
                    });
                }
                else {
                    console.log("Credenciales inválidas");
                }
            }
        }); 
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Debe loguearse para ingresar al sistema</h3>
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
                                type="password" 
                                className="form-control"
                                value={this.state.clave}
                                onChange={this.onChangeClave}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Ingresar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
