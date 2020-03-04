import React, {Component} from 'react';
import PlaceService from '../services/place.sercice';
import {Redirect} from 'react-router-dom';


class AddPlaces extends Component{

    state = {
        place: "",
        image: null,
        description: "",
        userId: sessionStorage.getItem('idUser')
    }

    //recupere chaque modif sur les champs et met les valeurs
    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    //Lorsque l'on appuis sur le boutton création d'une place
    async submit(e){
        e.preventDefault();
    
        let response = await PlaceService.create(this.state);
        let data = await response.json();

        if(response.ok){
            this.setState({
                success:true,
                msgSuccess: "Lieu bien ajouté !"
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
                <form onSubmit={(e) => this.submit(e)}>
                <div className="form-group">
                    <label>Name place</label>
                    <input type="text" id="place" className="form-control" required onChange={(e) => this.handleChange(e)} />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input type="text" id="image"  className="form-control" required onChange={(e) => this.handleChange(e)}/>
                </div>
                
                <div className="form-group">
                    <label>Description</label>
                    <input type="description" id="description" className="form-control"  onChange={(e) => this.handleChange(e)}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Insertion</button>
                </form>
                {
                    this.state.success === true ? <p>{this.state.msgSuccess}</p> : <p>{this.state.msgERROR}</p> 
                }
            </div>
            
            
        )
    }

}

export default AddPlaces;