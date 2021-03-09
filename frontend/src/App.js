import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login";
import Home from "./components/home";
import logo from "./logo.png";

//user
import UserList from "./components/user-list";
import CreateUser from "./components/create-user";
import EditUser from "./components/edit-user";
import DeleteUser from "./components/delete-user";

//pieza
import PiezasList from "./components/piezas-list";
import CreatePieza from "./components/create-pieza";
import EditPieza from "./components/edit-pieza";
import DeletePieza from "./components/delete-pieza";

//bicis
import BicisList from "./components/bicicletas-list";
//vendedor
import VendedorList from "./components/vendedor-list";
import VenderBici from "./components/vender-bici";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="./">
              <img src={logo} width="30" height="30" alt="bici" />
            </a>
            
            {/*hay que enviarle el rol*/}
            <Link to="/home" className="navbar-brand">Bicicletería</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {/* A JSX comment 
                  <li className="navbar-item">
                    <Link to="/user-list" className="nav-link">Lista de Usuarios</Link>
                  </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Crear Usuario</Link>
                </li>
                */}
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />

          <Route path="/user-list" exact component={UserList} />
          <Route path="/create-user" component={CreateUser} />
          <Route path="/edit-user/:id" component={EditUser} />
          <Route path="/delete-user/:id" component={DeleteUser} />

          <Route path="/piezas-list" exact component={PiezasList} />
          <Route path="/create-pieza" component={CreatePieza} />
          <Route path="/edit-pieza/:id" component={EditPieza} />
          <Route path="/delete-pieza/:id" component={DeletePieza} />

          <Route path="/bicicletas-list" exact component={BicisList} />
          <Route path="/vendedor-list" exact component={VendedorList} />
          <Route path="/vender-bici/:id" exact component={VenderBici} />
        </div>
      </Router>
    );
  }
}
export default App;

          // <Route path="/vender-bici/:id/:cantidad" exact component={VenderBici} />