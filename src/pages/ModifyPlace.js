import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import PlaceService from '../services/place.sercice';

class ModifyPlace extends Component{

    constructor(props){
        super(props);
        this.state = {
            placeToModify:{},
            place: '',
            image: '',           
            description:"",

            success: false,
            msgSuccess: '',
        }  
    }
    
    async componentDidMount(){
        let id = this.props.match.params.id;
        let response = await PlaceService.details(id);
        if(response.ok){
            let data = await response.json();
            this.setState({placeToModify: data.places});
        }
    }

    //recup modif des champs
    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    
    //update des infos
    async submit(e) {
        e.preventDefault();
        this.setState({success: false});
        let body = {
            place: this.state.place,
            image : this.state.image,
            description : this.state.description,
        }; 
        let id = this.props.match.params.id;
        console.log(id);
        let response = await PlaceService.update(id, body);
        if(response.ok){
            this.setState({
                success: true,
                msgSuccess: "Place is modified !"
            })
        }
    }

    render(){
        return (
                <div className="container">
                <h1>Modification de ce lieux</h1>
                            <div class="col-sm-6">
                                <Card style={{ width: '18rem' }}>
                                <Card.Img class="img-fluid" alt="Responsive image" variant="top" src={this.state.placeToModify.image} />
                                <Card.Body>
                                    <Card.Title>{this.state.placeToModify.place}</Card.Title>
                                    <Card.Text>
                                    {this.state.placeToModify.description}
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                            </div>
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
                        <label>Descritpion</label>
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

export default ModifyPlace;