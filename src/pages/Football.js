import React, {Component} from 'react';
import PlayerService from '../services/players.service';

class Football extends Component{


    state = {
        title:"Les meilleurs joueurs",
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
    
    render(){

      

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
                                            </tr> 
                                        )    
                                    })
                                }
                    </tbody>

                    
                </table>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}

export default Football;