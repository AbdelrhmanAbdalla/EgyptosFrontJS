import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './componnents/Header';
import Footer from './componnents/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddPlaces from './pages/AddPlaces';
import AdminPlaces from './pages/AdminPlaces';
import AdminUsers from './pages/AdminUsers';
import AdminPlayer from './pages/AdminPlayer';
import AddPlayer from './pages/AddPlayer';
import Football from './pages/Football';
import Lieux from './pages/Lieux';
import ModifyPlace from './pages/ModifyPlace';

 
class App extends Component{
  render(){
    return(
      <BrowserRouter>

        <Header>
        </Header>
        <Route path ="/" exact component={Home} />
        <Route path ="/lieux" exact component={Lieux} />
        <Route path ="/football" exact component={Football} />
        <Route path ="/login" exact component={Login} />
        <Route path ="/register" exact component={Register} />
        <Route path ="/insertPlaces" exact component={AddPlaces} />
        <Route path ="/insertPlayers" exact component={AddPlayer} />

        <Route path ="/adminPlaces" exact component={AdminPlaces} />
        <Route path ="/adminUsers" exact component={AdminUsers} />
        <Route path ="/adminPlayers" exact component={AdminPlayer} />

        <Route path="/modifyPlace/:id" exact component={ModifyPlace} />



        <Footer/>
      </BrowserRouter>
      
    )
  }
}

export default App;
