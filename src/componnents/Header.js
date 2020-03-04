import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Redirect} from 'react-router-dom';

class Header extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            isAuth: sessionStorage.getItem('isAuth'),
            users:[],
            username:"",
            email:"",
            user_role:""
        }
    };

    //recuperation du role ainsi que du token
    componentDidMount(){
        sessionStorage.getItem('token') 
        this.setState( { user_role: sessionStorage.getItem('user_role') } )
        
    }

    //fonction deconnexion isAuth passe a false/remove le token et redirection
    logout(){
        sessionStorage.removeItem('token');
        this.setState({isAuth: false});
        sessionStorage.clear();
        return (<Redirect to={'/login'} refresh="true" />);
    }


    render(){
        let {isAuth} = this.state; 
        let {user_role} = this.state;
        //Affichage ADMIN
        if(isAuth && user_role ==1){
            return(
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Egyptos</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul class="navbar-nav ">
                            <li class="nav-item">
                                <Link className="nav-link" to={'/'}>Accueil</Link>
                            </li>
                            <Nav>
                                <NavDropdown title="Insert" id="nav-dropdown">
                                    <Link className="nav-link" to={'/insertPlaces'}>Insert Lieu</Link>
                                    <Link className="nav-link" to={'/insertPlayers'}>Insert Joueur</Link>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown title="Admin" id="nav-dropdown">
                                    <Link className="nav-link" to={'/adminPlaces'}>Les lieux</Link>
                                    <Link className="nav-link" to={'/adminPlayers'}>Les joueurs</Link>
                                    <Link className="nav-link" to={'/adminUsers'}>Les utilisateurs</Link>
                                </NavDropdown>
                            </Nav>
                            <li class="nav-item">
                                    <Link className="nav-link" to={'/lieux'}>Lieu à visiter</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link" to={'/football'}>Football</Link>
                                </li>
                            <li class="nav-item">
                                  <a className="nav-link" onClick={() => this.logout()}>Deconnexion</a>
                            </li>   
                            </ul> 
                 </div>                
            </nav>
            ) 
        }
        //AFFICHAGE USER LAMBDA
        else if(isAuth){
            return (
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Egyptos</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ">
                                <li class="nav-item">
                                    <Link className="nav-link" to={'/'}>Accueil</Link>
                                </li>
                                <Nav>
                                    <NavDropdown title="Insert" id="nav-dropdown">
                                        <Link className="nav-link" to={'/insertPlaces'}>Insert Lieu</Link>
                                        <Link className="nav-link" to={'/insertPlayers'}>Insert Joueur</Link>
                                    </NavDropdown>
                                </Nav>
                                <li class="nav-item">
                                    <Link className="nav-link" to={'/lieux'}>Lieu à visiter</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link" to={'/football'}>Football</Link>
                                </li>
                                <li class="nav-item">
                                  <a className="nav-link" onClick={() => this.logout()}>Deconnexion</a>
                                </li>
                                    
                            </ul>  
                    </div>                
                </nav>
            )
        }//AFFICHAGE USER NON CONNECTE
        else{
            return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Egyptos</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                           <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <Link className="nav-link" to={'/'}>Accueil</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link" to={'/lieux'}>Lieu à visiter</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link" to={'/football'}>Football</Link>
                                </li>
                                <ul class="navbar-nav">
                                    <a className="nav-link" href="/login">Connexion</a><br></br>
                                    <a  className="nav-link" href="/register">Inscription</a>
                                </ul>   
                            </ul> 
                 </div>                
            </nav>
            )          
        }
       
    }

}

export default Header;  