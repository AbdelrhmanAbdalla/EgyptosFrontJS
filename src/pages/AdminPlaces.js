import React, {Component} from 'react';
import PlaceService from '../services/place.sercice';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';


class AdminPlaces extends Component {

    constructor(props){
       super(props);
       
    }

    state = {
        title:"Les plus beau endroits d'Egypte",
        places:[],
        place:"",
        image:"",
        description:""
    }

    componentWillMount() {
        if(sessionStorage.getItem("isAuth")) {
        } else {
            this.setState({redirect: true});
        }
    } 

        async componentDidMount(){
            // Get ALL PLACES IN BDD
            let response = await PlaceService.list(); 
            if(response.ok){
                let data = await response.json();
                this.setState({places: data.places})
            }else{
                console.log(response.error);
            }
        }

        //suppression d'un place en recuperant l'id lors de l'appel de la fonction
        async delete(id){
            console.log(id)
            let response = await PlaceService.delete(id);
            let data="";
            if(response.ok){
                data = await response.json();
                this.setState({
                    success:true,
                    msgSuccess: "Place deleted !"
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
        return (
            <div className="container">
            <h1>{this.state.title}</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nom pays</th>
                            <th>Image</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                                {
                                    this.state.places.map((places) => {
                                        return(
                                            <tr className="hit">
                                                <td className="title">{places.place}</td>
                                                <td><img style={{width:'300px'}} class="img-fluid" alt="Responsive image" src={places.image} /></td>
                                                <td>{places.description}</td>
                                                <td>
                                                    <button type="button" class="btn btn-danger" onClick={() => this.delete(places._id)}>Supprimer</button>
                                                </td>
                                                <td>                                         
                                                    <button type="button" class="btn btn-warning"> 
                                                        <Link to={`/modifyPlace/${places._id}`}>Modifier</Link>
                                                    </button>
                                                </td>
                                            </tr> 
                                        )    
                                    })
                                }
                                {
                                    this.state.success === true ? <p class="correct">{this.state.msgSuccess}</p> : <p class="incorrect">{this.state.msgERROR}</p> 
                                }
                    </tbody>

                    
                </table>
            </div>
            
        )
    }
}

export default AdminPlaces;