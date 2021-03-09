import React, { Component } from 'react';
import axios from 'axios';

// const Option = props => (
//     <div>
//         <option>{props.option.codigo}</option>
//         <option>{props.option.tipo}</option>
//         <option>{props.option.cantidad}</option>
//     </div>
// )

export default class CreatePieza extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
            option: [],
	        codigo: 'SHIMANO',
	        tipo: 'Cuadro',
	        cantidad: 1
	    }
        this.onChangeCodigo = this.onChangeCodigo.bind(this);
        this.onChangeTipo = this.onChangeTipo.bind(this);
        this.onChangeCantidad = this.onChangeCantidad.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.codigoNuevo = 0;
	}

    componentDidMount() {                           //db.piezas.distinct("codigo");
        axios.get('http://localhost:4001/piezas/')  //traer los códigos de la db
        .then(response => {
            this.setState({ option: response.data });
        })
        .catch(function (error){
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

    async onSubmit(e) {
        e.preventDefault();
        
        // console.log(`Form submitted:`);
        // console.log(`Código: ${this.state.codigo}`);
        // console.log(`Clave: ${this.state.tipo}`);
        // console.log(`Rol: ${this.state.cantidad}`);
        let newPieza = '';

        if(this.codigoNuevo === 0){
            newPieza = {
                codigo: this.state.codigo,
                tipo: this.state.tipo,
                cantidad: this.state.cantidad
            };
        }else{
            newPieza = {
                codigo: document.getElementById('codigoNuevo').value, //id value
                tipo: this.state.tipo,
                cantidad: this.state.cantidad
            };            
        }
        //SI YA EXISTE, HAY QUE SUMARLE LA CANTIDAD
        axios.get('http://localhost:4001/piezas/get/'+this.state.codigo+'/'+this.state.tipo)
            .then(res => {
                if ((res.data).length !== 0) {  //si ya existe en la db
                    console.log(res.data[0]._id);
                    //console.log((res.data).length);
                    console.log(newPieza.cantidad);
                    newPieza.cantidad = Number.parseInt(res.data[0].cantidad) + Number.parseInt(newPieza.cantidad);
                    console.log(newPieza.cantidad); 

                    //envío a la api - db
                    axios.post('http://localhost:4001/piezas/update/'+res.data[0]._id, newPieza)
                        .then(res => console.log(res.data));   
                    this.props.history.push('/piezas-list');                
                }
                else{   //si no existe en la db, se da de alta
                    // console.log('aaaaaaa');
                    axios.post('http://localhost:4001/piezas/add', newPieza)
                        .then(res => console.log(res.data));
                    this.props.history.push('/piezas-list');
                }
            });
    }

    // selectList() {
    //     return this.state.option.map((currentOption, i) =>{
    //         return <Option option={currentOption} key={i} />;
    //     })
    // }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Crear nueva pieza</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Código: </label>
                        <select className="form-control"
                                value={this.state.codigo}
                                onChange={this.onChangeCodigo}>
                            <option value="SHIMANO">SHIMANO</option>
                              <option value="BWIN">BWIN</option>
                              <option value="CANYON">CANYON</option>
                              <option value="CANNONDALE">CANNONDALE</option>
                              <option value="BMC">BMC</option>
                              <option value="OTRO">OTRO</option>
                        { /*this.selectList()*/ }

                        </select>
                    </div>

                      {(this.state.codigo === "OTRO")? 
                            (this.codigoNuevo = 1,
                            <div className="form-group">
                                <label>Ingrese Código Nuevo: </label>  
                                <input 
                                    type="text" 
                                    className="form-control"
                                    id="codigoNuevo"
                                />
                            </div>) 
                            : null
                      }

                    <div className="form-group">
                        <label>Tipo: </label>
                        <select className="form-control"
                                value={this.state.tipo}
                                onChange={this.onChangeTipo}>
                          <option value="Cuadro">Cuadro</option>
                          <option value="Manubrio">Manubrio</option>
                          <option value="Asiento">Asiento</option>
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
                    <div className="form-group">
                        <input type="submit" value="Crear codigo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
