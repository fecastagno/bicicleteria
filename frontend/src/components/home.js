import React, { Component } from 'react';

export default class Login extends Component {
    componentDidMount() {

        // if(this.prop.location.rol == null)
        if(this.props == null)            
            this.props.history.push('/login')
        else{
            switch (this.props.location.rol) {
                case '1':
                    this.props.history.push('/piezas-list')
                    break;
                case '2':
                    this.props.history.push('/bicicletas-list')
                    break;
                case '3':
                    this.props.history.push('/vendedor-list')
                    break;
                default:
                    this.props.history.push('/')
                    break;
            }
        }
    }

    render() { 
        return (
            <div>awd</div>
        )
    }
}
