import React, {Component} from 'react';
import PlaceService from '../services/place.sercice';
import "../css/style.css";
import Card from 'react-bootstrap/Card';


class Home extends Component {

        state = {
            title:"Bienvenu sur Egyptos !",
            places:[],
            place:"",
            image:"",
            description:""
        }
        async componentDidMount(){
            // Get ALL PLACES IN BDD
            let response = await PlaceService.list(); 
            console.log(response);
            
            if(response.ok){
                let data = await response.json();
                console.log(data)
                this.setState({places: data.places})
            }else{
                console.log(response.error);
            }
        }

        render(){
            return (
                <div class="container">
                    <h1 align="center">{this.state.title}</h1>
                    <br /><br /><br />
                    <div class="row">
                        <div class="col-sm-6" align="center">
                                    <Card style={{ width: '18rem' }}>
                                    <div class="embed-responsive embed-responsive-16by9">
                                     <Card.Img class="img-fluid card-img-top embed-responsive-item" alt="Responsive image" variant="top" src="data:image/jpeg;base64,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" />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>Les meilleurs lieux en Egypte !</Card.Title>
                                        <Card.Text>
                                        <a href="http://localhost:3000/lieux"><button align="center" type="button" class="btn btn-info" >Meilleurs lieux</button></a>
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                        </div>
                        <div class="col-sm-6" align="center">
                                    <Card style={{ width: '18rem' }}>
                                    <div class="embed-responsive embed-responsive-16by9">
                                     <Card.Img class="img-fluid card-img-top embed-responsive-item" alt="Responsive image" variant="top" src="data:image/jpeg;base64,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 " />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>Les meilleurs joueurs !</Card.Title>
                                        <Card.Text>
                                        <a href="http://localhost:3000/football">
                                        <button align="center" type="button" class="btn btn-info" >Meilleurs joueurs</button></a>  
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                        </div>
                    </div>
                    <br /><br /><br /><br /><br />
                </div>


             )
        }
}

export default Home;