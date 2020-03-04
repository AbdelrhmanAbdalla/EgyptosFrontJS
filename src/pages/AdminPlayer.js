import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PlayerService from '../services/players.service';

class AdminPlayer extends Component{


    state = {
        title:"Les joueurs",
        players:[],
        namePlayer: '',
        club: '',
        championnat:'',
        image:'',
        description:''
    }  
    async componentDidMount(){
        // Get ALL PLAYER IN BDD
        let response = await PlayerService.list(); 
        if(response.ok){
            let data = await response.json();
            this.setState({players: data.players})
        }else{
            console.log(response.error);
        }
    }

    componentWillMount() {
        if(sessionStorage.getItem("isAuth")) {
        } else {
            this.setState({redirect: true});
        }
    } 

    //suppression d'un joueur en recuperant l'id lors de l'appel de la fonction
    async delete(id){
        let response = await PlayerService.delete(id);
        let data = "";
        if(response.ok){
            data = await response.json();
            this.setState({
                success:true,
                msgSuccess: "Player deleted !"
            });
            this.componentDidMount();
        }else{
            this.setState({
                msgERROR: data.message
            })
        };
    }
    
    render(){

        if (this.state.redirect) {
            return (<Redirect to={'/login'} />);
        }

        return(
            <div className="container">
            <h1>{this.state.title}</h1>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Nom joueur </th>
                        <th>Club </th>
                        <th>Championnat </th>
                        <th>Photo </th>
                        <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                                {
                                    this.state.players.map((players) => {
                                        return(
                                            <tr className="hit">
                                                <td>{players.namePlayer}</td>
                                                <td>{players.club}</td>
                                                <td>{players.championnat}</td>
                                                <td><img style={{width:'300px'}} src={players.image} alt=""/></td>
                                                <td>{players.description}</td>
                                                <td>
                                                    <button type="button" class="btn btn-danger" onClick={() => this.delete(players._id)}>Supprimer</button>
                                                </td>
                                               
                                            </tr> 
                                        )    
                                    })
                                }
                    </tbody>
                    {
                        this.state.success === true ? <p class="correct">{this.state.msgSuccess}</p> : <p class="incorrect">{this.state.msgERROR}</p> 
                    }
                    <br /><br /><br /><br /><br /><br /><br /><br />
                </table>
            </div>
        )
    }
}

export default AdminPlayer;