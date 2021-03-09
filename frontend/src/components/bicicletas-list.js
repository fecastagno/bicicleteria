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

const Bici = props => (
    <React.Fragment>
        <option>{props.bici}</option>           
    </React.Fragment>
)

const Stock = props => (    
    <tr>
        <td>{props.bici.codigo}</td>
        <td>{props.bici.cantidad}</td>
    </tr>
)

export default class BicicletasList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            piezas: [], 
            bicis: [],
            stock: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4001/piezas/')
        .then(response => {
            this.setState({ piezas: response.data, bicis: response.data });            
            // console.log(this.props.history)
        })
        .catch(function (error){
            console.log(error);
        })

        axios.get('http://localhost:4001/bicicletas/')
        .then(response => {
            this.setState({ stock: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    piezaList() {
        return this.state.piezas.map((currentPieza, i) =>{
            return <Pieza pieza={currentPieza} key={i} />;
        })

        //enviar a un select las bicicletas que se pueden armar
        
    }

    stockList() {
        return this.state.stock.map((currentBici, i) =>{
            if (currentBici.cantidad > 0) {
                return <Stock bici={currentBici} key={i} />;
            }
        })
    }

    bicisList() {           
        // let arrayCodigos = this.state.bicis.map(bici => bici.codigo);
        // let cantidadCodigos = arrayCodigos.reduce((cont, cod) => {
        //     cont[cod] = (cont[cod] || 0) + 1;
        //     return cont;
        //     }, {}
        // );

        // let codigosTodasLasPartes = Object.entries(cantidadCodigos).filter(([k,v]) => {
        //     if (v == 6) {
        //         return k;
        //     }
        // });

        // codigosTodasLasPartes = codigosTodasLasPartes.shift();

        // console.log(codigosTodasLasPartes); //(2) ["SHIMANO", 6]

        //Guardar todos los códigos en un array
        let arrayDeCodigos = [];
        for(var objB of this.state.bicis){     //recorro el array de objetos
            arrayDeCodigos.push(objB.codigo);    //guardo los códigos
            // obj.tipo == "Rueda" && obj.cantidad >= 2
            // obj.tipo == "Pedal" && obj.cantidad >= 2            
        }

        arrayDeCodigos = [...new Set(arrayDeCodigos)];  //Remuevo duplicados
        // console.log(arrayDeCodigos);

        let storage = [];
        let count = 0;
        let arrayRetorno = [];
        let validaciones;
        //for of
        for(let cod of arrayDeCodigos){
            validaciones = 0;
            storage = this.state.bicis;
            count = storage.reduce((counter, objBicis) => objBicis.codigo === cod ? counter += 1 : counter, 0);
            // console.log(cod+': '+count);
            if(count >= 6){     //tiene las 6 partes
                validaciones++;
            }
                
            for(let obj of this.state.bicis){     //recorro el array de objetos
                // console.log(obj);
                if(obj.codigo === cod && obj.tipo === "Rueda" && obj.cantidad >= 2)     //tiene mínimo 2 ruedas
                    validaciones++;
                
                if(obj.codigo === cod && obj.tipo === "Pedal" && obj.cantidad >= 2)     //tiene mínimo 2 Pedales
                    validaciones++;
            }
            if (validaciones >= 3) {
                arrayRetorno.push(cod);
            }
        }


        // return <Pieza pieza={currentPieza} key={i} />;



        // let arrayCodigos = Object.entries(this.state.bicis).map(([k,v]) => {
        //     if (k == "Tipo" && v == "Rueda") {
        //         return k,v;
        //     }
        // });

        //console.log(arrayRetorno);
        if (arrayRetorno.length === 0){
            // return <Bici bici={"NO ES POSIBLE ARMAR NINGUNA BICICLETA, FALTAN PARTES"} />;
            return null;
        }
        else{
            return arrayRetorno.map((currentPieza, i) =>{
                return <Bici bici={currentPieza} key={i} />;
            })
        }
        
    }

    ocultarForm(){
        //si no es posible armar, ocultar select y botón
        // console.log(document.getElementById('codigoNuevaBici'))}
        let formCrearBici = document.getElementById('formCrearBici');
        let faltanPartes = document.getElementById('titulo');

        formCrearBici.style.display = 'none';
        faltanPartes.innerHTML = "NO ES POSIBLE ARMAR NINGUNA BICICLETA, FALTAN PARTES";
        
        // (select.hasChildNodes())? //si se habilita una opción para armar bici
        //     console.log('si'):
        //     (formCrearBici.style.display = 'none',
        //     let faltanPartes = document.getElementById('titulo'),
        //     faltanPartes.innerHTML = "NO ES POSIBLE ARMAR NINGUNA BICICLETA, FALTAN PARTES"
        //     )
    }

    async onSubmit(e) {
        e.preventDefault();
        
        // console.log(`Form submitted:`);
        // console.log(`Código: ${this.state.codigo}`);
        // console.log(`Clave: ${this.state.tipo}`);
        // console.log(`Rol: ${this.state.cantidad}`);
        let newBici = '';

        newBici = {
            codigo: document.getElementById('codigoNuevaBici').value, //id value
            cantidad: 1
        }; 
        //SI YA EXISTE, HAY QUE SUMARLE LA CANTIDAD
        axios.get('http://localhost:4001/bicicletas/get/'+newBici.codigo)
            .then(res => {
                if ((res.data).length !== 0) {  //si ya existe en la db
                    console.log(res.data[0]._id);
                    //console.log((res.data).length);
                    console.log(newBici.cantidad);
                    newBici.cantidad = Number.parseInt(res.data[0].cantidad) + Number.parseInt(newBici.cantidad);
                    console.log(newBici.cantidad); 

                    //envío a la api - db
                    axios.post('http://localhost:4001/bicicletas/update/'+res.data[0]._id, newBici)
                        .then(res => console.log(res.data));                   
                }
                else{   //si no existe en la db, se da de alta
                    axios.post('http://localhost:4001/bicicletas/add', newBici)
                        .then(res => console.log(res.data));
                }
            });

        //restarle a piezas   
        let newPiezaCant = '';
        newPiezaCant = {
            codigo: document.getElementById('codigoNuevaBici').value, //id value
            tipo: '',
            cantidad: 0
        }; 

        //
        let arrayDePartes = ['Asiento', 'Manubrio', 'Cuadro', 'Rueda', 'Pedal', 'Kit Mecánico'];
        for(let parte of arrayDePartes){            
            axios.get('http://localhost:4001/piezas/get/'+newBici.codigo+'/'+parte)
                .then(res => {
                    if ((res.data).length !== 0) {  //si ya existe en la db
                        // console.log('id: '+res.data[0]._id);
                        //console.log((res.data).length);
                        // console.log('CantA: '+newBici.cantidad);
                        newPiezaCant.tipo = parte;
                        if (parte === "Pedal" || parte === "Rueda") {
                            newPiezaCant.cantidad = Number.parseInt(res.data[0].cantidad) - 2;
                        }
                        else
                            newPiezaCant.cantidad = Number.parseInt(res.data[0].cantidad) - 1;
                        // console.log('CantD: '+newBici.cantidad); 

                        //envío a la api - db
                        axios.post('http://localhost:4001/piezas/update/'+res.data[0]._id, newPiezaCant)
                            .then(res => console.log(res.data));                   
                    }
                    else{   //si no existe en la db, se da de alta
                        axios.post('http://localhost:4001/bicicletas/add', newBici)
                            .then(res => console.log(res.data));
                    }
                }); 
        }  

        //PUSH A BICICLETAS-list  
        // this.props.history.push('/piezas-list');    
    }

    render() {
        return (
            <div>
                {/*<h2>Lista de Partes</h2>
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

                <h2>Stock de bicicletas</h2>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.stockList() }
                    </tbody>
                </table>*/}
                
                <h3 id="titulo">Lista de Bicicletas para armar</h3>
                <form id="formCrearBici" onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Marca: </label>
                        <select className="form-control"
                                id="codigoNuevaBici">
                            { this.bicisList() }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Crear Bicicleta" className="btn btn-primary" />
                    </div>
                </form>
        
                {/* (document.getElementById('codigoNuevaBici').hasChildNodes() === false)? null : this.ocultarForm() */}

            </div>
        )
    }
}