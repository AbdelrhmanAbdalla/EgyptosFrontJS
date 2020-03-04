import React, {Component} from 'react';
import PlayerService from '../services/players.service';
import {Redirect} from 'react-router-dom';

class AddPlayer extends Component{

    state = {
        namePlayer: '',
        club: '',
        championnat:'',
        image:'',
        description:''
    }  

    //recupere chaque modif sur les champs et met les valeurs
    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    
    //Lorsque l'on appuis sur le boutton création d'un player
    async submit(e){
        e.preventDefault();
    
        let response = await PlayerService.create(this.state);
        let data = await response.json();

        if(response.ok){
            this.setState({
                success:true,
                msgSuccess: "Joueur bien ajouté !"
            });
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
        return (
            <div className="container">
                <br></br>
                <h2>Ajouter un joueur</h2>

                <div className="row">
                    <div className="col-md-6">
                    <form onSubmit={(e) => this.submit(e)}>

                        <div className="form-group">
                            <label>Nom du joueur</label>
                            <input style={{width: '500px'}} type="text" className="form-control" required id="namePlayer" onChange={(e) => this.handleChange(e)}/>
                        </div>
                       
                        <div className="form-group">
                            <label>Club actuel</label>
                            <input style={{width: '500px'}} type="text" className="form-control" required id="club" onChange={(e) => this.handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Championnat concerné</label>
                            <input style={{width: '500px'}} type="text" className="form-control" required id="championnat" onChange={(e) => this.handleChange(e)}/>
                        </div>

                        <div className="form-group">
                            <label>Image joueur</label>
                            <input style={{width: '500px'}} type="text" className="form-control" required id="image" onChange={(e) => this.handleChange(e)}/>
                        </div>

                        <div className="form-group">
                            <label>Description du joueur</label>
                            <textarea style={{width: '500px'}} rows="10" cols="10" className="form-control"  id="description" onChange={(e) => this.handleChange(e)}>
                            </textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Insertion</button>
                    </form>
                    {
                        this.state.success === true ? <p class="correct">{this.state.msgSuccess}</p> : <p class="incorrect">{this.state.msgERROR}</p> 
                    }
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />

            </div>
        )
    }

}

export default AddPlayer;